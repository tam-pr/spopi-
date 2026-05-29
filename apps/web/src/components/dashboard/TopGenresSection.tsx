"use client";

import type { TopGenre } from "@/lib/api/types";
import { GenreTag } from "./GenreTag";

type Props = {
  topGenres: TopGenre[];
  genreTags: string[];
};

export function TopGenresSection({ topGenres, genreTags }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {genreTags.map((tag, index) => (
          <GenreTag key={tag} label={tag} index={index} />
        ))}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {topGenres.slice(0, 6).map((genre, index) => (
          <div
            key={genre.genre}
            className="rounded-lg border-2 border-white/25 bg-black/35 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <GenreTag label={genre.genre} index={index} size="sm" />
              <span className="text-xs font-bold text-white/75">{genre.minutes} min</span>
            </div>
            <p className="mt-2 text-xs text-white/60">{genre.streams} streams</p>
          </div>
        ))}
      </div>
    </div>
  );
}
