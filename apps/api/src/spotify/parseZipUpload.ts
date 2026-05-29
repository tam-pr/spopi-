import { assertMaxBytes, assertZipMagic, requireHeader } from "../lib/validation";
import { ApiError } from "../lib/errors";
import {
  findStreamingHistoryFiles,
  normalizeStreamingHistoryRows,
  parseStreamingHistoryFile,
} from "./streamingHistory";
import type { NormalizedListeningEvent } from "./types";
import { unzipToTextFiles } from "./zip";

export type ParsedSpotifyZip = {
  events: NormalizedListeningEvent[];
  streamingHistoryFiles: string[];
};

export const MAX_ZIP_BYTES = 50 * 1024 * 1024;

export async function parseSpotifyZipUpload(params: {
  contentTypeHeader: string | string[] | undefined;
  body: unknown;
}): Promise<ParsedSpotifyZip> {
  const contentType = requireHeader(params.contentTypeHeader, "content-type");
  if (!contentType.toLowerCase().includes("zip")) {
    throw new ApiError({
      status: 415,
      code: "UNSUPPORTED_MEDIA_TYPE",
      message: "Upload must be sent as application/zip.",
      details: { contentType },
    });
  }

  const zipBuffer = params.body;
  if (!Buffer.isBuffer(zipBuffer) || zipBuffer.byteLength === 0) {
    throw new ApiError({
      status: 400,
      code: "BAD_REQUEST",
      message: "Missing ZIP body.",
    });
  }

  assertMaxBytes(zipBuffer, MAX_ZIP_BYTES);
  assertZipMagic(zipBuffer);

  const files = await unzipToTextFiles(zipBuffer);
  const streamingFiles = findStreamingHistoryFiles(files);
  const events: NormalizedListeningEvent[] = [];

  for (const file of streamingFiles) {
    const rows = parseStreamingHistoryFile(file);
    events.push(...normalizeStreamingHistoryRows(rows));
  }

  return {
    events,
    streamingHistoryFiles: streamingFiles.map((f) => f.path),
  };
}

