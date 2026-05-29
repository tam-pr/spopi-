"use client";

import type { TopGenre } from "@/lib/api/types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  data: TopGenre[];
};

const COLORS = ["#22d3ee", "#f472b6", "#facc15", "#a78bfa", "#34d399", "#fb7185", "#60a5fa"];

export function GenreDistributionChart({ data }: Props) {
  const safeData =
    data.length > 0 ? data.filter((item) => item.genre !== "Unknown" && item.genre !== "Other") : [];
  const chartData = safeData.length > 0 ? safeData : [{ genre: "No genres yet", minutes: 1, streams: 1 }];

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData.slice(0, 7)}
            dataKey="minutes"
            nameKey="genre"
            cx="50%"
            cy="50%"
            outerRadius={90}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={2}
          >
            {chartData.slice(0, 7).map((entry, index) => (
              <Cell key={`${entry.genre}-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value} min`, name]}
            contentStyle={{ background: "#111827", border: "2px solid #a78bfa", borderRadius: "8px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

