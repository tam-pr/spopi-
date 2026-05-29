import { ApiError } from "../lib/errors";
import { safeJsonParse } from "./json";
import type { NormalizedListeningEvent, ZipSpotifyFile } from "./types";

type SpotifyStreamingHistoryRow = Partial<{
  endTime: string;
  artistName: string;
  trackName: string;
  msPlayed: number;
  // Some exports include these alternate keys:
  ts: string;
  master_metadata_album_album_name: string;
  master_metadata_track_name: string;
  master_metadata_album_artist_name: string;
  ms_played: number;
}>;

const streamingHistoryFileRegex = /(^|\/)StreamingHistory_music_\d+\.json$/i;
const altStreamingHistoryRegex = /(^|\/)Streaming_History_Audio_\d+\.json$/i;

export function findStreamingHistoryFiles(files: ZipSpotifyFile[]): ZipSpotifyFile[] {
  const matches = files.filter((f) => {
    const p = f.path.replaceAll("\\", "/");
    return streamingHistoryFileRegex.test(p) || altStreamingHistoryRegex.test(p);
  });

  if (matches.length === 0) {
    throw new ApiError({
      status: 422,
      code: "UNPROCESSABLE_ENTITY",
      message:
        "Could not find Spotify streaming history files in the ZIP (expected StreamingHistory_music_*.json).",
    });
  }

  return matches;
}

export function parseStreamingHistoryFile(file: ZipSpotifyFile): SpotifyStreamingHistoryRow[] {
  const data = safeJsonParse<unknown>(file.text, file.path);
  if (!Array.isArray(data)) {
    throw new ApiError({
      status: 422,
      code: "UNPROCESSABLE_ENTITY",
      message: `Expected an array in ${file.path}.`,
    });
  }
  return data as SpotifyStreamingHistoryRow[];
}

export function normalizeStreamingHistoryRows(
  rows: SpotifyStreamingHistoryRow[],
): NormalizedListeningEvent[] {
  const out: NormalizedListeningEvent[] = [];

  for (const row of rows) {
    const msPlayed =
      typeof row.msPlayed === "number"
        ? row.msPlayed
        : typeof row.ms_played === "number"
          ? row.ms_played
          : null;

    const artist =
      typeof row.artistName === "string"
        ? row.artistName
        : typeof row.master_metadata_album_artist_name === "string"
          ? row.master_metadata_album_artist_name
          : "";

    const track =
      typeof row.trackName === "string"
        ? row.trackName
        : typeof row.master_metadata_track_name === "string"
          ? row.master_metadata_track_name
          : "";

    const album =
      typeof row.master_metadata_album_album_name === "string"
        ? row.master_metadata_album_album_name
        : null;

    const rawTime =
      typeof row.endTime === "string"
        ? row.endTime
        : typeof row.ts === "string"
          ? row.ts
          : null;

    if (!rawTime || !msPlayed || msPlayed < 0 || !artist || !track) continue;

    const parsed = new Date(rawTime);
    if (Number.isNaN(parsed.getTime())) continue;

    out.push({
      timestamp: parsed.toISOString(),
      artist,
      track,
      album,
      msPlayed,
    });
  }

  return out;
}

