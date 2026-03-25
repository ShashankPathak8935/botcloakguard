import React, { useState } from "react";
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

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
  const [hoveredCountry, setHoveredCountry] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const getCountryName = (geo) =>
    geo?.properties?.NAME ||
    geo?.properties?.NAME_LONG ||
    geo?.properties?.ADMIN ||
    geo?.properties?.SOVEREIGNT ||
    geo?.properties?.name ||
    "Unknown";

  return (
    <div
      className="
      w-full rounded-2xl p-6
      bg-white border border-gray-200 text-gray-900
      shadow-xl shadow-black/5
      dark:bg-[#0F111A] dark:border-white/10 dark:text-gray-100 dark:shadow-black/30
      [--map-fill:#9DB4F5] [--map-hover:#3B82F6] [--map-press:#2563EB]
      [--chart-grid:#E5E7EB] [--chart-tick:#6B7280] [--chart-bar:#3B82F6]
      [--tooltip-bg:#0B1220] [--tooltip-border:#1F2937]
      dark:[--map-fill:#3E4B63] dark:[--map-hover:#60A5FA] dark:[--map-press:#3B82F6]
      dark:[--chart-grid:#1F2937] dark:[--chart-tick:#9CA3AF] dark:[--chart-bar:#60A5FA]
      dark:[--tooltip-bg:#0B1220] dark:[--tooltip-border:#243041]
    "
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Most clients</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Our client number based on their primary location
          </p>
        </div>

        <select
          className="
          px-3 py-1.5 rounded-lg text-sm border
          bg-gray-100 border-gray-300 text-gray-700
          focus:outline-none focus:ring-2 focus:ring-indigo-500/30
          dark:bg-[#1A1D29] dark:border-white/10 dark:text-gray-200
        "
        >
          <option>Last month</option>
          <option>Last week</option>
        </select>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6">
        {/* ---------- LEFT MAP ---------- */}
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-white to-indigo-50/40 p-4 dark:border-white/10 dark:bg-gradient-to-br dark:from-[#0F111A] dark:via-[#0F111A] dark:to-[#101827]">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Global Distribution
            </div>
            <div className="text-[11px] text-gray-500 dark:text-white/50">
              Live snapshot
            </div>
          </div>
          <div
            className="relative h-[320px]"
            onMouseLeave={() => setHoveredCountry("")}
          >
            {hoveredCountry && (
              <div
                className="
                  absolute z-10 -translate-y-2 -translate-x-1/2
                  rounded-lg px-2.5 py-1 text-[11px]
                  bg-gray-900 text-white shadow-lg shadow-black/20
                  dark:bg-white dark:text-gray-900
                  pointer-events-none
                "
                style={{ left: tooltipPos.x, top: tooltipPos.y }}
              >
                {hoveredCountry}
              </div>
            )}
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
                      onMouseEnter={(e) => {
                        setHoveredCountry(getCountryName(geo));
                        const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                        setTooltipPos({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        });
                      }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                        setTooltipPos({
                          x: e.clientX - rect.left,
                          y: e.clientY - rect.top,
                        });
                      }}
                      onMouseLeave={() => setHoveredCountry("")}
                      style={{
                        default: {
                          fill: "var(--map-fill)",
                          outline: "none",
                        },
                        hover: {
                          fill: "var(--map-hover)",
                          outline: "none",
                        },
                        pressed: {
                          fill: "var(--map-press)",
                          outline: "none",
                        },
                      }}
                    >
                    <title>{geo.properties.NAME}</title>
                  </Geography>
                ))
              }
            </Geographies>
            </ComposableMap>
          </div>
        </div>

        {/* ---------- RIGHT BAR CHART ---------- */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#0F111A]">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Top Countries
            </div>
            <div className="text-[11px] text-gray-500 dark:text-white/50">
              Active users
            </div>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer>
              <BarChart data={countryData} barCategoryGap={18} barGap={6}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--chart-grid)"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--chart-tick)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fill: "var(--chart-tick)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "var(--tooltip-bg)",
                    border: "1px solid var(--tooltip-border)",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                  formatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />

                <Bar dataKey="value" fill="var(--chart-bar)" radius={[6, 6, 0, 0]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
