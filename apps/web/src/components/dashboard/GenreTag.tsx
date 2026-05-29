"use client";

import { motion } from "framer-motion";

const STYLES = [
  "bg-cyan-300 text-black border-black",
  "bg-pink-300 text-black border-black",
  "bg-yellow-300 text-black border-black",
  "bg-violet-300 text-black border-black",
  "bg-lime-300 text-black border-black",
  "bg-orange-300 text-black border-black",
];

type Props = {
  label: string;
  index?: number;
  size?: "sm" | "md";
};

export function GenreTag({ label, index = 0, size = "md" }: Props) {
  const style = STYLES[index % STYLES.length];
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs";

  return (
    <motion.span
      whileHover={{ rotate: -2, scale: 1.06, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
      className={`inline-block rounded-md border-2 font-black uppercase tracking-wide shadow-[3px_3px_0_rgba(0,0,0,0.65)] ${style} ${sizeClass}`}
    >
      {label}
    </motion.span>
  );
}
