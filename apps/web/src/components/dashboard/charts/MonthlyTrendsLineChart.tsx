"use client";

import type { MonthlyTrend } from "@/lib/api/types";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: MonthlyTrend[];
};

export function MonthlyTrendsLineChart({ data }: Props) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.16)" />
          <XAxis dataKey="month" tick={{ fill: "#c4b5fd", fontSize: 11 }} />
          <YAxis tick={{ fill: "#c4b5fd", fontSize: 11 }} />
          <Tooltip
            contentStyle={{ background: "#0f172a", border: "2px solid #c4b5fd", borderRadius: "8px" }}
          />
          <Line
            type="monotone"
            dataKey="minutes"
            stroke="#c4b5fd"
            strokeWidth={3}
            dot={{ r: 4, fill: "#facc15" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

