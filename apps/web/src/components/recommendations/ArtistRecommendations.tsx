"use client";

import { motion } from "framer-motion";
import type { ArtistRecommendation } from "@/lib/api/types";
import { RecommendationCard } from "./RecommendationCard";

type Props = {
  recommendations: ArtistRecommendation[];
};

export function ArtistRecommendations({ recommendations }: Props) {
  if (recommendations.length === 0) {
    return (
      <section className="w-full max-w-6xl rounded-xl border-2 border-white/20 bg-black/30 p-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-cyan-100">Artist Discoveries</h3>
        <p className="mt-2 text-sm text-white/70">
          Add Spotify API credentials to unlock personalized artist recommendations.
        </p>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-6xl space-y-3"
    >
      <div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-pink-100">Artist Discoveries</h3>
        <p className="text-xs text-white/70">Three emotionally curated picks based on your taste map.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {recommendations.map((recommendation, index) => (
          <RecommendationCard key={recommendation.spotifyArtistId} recommendation={recommendation} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
