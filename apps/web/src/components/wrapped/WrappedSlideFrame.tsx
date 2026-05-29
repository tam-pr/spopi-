"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  accentClass: string;
  children: ReactNode;
};

export function WrappedSlideFrame({ title, subtitle, accentClass, children }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -10 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`min-h-[420px] w-full rounded-2xl border-4 p-5 shadow-[8px_8px_0_rgba(0,0,0,0.45)] md:min-h-[500px] ${accentClass}`}
    >
      <div className="mb-5 flex items-center justify-between border-b-2 border-black/30 pb-3">
        <div>
          <h3 className="text-xl font-black uppercase tracking-wider text-black md:text-2xl">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-black/75">{subtitle}</p> : null}
        </div>
        <div className="flex gap-1">
          <span className="h-3 w-3 rounded-sm bg-black/70" />
          <span className="h-3 w-3 rounded-sm bg-black/50" />
          <span className="h-3 w-3 rounded-sm bg-black/30" />
        </div>
      </div>

      <div className="flex min-h-[320px] flex-col justify-center">{children}</div>
    </motion.article>
  );
}

