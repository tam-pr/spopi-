"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RetroPanelProps = {
  title: string;
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function RetroPanel({ title, children, className, delay = 0 }: RetroPanelProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className={[
        "rounded-xl border-4 border-fuchsia-300/80 bg-[#1a1435]/85 p-3 shadow-[6px_6px_0_0_rgba(34,211,238,0.55)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="mb-3 flex items-center justify-between border-b-2 border-cyan-300/40 pb-2">
        <h3 className="text-sm font-black uppercase tracking-widest text-cyan-100">{title}</h3>
        <div className="flex gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-pink-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
        </div>
      </div>
      {children}
    </motion.section>
  );
}

