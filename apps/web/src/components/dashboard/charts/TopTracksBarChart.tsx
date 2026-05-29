"use client";

import type { TopItem } from "@/lib/api/types";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
  data: TopItem[];
};

export function TopTracksBarChart({ data }: Props) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={data.slice(0, 7)} margin={{ top: 8, right: 8, left: 32, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.16)" />
          <XAxis type="number" tick={{ fill: "#fde68a", fontSize: 11 }} />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            tick={{ fill: "#fde68a", fontSize: 11 }}
            tickFormatter={(value: string) =>
              value.length > 22 ? `${value.slice(0, 22)}...` : value
            }
          />
          <Tooltip
            contentStyle={{ background: "#1f2937", border: "2px solid #f472b6", borderRadius: "8px" }}
          />
          <Bar dataKey="minutes" fill="#f472b6" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

