import type { AnalyticsSummary, PersonalityAnalysis } from "@/lib/api/types";

export type ListeningPersonality = {
  label: string;
  subtitle: string;
};

export type WrappedStory = {
  topArtistName: string;
  topArtistMinutes: number;
  topTrackName: string;
  topTrackMinutes: number;
  totalMinutes: number;
  personality: ListeningPersonality;
  funStats: Array<{ label: string; value: string }>;
};

export function buildWrappedStory(
  data: AnalyticsSummary,
  personality?: PersonalityAnalysis,
): WrappedStory {
  return {
    topArtistName: data.topArtists[0]?.name ?? "Unknown Artist",
    topArtistMinutes: data.topArtists[0]?.minutes ?? 0,
    topTrackName: data.topTracks[0]?.name ?? "Unknown Track",
    topTrackMinutes: data.topTracks[0]?.minutes ?? 0,
    totalMinutes: data.totalListeningMinutes,
    personality: personality
      ? { label: personality.dominantName, subtitle: personality.headline }
      : { label: "Mood Explorer", subtitle: "Your listening style is still unfolding." },
    funStats: [
      { label: "Unique Artists", value: `${data.uniqueArtists}` },
      { label: "Unique Tracks", value: `${data.uniqueTracks}` },
      { label: "Unique Albums", value: `${data.uniqueAlbums}` },
      { label: "Top Genre", value: data.topGenres[0]?.genre ?? "Still discovering" },
      {
        label: "Most Active Month",
        value: data.monthlyListeningTrends.reduce((best, current) => {
          if (!best || current.minutes > best.minutes) return current;
          return best;
        }, data.monthlyListeningTrends[0])?.month ?? "N/A",
      },
    ],
  };
}
