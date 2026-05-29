export type NormalizedListeningEvent = {
  timestamp: string;
  artist: string;
  track: string;
  album: string | null;
  msPlayed: number;
};

export type ZipSpotifyFile = {
  path: string;
  text: string;
};

