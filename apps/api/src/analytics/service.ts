import { normalizeArtistName } from "../spotify-api/normalize";
import type { EnrichedArtist } from "../spotify-api/types";
import type { NormalizedListeningEvent } from "../spotify/types";
import type { AnalyticsSummary, ArtistGenreInfo, MonthlyTrend, TopGenre } from "./types";
import { incrementAggregate, monthKey, msToMinutes, toSortedTop } from "./utils";

const TOP_LIMIT = 10;

function getPrimaryGenre(artist: string, artistGenres: Map<string, EnrichedArtist>): string {
  const meta = artistGenres.get(normalizeArtistName(artist));
  if (meta?.genres.length) return meta.genres[0];
  return "Other";
}

function buildArtistGenresMap(
  artistGenres: Map<string, EnrichedArtist>,
): Record<string, ArtistGenreInfo> {
  const out: Record<string, ArtistGenreInfo> = {};
  for (const [key, meta] of artistGenres.entries()) {
    out[key] = { genres: meta.genres, imageUrl: meta.imageUrl };
  }
  return out;
}

export function computeAnalytics(
  events: NormalizedListeningEvent[],
  artistGenres: Map<string, EnrichedArtist> = new Map(),
): AnalyticsSummary {
  const artistAgg = new Map<string, { streams: number; msPlayed: number }>();
  const trackAgg = new Map<string, { streams: number; msPlayed: number }>();
  const genreAgg = new Map<string, { streams: number; msPlayed: number }>();
  const monthlyAgg = new Map<string, { streams: number; msPlayed: number }>();

  const uniqueArtists = new Set<string>();
  const uniqueTracks = new Set<string>();
  const uniqueAlbums = new Set<string>();

  let totalMs = 0;

  for (const event of events) {
    totalMs += event.msPlayed;
    uniqueArtists.add(event.artist);
    uniqueTracks.add(`${event.artist}::${event.track}`);
    if (event.album) uniqueAlbums.add(`${event.artist}::${event.album}`);

    incrementAggregate(artistAgg, event.artist, event.msPlayed);
    incrementAggregate(trackAgg, `${event.track} - ${event.artist}`, event.msPlayed);
    incrementAggregate(genreAgg, getPrimaryGenre(event.artist, artistGenres), event.msPlayed);
    incrementAggregate(monthlyAgg, monthKey(event.timestamp), event.msPlayed);
  }

  const topGenres: TopGenre[] = toSortedTop<{ name: string; streams: number; minutes: number }>(
    genreAgg,
    TOP_LIMIT,
  )
    .filter((item) => item.name !== "Other")
    .map((item) => ({
      genre: item.name,
      streams: item.streams,
      minutes: item.minutes,
    }));

  const monthlyListeningTrends: MonthlyTrend[] = Array.from(monthlyAgg.entries())
    .map(([month, value]) => ({
      month,
      streams: value.streams,
      minutes: msToMinutes(value.msPlayed),
    }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return {
    totalListeningMinutes: msToMinutes(totalMs),
    totalStreams: events.length,
    uniqueArtists: uniqueArtists.size,
    uniqueTracks: uniqueTracks.size,
    uniqueAlbums: uniqueAlbums.size,
    topArtists: toSortedTop(artistAgg, TOP_LIMIT),
    topTracks: toSortedTop(trackAgg, TOP_LIMIT),
    topGenres,
    monthlyListeningTrends,
    genreTags: topGenres.slice(0, 8).map((g) => g.genre),
    artistGenres: buildArtistGenresMap(artistGenres),
  };
}
