import { useMemo, useState } from "react";
import {
  Link2,
  MousePointerClick,
  Calendar,
  Clock,
  Globe,
  Shield,
} from "lucide-react";

const TABLE_ROWS = Array.from({ length: 42 }).map((_, i) => ({
  id: i + 1,
  browser: ["Chrome", "Safari", "Edge", "Firefox"][i % 4],
  ip: `192.168.1.${(i % 40) + 10}`,
  device: ["Desktop", "Mobile", "Tablet"][i % 3],
  os: ["Windows", "macOS", "Android", "iOS"][i % 4],
  country: ["India", "USA", "UK", "UAE"][i % 4],
  state: ["Delhi", "California", "London", "Dubai"][i % 4],
  city: ["New Delhi", "San Jose", "London", "Dubai"][i % 4],
  zipcode: ["110001", "95112", "EC1A", "00000"][i % 4],
  asn: `AS${(i % 900) + 100}`,
  isp: ["Jio", "Airtel", "Comcast", "Vodafone"][i % 4],
  proxy: i % 5 === 0 ? "Yes" : "No",
  type: ["Organic", "Paid", "Direct"][i % 3],
  timeZone: ["IST", "PST", "GMT", "GST"][i % 4],
  referrer: ["google.com", "twitter.com", "direct", "linkedin.com"][i % 4],
  us: i % 2 === 0 ? "Yes" : "No",
  date: `2026-03-${String((i % 28) + 1).padStart(2, "0")}`,
  time: `${String((i % 12) + 1).padStart(2, "0")}:${String(
    (i * 7) % 60
  ).padStart(2, "0")} ${i % 2 === 0 ? "AM" : "PM"}`,
}));

export default function LinkStats() {
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(TABLE_ROWS.length / pageSize);

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return TABLE_ROWS.slice(start, start + pageSize);
  }, [page]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0c10]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600/90 dark:text-indigo-300/90">
              Link Stats
              <span className="h-1 w-1 rounded-full bg-indigo-500/70" />
              Analytics
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              Link stats
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-900/70 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300">
              <Link2 size={14} className="text-indigo-500" />
              https://tsshrt.click/AB12C
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200/80 dark:border-emerald-500/20 bg-emerald-50/80 dark:bg-emerald-500/10 px-4 py-2 text-sm text-emerald-700 dark:text-emerald-300">
              <MousePointerClick size={14} />
              12,493 clicks
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="rounded-[22px] border border-zinc-200/80 dark:border-white/10 bg-white/85 dark:bg-zinc-900/70 ring-1 ring-black/5 dark:ring-white/5 shadow-[0_12px_40px_-28px_rgba(2,6,23,0.45)] backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              <Globe size={14} />
              Statics for URL
            </div>
            <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="inline-flex items-center gap-2">
                <Calendar size={14} className="text-indigo-500" />
                Created: 2026-03-29
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={14} className="text-indigo-500" />
                11:42 AM
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-[22px] border border-zinc-200/80 dark:border-white/10 bg-white/85 dark:bg-zinc-900/70 ring-1 ring-black/5 dark:ring-white/5 shadow-[0_12px_40px_-28px_rgba(2,6,23,0.45)] backdrop-blur-xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100/80 dark:border-white/10">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              URL Event Logs
            </div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              <Shield size={12} />
              Protected
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12.5px]">
              <thead className="bg-zinc-50/90 dark:bg-zinc-950/70">
                <tr className="text-zinc-500 dark:text-zinc-400">
                  <th className="px-4 py-3">Sr No</th>
                  <th className="px-4 py-3">Browser</th>
                  <th className="px-4 py-3">IP</th>
                  <th className="px-4 py-3">Device</th>
                  <th className="px-4 py-3">OS</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Zipcode</th>
                  <th className="px-4 py-3">ASN</th>
                  <th className="px-4 py-3">ISP</th>
                  <th className="px-4 py-3">Proxy</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Time zone</th>
                  <th className="px-4 py-3">Referrer</th>
                  <th className="px-4 py-3">US</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-zinc-100/80 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50/70 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-zinc-900 dark:text-zinc-100">
                      {row.id}
                    </td>
                    <td className="px-4 py-3">{row.browser}</td>
                    <td className="px-4 py-3 font-mono">{row.ip}</td>
                    <td className="px-4 py-3">{row.device}</td>
                    <td className="px-4 py-3">{row.os}</td>
                    <td className="px-4 py-3">{row.country}</td>
                    <td className="px-4 py-3">{row.state}</td>
                    <td className="px-4 py-3">{row.city}</td>
                    <td className="px-4 py-3">{row.zipcode}</td>
                    <td className="px-4 py-3">{row.asn}</td>
                    <td className="px-4 py-3">{row.isp}</td>
                    <td className="px-4 py-3">{row.proxy}</td>
                    <td className="px-4 py-3">{row.type}</td>
                    <td className="px-4 py-3">{row.timeZone}</td>
                    <td className="px-4 py-3">{row.referrer}</td>
                    <td className="px-4 py-3">{row.us}</td>
                    <td className="px-4 py-3">{row.date}</td>
                    <td className="px-4 py-3">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-100/80 dark:border-white/10">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Page {page} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-300 disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-zinc-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/70 text-zinc-600 dark:text-zinc-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
