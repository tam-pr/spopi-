"use client";

import { motion } from "framer-motion";
import type { AnalyticsSummary, ArtistRecommendation, PersonalityAnalysis } from "@/lib/api/types";
import { getArtistGenres } from "@/lib/genres";
import { ArtistRecommendations } from "@/components/recommendations/ArtistRecommendations";
import { RetroPanel } from "@/components/dashboard/RetroPanel";
import { GenreTag } from "@/components/dashboard/GenreTag";
import { TopGenresSection } from "@/components/dashboard/TopGenresSection";
import { GenreDistributionChart } from "@/components/dashboard/charts/GenreDistributionChart";
import { ListeningHeatmap } from "@/components/dashboard/charts/ListeningHeatmap";
import { MonthlyTrendsLineChart } from "@/components/dashboard/charts/MonthlyTrendsLineChart";
import { TopArtistsBarChart } from "@/components/dashboard/charts/TopArtistsBarChart";
import { TopTracksBarChart } from "@/components/dashboard/charts/TopTracksBarChart";

type Props = {
  data: AnalyticsSummary;
  personality?: PersonalityAnalysis;
  recommendations?: ArtistRecommendation[];
};

function StatCard({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      className={`rounded-lg border-2 bg-black/40 p-3 ${accent}`}
    >
      <div className="text-[11px] uppercase tracking-wider text-white/70">{label}</div>
      <div className="mt-1 text-2xl font-black text-white">{value}</div>
    </motion.div>
  );
}

export function AnalyticsDashboard({ data, personality, recommendations = [] }: Props) {
  const genreTags = data.genreTags ?? [];
  const artistGenres = data.artistGenres ?? {};

  return (
    <div className="w-full max-w-6xl space-y-4">
      {personality ? (
        <div className="rounded-xl border-2 border-yellow-300/70 bg-yellow-300/10 p-4">
          <p className="text-xs uppercase tracking-widest text-yellow-100/80">Dominant Personality</p>
          <p className="mt-1 text-2xl font-black text-yellow-100">{personality.dominantName}</p>
          <p className="mt-1 text-sm text-white/80">{personality.headline}</p>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <StatCard label="Total Minutes" value={data.totalListeningMinutes} accent="border-cyan-300/70" />
        <StatCard label="Total Streams" value={data.totalStreams} accent="border-pink-300/70" />
        <StatCard label="Unique Artists" value={data.uniqueArtists} accent="border-yellow-300/70" />
        <StatCard label="Unique Tracks" value={data.uniqueTracks} accent="border-violet-300/70" />
        <StatCard label="Unique Albums" value={data.uniqueAlbums} accent="border-emerald-300/70" />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <RetroPanel title="Top Artists" delay={0.05}>
          <TopArtistsBarChart data={data.topArtists} />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {data.topArtists.slice(0, 5).flatMap((artist, artistIndex) =>
              getArtistGenres(artist.name, artistGenres).slice(0, 2).map((genre, genreIndex) => (
                <GenreTag
                  key={`${artist.name}-${genre}`}
                  label={genre}
                  index={artistIndex + genreIndex}
                  size="sm"
                />
              )),
            )}
          </div>
        </RetroPanel>
        <RetroPanel title="Top Tracks" delay={0.1}>
          <TopTracksBarChart data={data.topTracks} />
        </RetroPanel>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <RetroPanel title="Top Genres" delay={0.12}>
          <TopGenresSection topGenres={data.topGenres} genreTags={genreTags} />
        </RetroPanel>
        <RetroPanel title="Genre Distribution" delay={0.15}>
          <GenreDistributionChart data={data.topGenres} />
        </RetroPanel>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <RetroPanel title="Monthly Listening Trends" delay={0.2}>
          <MonthlyTrendsLineChart data={data.monthlyListeningTrends} />
        </RetroPanel>
        <RetroPanel title="Genre Moodboard" delay={0.22}>
          <div className="flex flex-wrap gap-2 p-2">
            {genreTags.map((tag, index) => (
              <GenreTag key={tag} label={tag} index={index} />
            ))}
          </div>
        </RetroPanel>
      </div>

      <ArtistRecommendations recommendations={recommendations} />

      <div className="grid gap-3">
        <RetroPanel title="Listening Heatmap" delay={0.25}>
          <ListeningHeatmap data={data.monthlyListeningTrends} />
        </RetroPanel>
      </div>
    </div>
  );
}

