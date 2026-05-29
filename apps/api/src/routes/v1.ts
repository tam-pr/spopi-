import express from "express";
import { computeAnalytics } from "../analytics/service";
import { analyzePersonalities } from "../personality/service";
import { generateRecommendations } from "../recommendations/service";
import { enrichArtists } from "../spotify-api/artistEnrichment";
import { MAX_ZIP_BYTES, parseSpotifyZipUpload } from "../spotify/parseZipUpload";

const rawZipBodyParser = express.raw({
  type: ["application/zip", "application/x-zip-compressed"],
  limit: `${MAX_ZIP_BYTES}b`,
});

export const v1Router = express.Router();

v1Router.post("/upload", rawZipBodyParser, async (req, res) => {
  const parsed = await parseSpotifyZipUpload({
    contentTypeHeader: req.headers["content-type"],
    body: req.body,
  });

  res.json({
    ok: true,
    streamingHistoryFiles: parsed.streamingHistoryFiles,
    events: parsed.events.slice(0, 50),
    eventCount: parsed.events.length,
  });
});

v1Router.post("/analytics", rawZipBodyParser, async (req, res) => {
  const parsed = await parseSpotifyZipUpload({
    contentTypeHeader: req.headers["content-type"],
    body: req.body,
  });

  const artistPlayTime = new Map<string, number>();
  for (const event of parsed.events) {
    artistPlayTime.set(event.artist, (artistPlayTime.get(event.artist) ?? 0) + event.msPlayed);
  }

  const uniqueArtists = [...new Set(parsed.events.map((event) => event.artist))].sort(
    (a, b) => (artistPlayTime.get(b) ?? 0) - (artistPlayTime.get(a) ?? 0),
  );

  const artistGenres = await enrichArtists(uniqueArtists);
  const analytics = computeAnalytics(parsed.events, artistGenres);
  const personality = analyzePersonalities(parsed.events, analytics, artistGenres);
  const recommendations = await generateRecommendations(
    parsed.events,
    analytics,
    personality,
    artistGenres,
  );

  res.json({
    ok: true,
    streamingHistoryFiles: parsed.streamingHistoryFiles,
    eventCount: parsed.events.length,
    analytics,
    personality,
    recommendations,
  });
});

