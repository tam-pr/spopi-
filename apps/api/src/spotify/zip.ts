import JSZip from "jszip";
import { ApiError } from "../lib/errors";
import type { ZipSpotifyFile } from "./types";

export async function unzipToTextFiles(zipBuffer: Buffer): Promise<ZipSpotifyFile[]> {
  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(zipBuffer);
  } catch {
    throw new ApiError({
      status: 422,
      code: "UNPROCESSABLE_ENTITY",
      message: "Could not read ZIP file.",
    });
  }

  const files = Object.values(zip.files)
    .filter((f) => !f.dir)
    .map((f) => f.name);

  const results: ZipSpotifyFile[] = [];
  for (const path of files) {
    const file = zip.file(path);
    if (!file) continue;
    const text = await file.async("text");
    results.push({ path, text });
  }

  return results;
}

