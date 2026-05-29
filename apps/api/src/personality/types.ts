export type PersonalityId =
  | "night-owl"
  | "loop-addict"
  | "genre-hopper"
  | "main-character-listener"
  | "indie-explorer"
  | "chaos-listener"
  | "sad-girl-autumn"
  | "sonic-time-traveler"
  | "playlist-curator"
  | "underground-scout"
  | "comfort-artist-devotee"
  | "energy-spike-listener"
  | "emotional-archivist"
  | "dream-pop-drifter"
  | "hyperpop-maximalist";

export type ListeningSignals = {
  lateNightShare: number;
  replayRatio: number;
  topTrackShare: number;
  genreDiversity: number;
  artistLoyalty: number;
  nicheArtistShare: number;
  monthlyConsistency: number;
  avgSessionSize: number;
  moodVolatility: number;
  autumnShare: number;
  indieGenreShare: number;
  hyperpopShare: number;
  dreamPopShare: number;
  energyGenreShare: number;
  longTailShare: number;
  uniqueArtistRatio: number;
};

export type PersonalityArchetype = {
  id: PersonalityId;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  score: number;
  isDominant: boolean;
};

export type PersonalityAnalysis = {
  dominantId: PersonalityId;
  dominantName: string;
  headline: string;
  commentary: string;
  archetypes: PersonalityArchetype[];
};
