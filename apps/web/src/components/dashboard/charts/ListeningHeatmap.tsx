"use client";

import type { MonthlyTrend } from "@/lib/api/types";

type Props = {
  data: MonthlyTrend[];
};

function intensityClass(value: number, max: number): string {
  if (max <= 0) return "bg-white/10";
  const ratio = value / max;
  if (ratio > 0.8) return "bg-pink-400";
  if (ratio > 0.6) return "bg-fuchsia-400";
  if (ratio > 0.4) return "bg-cyan-400";
  if (ratio > 0.2) return "bg-sky-400";
  return "bg-white/15";
}

export function ListeningHeatmap({ data }: Props) {
  const byMonth = new Map(data.map((d) => [d.month, d.minutes]));
  const maxMinutes = data.reduce((m, item) => Math.max(m, item.minutes), 0);
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const year = data[0]?.month.slice(0, 4) ?? "----";

  return (
    <div className="space-y-3">
      <p className="text-xs text-white/70">Monthly listening intensity ({year})</p>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-12">
        {months.map((month) => {
          const key = `${year}-${month}`;
          const minutes = byMonth.get(key) ?? 0;
          return (
            <div
              key={key}
              className="rounded-md border border-white/20 bg-black/30 p-2 text-center"
              title={`${key}: ${minutes} min`}
            >
              <div className="mb-2 text-[10px] text-white/70">{month}</div>
              <div className={`mx-auto h-8 w-8 rounded ${intensityClass(minutes, maxMinutes)}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

