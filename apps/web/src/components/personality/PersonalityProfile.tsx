"use client";

import { motion } from "framer-motion";
import type { PersonalityAnalysis } from "@/lib/api/types";
import { PersonalityCard } from "./PersonalityCard";

type Props = {
  personality: PersonalityAnalysis;
};

export function PersonalityProfile({ personality }: Props) {
  const dominant = personality.archetypes.find((item) => item.isDominant) ?? personality.archetypes[0];

  return (
    <section className="w-full max-w-6xl space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border-4 border-fuchsia-300/80 bg-gradient-to-br from-[#2a1f4d] via-[#1a1435] to-[#0f1024] p-5 shadow-[8px_8px_0_rgba(34,211,238,0.45)]"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Your Listening Personality</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-4xl">{dominant?.icon}</span>
          <div>
            <h2 className="text-3xl font-black text-pink-100 md:text-4xl">{personality.dominantName}</h2>
            <p className="text-sm text-white/75">{personality.headline}</p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-sm text-white/85 md:text-base">{personality.commentary}</p>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {personality.archetypes.map((archetype, index) => (
          <PersonalityCard key={archetype.id} archetype={archetype} index={index} />
        ))}
      </div>
    </section>
  );
}
