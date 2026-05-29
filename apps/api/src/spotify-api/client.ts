import { getSpotifyAccessToken } from "./auth";
import { fetchWithRateLimit, sleep } from "./rateLimit";
import type { SpotifyArtistSearchResponse, SpotifyRelatedArtistsResponse } from "./types";

const REQUEST_DELAY_MS = 300;

export async function searchArtistByName(
  artistName: string,
): Promise<SpotifyArtistSearchResponse | null> {
  const token = await getSpotifyAccessToken();
  if (!token) return null;

  const query = encodeURIComponent(artistName);
  const url = `https://api.spotify.com/v1/search?q=artist:${query}&type=artist&limit=1`;

  await sleep(REQUEST_DELAY_MS);

  const response = await fetchWithRateLimit(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return null;

  return (await response.json()) as SpotifyArtistSearchResponse;
}

export async function searchArtistsByGenre(
  genre: string,
  limit = 5,
): Promise<SpotifyArtistSearchResponse | null> {
  const token = await getSpotifyAccessToken();
  if (!token) return null;

  const query = encodeURIComponent(genre);
  const url = `https://api.spotify.com/v1/search?q=genre:${query}&type=artist&limit=${limit}`;

  await sleep(REQUEST_DELAY_MS);

  const response = await fetchWithRateLimit(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return null;

  return (await response.json()) as SpotifyArtistSearchResponse;
}

export async function getRelatedArtists(
  spotifyArtistId: string,
): Promise<SpotifyRelatedArtistsResponse | null> {
  const token = await getSpotifyAccessToken();
  if (!token) return null;

  const url = `https://api.spotify.com/v1/artists/${spotifyArtistId}/related-artists`;

  await sleep(REQUEST_DELAY_MS);

  const response = await fetchWithRateLimit(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) return null;

  return (await response.json()) as SpotifyRelatedArtistsResponse;
}
