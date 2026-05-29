import { prisma } from "@spopi/db";
import type { EnrichedArtist } from "./types";
import { normalizeArtistName } from "./normalize";

export async function getCachedArtists(
  artistNames: string[],
): Promise<Map<string, EnrichedArtist>> {
  const normalized = [...new Set(artistNames.map(normalizeArtistName))];
  if (normalized.length === 0) return new Map();

  const rows = await prisma.artistMetadata.findMany({
    where: { artistName: { in: normalized } },
  });

  const map = new Map<string, EnrichedArtist>();
  for (const row of rows) {
    map.set(row.artistName, {
      artistName: row.artistName,
      spotifyArtistId: row.spotifyArtistId,
      genres: row.genres,
      imageUrl: row.imageUrl,
    });
  }

  return map;
}

export async function saveArtistMetadata(artist: EnrichedArtist): Promise<void> {
  const artistName = normalizeArtistName(artist.artistName);

  await prisma.artistMetadata.upsert({
    where: { artistName },
    create: {
      artistName,
      spotifyArtistId: artist.spotifyArtistId,
      genres: artist.genres,
      imageUrl: artist.imageUrl,
    },
    update: {
      spotifyArtistId: artist.spotifyArtistId,
      genres: artist.genres,
      imageUrl: artist.imageUrl,
      fetchedAt: new Date(),
    },
  });
}
