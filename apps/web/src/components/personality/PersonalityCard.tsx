"use client";

import { motion } from "framer-motion";
import type { PersonalityArchetype } from "@/lib/api/types";

const CARD_ACCENTS = [
  "border-cyan-300 bg-cyan-300/10",
  "border-pink-300 bg-pink-300/10",
  "border-yellow-300 bg-yellow-300/10",
  "border-violet-300 bg-violet-300/10",
  "border-lime-300 bg-lime-300/10",
];

type Props = {
  archetype: PersonalityArchetype;
  index: number;
};

export function PersonalityCard({ archetype, index }: Props) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];

  return (
    <motion.article
      whileHover={{ y: -4, rotate: archetype.isDominant ? 0 : -1 }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      className={[
        "rounded-xl border-2 p-4 shadow-[4px_4px_0_rgba(0,0,0,0.45)]",
        accent,
        archetype.isDominant ? "ring-2 ring-yellow-300 scale-[1.02]" : "",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl">{archetype.icon}</span>
        <span className="rounded-md border border-white/30 bg-black/35 px-2 py-0.5 text-xs font-bold">
          {archetype.score}
        </span>
      </div>
      <h4 className="mt-2 text-lg font-black text-white">{archetype.name}</h4>
      <p className="mt-1 text-xs uppercase tracking-wider text-white/70">{archetype.tagline}</p>
      <p className="mt-2 text-sm text-white/85">{archetype.description}</p>
      {archetype.isDominant ? (
        <p className="mt-3 inline-block rounded-md border border-yellow-300 bg-yellow-300/20 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-yellow-100">
          Your vibe
        </p>
      ) : null}
    </motion.article>
  );
}
