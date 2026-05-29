"use client";

import { motion } from "framer-motion";
import type { ArtistRecommendation } from "@/lib/api/types";
import { GenreTag } from "@/components/dashboard/GenreTag";

const CARD_STYLES = [
  "border-cyan-300 bg-cyan-300/10",
  "border-pink-300 bg-pink-300/10",
  "border-yellow-300 bg-yellow-300/10",
];

type Props = {
  recommendation: ArtistRecommendation;
  index: number;
};

export function RecommendationCard({ recommendation, index }: Props) {
  const style = CARD_STYLES[index % CARD_STYLES.length];

  return (
    <motion.article
      whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 14 }}
      className={`relative overflow-hidden rounded-xl border-2 p-4 shadow-[6px_6px_0_rgba(0,0,0,0.5)] ${style}`}
    >
      <div className="absolute -right-6 -top-6 h-20 w-20 rotate-12 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-4 h-16 w-16 -rotate-6 rounded-full bg-white/10" />

      <div className="relative z-10 space-y-3">
        <span className="inline-block rounded-md border border-white/30 bg-black/40 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white/85">
          {recommendation.label}
        </span>

        <div className="flex items-center gap-3">
          {recommendation.imageUrl ? (
            <img
              src={recommendation.imageUrl}
              alt={recommendation.artistName}
              className="h-16 w-16 rounded-lg border-2 border-black/40 object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-black/40 bg-black/30 text-2xl">
              🎵
            </div>
          )}
          <div>
            <h4 className="text-xl font-black text-white">{recommendation.artistName}</h4>
            <p className="text-xs text-white/70">{recommendation.explanation}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {recommendation.genres.slice(0, 3).map((genre, genreIndex) => (
            <GenreTag key={`${recommendation.artistName}-${genre}`} label={genre} index={genreIndex} size="sm" />
          ))}
        </div>

        <p className="rounded-md border border-white/20 bg-black/35 p-2 text-xs text-white/85">
          {recommendation.reason}
        </p>
      </div>
    </motion.article>
  );
}
