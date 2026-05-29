import type { AnalyticsSummary } from "../analytics/types";
import type { PersonalityAnalysis } from "../personality/types";
import { extractListeningSignals } from "../personality/signals";
import type { EnrichedArtist } from "../spotify-api/types";
import { normalizeArtistName } from "../spotify-api/normalize";
import { getRelatedArtists, searchArtistsByGenre } from "../spotify-api/client";
import { isSpotifyConfigured } from "../spotify-api/auth";
import type { NormalizedListeningEvent } from "../spotify/types";
import type { ArtistRecommendation, RecommendationCandidate, RecommendationInput } from "./types";
import {
  buildRecommendationCopy,
  isAlreadyListened,
  scoreCandidate,
} from "./utils";

const RECOMMENDATION_COUNT = 3;
const MAX_SEED_ARTISTS = 2;

function toCandidate(
  item: {
    id: string;
    name: string;
    genres: string[];
    images: Array<{ url: string }>;
    popularity?: number;
  },
  seedArtist: string,
  source: RecommendationCandidate["source"],
): RecommendationCandidate {
  return {
    spotifyArtistId: item.id,
    name: item.name,
    genres: item.genres,
    imageUrl: item.images[0]?.url ?? null,
    popularity: item.popularity ?? 50,
    seedArtist,
    source,
  };
}

function buildInput(
  events: NormalizedListeningEvent[],
  analytics: AnalyticsSummary,
  personality: PersonalityAnalysis,
  artistGenres: Map<string, EnrichedArtist>,
): RecommendationInput {
  const signals = extractListeningSignals(events, analytics, artistGenres);
  const listenedArtists = new Set(events.map((event) => normalizeArtistName(event.artist)));

  return {
    topGenres: analytics.topGenres.map((genre) => genre.genre).slice(0, 5),
    topArtists: analytics.topArtists.map((artist) => artist.name).slice(0, 5),
    listenedArtists,
    dominantPersonalityId: personality.dominantId,
    dominantPersonalityName: personality.dominantName,
    lateNightShare: signals.lateNightShare,
    nicheArtistShare: signals.nicheArtistShare,
  };
}

async function collectCandidates(
  input: RecommendationInput,
  artistGenres: Map<string, EnrichedArtist>,
): Promise<RecommendationCandidate[]> {
  const candidates: RecommendationCandidate[] = [];
  const seen = new Set<string>();

  const seeds = input.topArtists.slice(0, MAX_SEED_ARTISTS);
  for (const seedName of seeds) {
    const seedMeta = artistGenres.get(normalizeArtistName(seedName));
    if (!seedMeta?.spotifyArtistId) continue;

    const related = await getRelatedArtists(seedMeta.spotifyArtistId);
    for (const artist of related?.artists ?? []) {
      const key = normalizeArtistName(artist.name);
      if (seen.has(key) || isAlreadyListened(artist.name, input.listenedArtists)) continue;
      seen.add(key);
      candidates.push(toCandidate(artist, seedName, "related"));
    }
  }

  if (candidates.length < RECOMMENDATION_COUNT) {
    for (const genre of input.topGenres.slice(0, 2)) {
      const search = await searchArtistsByGenre(genre, 8);
      for (const artist of search?.artists.items ?? []) {
        const key = normalizeArtistName(artist.name);
        if (seen.has(key) || isAlreadyListened(artist.name, input.listenedArtists)) continue;
        seen.add(key);
        candidates.push(toCandidate(artist, input.topArtists[0] ?? "your rotation", "genre-search"));
      }
    }
  }

  return candidates;
}

export async function generateRecommendations(
  events: NormalizedListeningEvent[],
  analytics: AnalyticsSummary,
  personality: PersonalityAnalysis,
  artistGenres: Map<string, EnrichedArtist>,
): Promise<ArtistRecommendation[]> {
  if (!isSpotifyConfigured()) return [];

  const input = buildInput(events, analytics, personality, artistGenres);
  const candidates = await collectCandidates(input, artistGenres);

  const ranked = candidates
    .map((candidate) => ({
      candidate,
      score: scoreCandidate(candidate, input),
    }))
    .sort((a, b) => b.score - a.score);

  const recommendations: ArtistRecommendation[] = [];
  const picked = new Set<string>();

  for (const entry of ranked) {
    const key = normalizeArtistName(entry.candidate.name);
    if (picked.has(key)) continue;

    picked.add(key);
    const copy = buildRecommendationCopy(entry.candidate, input);
    recommendations.push({
      artistName: entry.candidate.name,
      spotifyArtistId: entry.candidate.spotifyArtistId,
      imageUrl: entry.candidate.imageUrl,
      genres: entry.candidate.genres.slice(0, 4),
      explanation: copy.explanation,
      reason: copy.reason,
      label: copy.label,
    });

    if (recommendations.length >= RECOMMENDATION_COUNT) break;
  }

  return recommendations;
}
