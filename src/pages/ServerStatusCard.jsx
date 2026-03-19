import {
  Server,
  ShieldCheck,
  Activity,
  Cloud,
  BrainCircuit,
  Database,
  PlugZap,
  CheckCircle2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

/* ================= CARD COMPONENT ================= */


const StatusCard = ({ title, status, subtitle, uptime, icon: Icon }) => {
  /* ================= REALTIME DATA ================= */

  const [chartData, setChartData] = useState([
    { value: 70 },
    { value: 75 },
    { value: 72 },
    { value: 78 },
    { value: 80 },
    { value: 82 },
  ]);

  // simulate realtime updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prev) => {
        const newValue = Math.floor(70 + Math.random() * 30);

        const updated = [...prev.slice(1), { value: newValue }];
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        relative rounded-2xl p-5
        border border-gray-200 dark:border-white/10
        bg-gradient-to-b from-white to-gray-50
        dark:from-[#111827] dark:to-[#0B0D14]
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        group
      "
    >
      {/* ================= TOP ================= */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div
            className="
               rounded-xl
              bg-gray-100 dark:bg-white/5
              text-gray-700 dark:text-gray-300
              group-hover:scale-110 transition
            "
          >
            <Icon size={22} />
          </div>

          <div>
            <p className="text-sm text-gray-800 dark:text-gray-100">{title}</p>

            <p className="text-xs text-gray-500 dark:text-gray-100 mt-1">
              {subtitle}
            </p>
          </div>
        </div>

        {/* LIVE INDICATOR */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>

          <span className="text-xs text-gray-800 dark:text-gray-100">Live</span>
        </div>
      </div>

      {/* ================= STATUS ================= */}
      <div className="mt-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {status}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          System operating normally
        </p>
      </div>

      {/* ================= MINI REALTIME CHART ================= */}
      <div className="mt-2 h-[70px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              fillOpacity={0.15}
              fill="#10B981"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ================= UPTIME ================= */}
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-gray-400">
          Uptime
        </span>

        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
          {uptime}
        </span>
      </div>

      {/* ================= HEALTH BAR ================= */}
      <div className="mt-2 h-[6px] rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <div className="h-full w-full bg-emerald-500 rounded-full" />
      </div>

      {/* ================= FOOTER ================= */}
      <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-white/10 pt-4">
        <span>Latency: 21ms</span>
        <span>Errors: 0%</span>
        <span>Region: Global</span>
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

export default function ServerStatusCard() {
  const statusData = [
    {
      title: "Server Status",
      status: "Excellent",
      subtitle: "Today",
      uptime: "100% Uptime",
      icon: Server,
    },
    {
      title: "API Health",
      status: "Stable",
      subtitle: "Today",
      uptime: "99.98% Uptime",
      icon: Activity,
    },
    {
      title: "Security Status",
      status: "Protected",
      subtitle: "Today",
      uptime: "100% Secure",
      icon: ShieldCheck,
    },
    {
      title: "Cloud Network",
      status: "Operational",
      subtitle: "Today",
      uptime: "100% Online",
      icon: Cloud,
    },
    {
      title: "AI Model",
      status: "Optimal",
      subtitle: "Today",
      uptime: "99.23% Availability",
      icon: BrainCircuit, // AI related icon
    },
    {
      title: "Database Status",
      status: "Healthy",
      subtitle: "Today",
      uptime: "100% Uptime",
      icon: Database, // database icon
    },
    {
      title: "3rd Party API",
      status: "Operational",
      subtitle: "Today",
      uptime: "100% Response Rate",
      icon: PlugZap, // integrations/API icon
    },
  ];

  return (
    <div
      className="
    grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
    gap-6 p-4
    bg-gray-300 dark:bg-[#0f172a]
    transition-colors duration-300
  "
    >
      {statusData.map((item, index) => (
        <StatusCard key={index} {...item} />
      ))}
    </div>
  );
}
