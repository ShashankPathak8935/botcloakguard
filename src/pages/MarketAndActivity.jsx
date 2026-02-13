import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const marketData = [
  { name: "Alligator", value: 29.7, change: "+6.01%" },
  { name: "CheckMark", value: 31.9, change: "+4.12%" },
  { name: "Stripes", value: 23, change: "-3.91%" },
  { name: "Head & Mood", value: 14.4, change: "+0.01%" },
];

const COLORS = ["#3B82F6", "#EF4444", "#94A3B8", "#10B981"];

const activities = [
  {
    title: "Sale on the summer collection has started",
    desc: "Monitor all your sales products for a better overview...",
    time: "2 hr ago",
  },
  {
    title: "A distributer sold an item",
    desc: "Keep track of redistributed products for revenue growth",
    time: "1 day ago",
  },
  {
    title: "A new Supplier Added",
    desc: "Keep track of all suppliers and communication",
    time: "1 day ago",
  },
  {
    title: "A new product was launched",
    desc: "Find all newly released products and services",
    time: "2 day ago",
  },
];

export default function MarketAndActivity() {
  return (
    <div className="flex gap-6 w-full">
      {/* LEFT — MARKET SHARE */}
      <div
        className="
        w-1/2 rounded-2xl p-6 transition
        bg-white border border-gray-200 text-gray-900
        dark:bg-[#0F111A] dark:border-white/10 dark:text-gray-100
      "
      >
        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Market Share</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Amount of revenue in one month
            </p>
          </div>

          <div className="text-gray-400 cursor-pointer">•••</div>
        </div>

        {/* DONUT CHART */}
        <div className="h-[260px] relative">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={marketData}
                dataKey="value"
                innerRadius={80}
                outerRadius={100}
                paddingAngle={3}
              >
                {marketData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold">$6,322.32</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total transactions
            </p>
          </div>
        </div>

        {/* DATA LIST */}
        <div className="mt-6 space-y-4">
          {marketData.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-t border-gray-200 dark:border-white/10 pt-4"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: COLORS[i] }}
                />
                <span>{item.name}</span>
              </div>

              <div className="flex items-center gap-6">
                <span className="font-semibold">{item.value}%</span>

                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    item.change.includes("-")
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — RECENT ACTIVITIES */}
      <div
        className="
        w-1/2 rounded-2xl p-6 transition
        bg-white border border-gray-200 text-gray-900
        dark:bg-[#0F111A] dark:border-white/10 dark:text-gray-100
      "
      >
        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Recent activities</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Details on shopping composition
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

        {/* TIMELINE */}
        <div className="space-y-6">
          {activities.map((item, i) => (
            <div key={i} className="flex gap-4">
              {/* DOT */}
              <div className="w-3 h-3 mt-2 rounded-full bg-emerald-500" />

              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold">{item.title}</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {item.time}
                  </span>
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
