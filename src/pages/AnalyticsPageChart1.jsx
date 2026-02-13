import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

/* ---------- STATIC DATA ---------- */

// line chart data
const lineData = [
  { name: "Jan", actual: 48000, projected: 75000 },
  { name: "Feb", actual: 56000, projected: 62000 },
  { name: "Mar", actual: 52000, projected: 76000 },
  { name: "Apr", actual: 68000, projected: 55000 },
  { name: "May", actual: 34000, projected: 55000 },
  { name: "Jun", actual: 45000, projected: 42000 },
  { name: "Jul", actual: 30000, projected: 70000 },
  { name: "Aug", actual: 33000, projected: 30000 },
  { name: "Sep", actual: 58000, projected: 42000 },
  { name: "Oct", actual: 47000, projected: 30000 },
  { name: "Nov", actual: 40000, projected: 62000 },
  { name: "Dec", actual: 54000, projected: 47000 },
];

// bar chart data
const barData = [
  { name: "Search", value: 110000 },
  { name: "Direct", value: 80000 },
  { name: "Referral", value: 56000 },
  { name: "Unassigned", value: 41000 },
  { name: "Social", value: 29000 },
  { name: "Email", value: 15000 },
];

/* ---------- COMPONENT ---------- */

export default function AnalyticsPageChart1() {
  const [activeTab, setActiveTab] = useState("New Users");

  const tabs = [
    { name: "New Users", value: "275K" },
    { name: "Avg. Session", value: "3m 12s" },
    { name: "Subscribers", value: "3.72 M" },
    { name: "Page View", value: "523K" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ---------- LEFT CARD ---------- */}
      <div
        className="
        rounded-2xl p-6 transition
        bg-white border border-gray-200
        dark:bg-[#0F111A] dark:border-white/10
      "
      >
        {/* TABS */}
        <div className="flex gap-8 border-b border-gray-200 dark:border-white/10 pb-4 mb-6">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className="cursor-pointer"
            >
              <p
                className={`
                text-sm
                ${
                  activeTab === tab.name
                    ? "text-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }
              `}
              >
                {tab.name}
              </p>

              <p className="text-xl font-semibold mt-1 dark:text-white">
                {tab.value}
              </p>

              {activeTab === tab.name && (
                <div className="h-[2px] bg-blue-500 mt-2" />
              )}
            </div>
          ))}
        </div>

        {/* LEGEND */}
        <div className="flex gap-8 text-sm mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-[3px] bg-blue-500 rounded" />
            <span className="text-gray-500 dark:text-gray-400">
              Actual Value
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-[3px] bg-emerald-500 rounded border-dashed border" />
            <span className="text-gray-500 dark:text-gray-400">
              Projected Value
            </span>
          </div>
        </div>

        {/* LINE CHART */}
        <div className="h-[300px]">
          <ResponsiveContainer>
            <LineChart data={lineData}>
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
                }}
              />

              <Line
                type="monotone"
                dataKey="actual"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="projected"
                stroke="#10B981"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ---------- RIGHT CARD ---------- */}
      <div
        className="
        rounded-2xl p-6 transition
        bg-white border border-gray-200
        dark:bg-[#0F111A] dark:border-white/10
      "
      >
        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="font-semibold text-lg dark:text-white">
              Top Campaigns
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Users across different sources
            </p>
          </div>

          <select
            className="
            px-3 py-1 rounded-lg text-sm border
            bg-gray-100 border-gray-300
            dark:bg-[#1A1D29] dark:border-white/10
          "
          >
            <option>This Week</option>
          </select>
        </div>

        {/* BAR CHART */}
        <div className="h-[300px]">
          <ResponsiveContainer>
            <BarChart data={barData}>
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
                tickFormatter={(v) => `${v / 1000}k`}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                formatter={(v) => `${(v / 1000).toFixed(0)}K`}
                contentStyle={{
                  background: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
              />

              <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
