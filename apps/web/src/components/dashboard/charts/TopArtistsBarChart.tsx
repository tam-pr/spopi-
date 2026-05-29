"use client";

import type { TopItem } from "@/lib/api/types";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: TopItem[];
};

export function TopArtistsBarChart({ data }: Props) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.slice(0, 8)} margin={{ top: 8, right: 8, left: 0, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.16)" />
          <XAxis
            dataKey="name"
            angle={-20}
            textAnchor="end"
            interval={0}
            height={56}
            tick={{ fill: "#dbeafe", fontSize: 11 }}
          />
          <YAxis tick={{ fill: "#dbeafe", fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: "#0f172a", border: "2px solid #67e8f9", borderRadius: "8px" }}
          />
          <Bar dataKey="minutes" fill="#22d3ee" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

