import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";

const TABS = [
  { label: "Click Logs", route: "/Dashboard/reports/click-logs" },
  { label: "View Stats", route: "/Dashboard/reports/view-stats" },
];

export default function ReportPage() {
  return (
    <div className="min-h-screen bg-zinc-300 dark:bg-[#0a0c10] p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full
        bg-indigo-50 text-indigo-600 border border-indigo-100
        dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20"
            >
              <span className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse" />
              Live data
            </span>
          </div>
        </div>

        {/* Centered text */}
        <div className="flex-1 flex flex-col items-center text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Reports & Analytics
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md leading-relaxed mt-1">
            Track every click, monitor traffic sources, and measure campaign
            performance in real time.
          </p>
        </div>

        {/* Stats pills */}
        <div className="hidden sm:flex items-center gap-2">
          <div
            className="flex flex-col items-end px-4 py-2 rounded-xl
      bg-white dark:bg-zinc-800/60
      border border-zinc-200 dark:border-zinc-700/60"
          >
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
              Today's Clicks
            </span>
            <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              —
            </span>
          </div>
          <div
            className="flex flex-col items-end px-4 py-2 rounded-xl
      bg-white dark:bg-zinc-800/60
      border border-zinc-200 dark:border-zinc-700/60"
          >
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
              Active Campaigns
            </span>
            <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
              —
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

      {/* Tabs */}
      <div
        className="flex items-center gap-1 p-1 rounded-2xl w-fit
  bg-zinc-100/80 dark:bg-zinc-900
  border border-zinc-200 dark:border-zinc-800
  shadow-inner shadow-zinc-200/60 dark:shadow-zinc-950/40"
      >
        {TABS.map((tab) => (
          <NavLink
            key={tab.route}
            to={tab.route}
            className={({ isActive }) =>
              `relative px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer select-none
        ${
          isActive
            ? "bg-gradient-to-b from-white to-zinc-50 dark:from-indigo-500/20 dark:to-indigo-600/10 text-indigo-600 dark:text-indigo-300 shadow-[0_1px_6px_rgba(0,0,0,0.1),0_0_0_1px_rgba(99,102,241,0.15)] dark:shadow-[0_1px_8px_rgba(99,102,241,0.15),0_0_0_1px_rgba(99,102,241,0.2]]"
            : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 hover:bg-white/70 dark:hover:bg-zinc-800/60"
        }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      {/* Tab content */}
      <div
        className="rounded-2xl border border-zinc-200 dark:border-zinc-800
        bg-white dark:bg-zinc-900/60 overflow-hidden"
      >
        <Outlet />
      </div>
    </div>
  );
}
