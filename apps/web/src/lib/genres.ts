export function normalizeArtistName(name: string): string {
  return name.trim().toLowerCase();
}

export function getArtistGenres(
  artistName: string,
  artistGenres: Record<string, { genres: string[] }>,
): string[] {
  return artistGenres[normalizeArtistName(artistName)]?.genres ?? [];
}
