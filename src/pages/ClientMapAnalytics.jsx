import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/* ---------- STATIC DATA ---------- */

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryData = [
  { name: "Japan", value: 44000 },
  { name: "Greenland", value: 41000 },
  { name: "India", value: 38000 },
  { name: "Egypt", value: 27000 },
  { name: "Mexico", value: 19000 },
  { name: "Angola", value: 13000 },
  { name: "Colombia", value: 11000 },
  { name: "Finland", value: 7000 },
];

/* ---------- COMPONENT ---------- */

export default function ClientMapAnalytics() {
  return (
    <div
      className="
      w-full rounded-2xl p-6 transition
      bg-white border border-gray-200 text-gray-900
      dark:bg-[#0F111A] dark:border-white/10 dark:text-gray-100
    "
    >
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Most clients</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Our client number based on their primary location
          </p>
        </div>

        <select
          className="
          px-3 py-1 rounded-lg text-sm border
          bg-gray-100 border-gray-300
          dark:bg-[#1A1D29] dark:border-white/10
        "
        >
          <option>Last month</option>
          <option>Last week</option>
        </select>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex gap-6">
        {/* ---------- LEFT MAP ---------- */}
        <div className="w-1/2 h-[350px]">
          <ComposableMap
            projectionConfig={{ scale: 200 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#1F2937",
                        outline: "none",
                      },
                      hover: {
                        fill: "#3B82F6",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#2563EB",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>

        {/* ---------- RIGHT BAR CHART ---------- */}
        <div className="w-1/2 h-[350px]">
          <ResponsiveContainer>
            <BarChart data={countryData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  background: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />

              <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
