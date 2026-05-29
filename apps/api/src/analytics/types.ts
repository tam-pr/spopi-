export type TopItem = {
  name: string;
  streams: number;
  minutes: number;
};

export type TopGenre = {
  genre: string;
  streams: number;
  minutes: number;
};

export type ArtistGenreInfo = {
  genres: string[];
  imageUrl: string | null;
};

export type MonthlyTrend = {
  month: string;
  streams: number;
  minutes: number;
};

export type AnalyticsSummary = {
  totalListeningMinutes: number;
  totalStreams: number;
  uniqueArtists: number;
  uniqueTracks: number;
  uniqueAlbums: number;
  topArtists: TopItem[];
  topTracks: TopItem[];
  topGenres: TopGenre[];
  monthlyListeningTrends: MonthlyTrend[];
  genreTags: string[];
  artistGenres: Record<string, ArtistGenreInfo>;
};

