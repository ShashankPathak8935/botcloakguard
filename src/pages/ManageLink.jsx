// ── ManageLinks.jsx ───────────────────────────────────────────
import { useState } from "react";
import {
  Plus,
  RefreshCw,
  Search,
  MoreHorizontal,
  BarChart2,
  QrCode,
  Copy,
  Pencil,
  Trash2,
  Calendar,
} from "lucide-react";

export default function ManageLinks() {
  const [openMenuId, setOpenMenuId] = useState(null);

  const rows = [
    {
      id: 1,
      shortUrl: "bcg.ly/alpha",
      redirectTo: "https://example.com/landing",
      clicks: 128,
      tag: "campaign",
      createdDate: "2026-03-01",
      createdTime: "10:12 AM",
    },
    {
      id: 2,
      shortUrl: "bcg.ly/beta",
      redirectTo: "https://example.com/pricing",
      clicks: 56,
      tag: "pricing",
      createdDate: "2026-03-05",
      createdTime: "04:45 PM",
    },
    {
      id: 3,
      shortUrl: "bcg.ly/gamma",
      redirectTo: "https://example.com/blog/post-1",
      clicks: 302,
      tag: "blog",
      createdDate: "2026-03-12",
      createdTime: "09:05 AM",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button 
        // onClick={}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
          <Plus size={16} />
          Create New Link
        </button>
        <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800">
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <input
            className="h-10 w-64 rounded-xl border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
            placeholder="Search..."
          />
        </div>
        <div className="relative">
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <input
            type="date"
            className="h-10 w-44 rounded-xl border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-800 outline-none appearance-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500"
          />
        </div>
        <div className="relative">
          <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
          <input
            type="date"
            className="h-10 w-44 rounded-xl border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-800 outline-none appearance-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-500"
          />
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white">
          <Search size={16} />
          Search
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-zinc-50 text-left text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            <tr>
              <th className="px-4 py-3 font-medium">SN No</th>
              <th className="px-4 py-3 font-medium">Short URL</th>
              <th className="px-4 py-3 font-medium">Redirect To</th>
              <th className="px-4 py-3 font-medium">Clicks</th>
              <th className="px-4 py-3 font-medium">Tag</th>
              <th className="px-4 py-3 font-medium">Created Date</th>
              <th className="px-4 py-3 font-medium">Creation Time</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {rows.map((row, index) => (
              <tr key={row.id} className="text-zinc-800 dark:text-zinc-100">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{row.shortUrl}</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">{row.redirectTo}</td>
                <td className="px-4 py-3">{row.clicks}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                    {row.tag}
                  </span>
                </td>
                <td className="px-4 py-3">{row.createdDate}</td>
                <td className="px-4 py-3">{row.createdTime}</td>
                <td className="px-4 py-3">
                  <button
                    className="inline-flex cursor-pointer h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
                    aria-label="Open actions"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openMenuId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl dark:bg-zinc-900 dark:shadow-black/50">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Actions</h3>
              <button
                className="text-sm cursor-pointer text-zinc-500 dark:text-zinc-400"
                onClick={() => setOpenMenuId(null)}
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button className="inline-flex items-center cursor-pointer gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
                <BarChart2 size={16} />
                View Stats
              </button>
              <button className="inline-flex items-center cursor-pointer gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
                <QrCode size={16} />
                View QR Code
              </button>
              <button className="inline-flex items-center cursor-pointer gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
                <Copy size={16} />
                Copy
              </button>
              <button className="inline-flex items-center cursor-pointer gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800">
                <Pencil size={16} />
                Edit
              </button>
              <button className="inline-flex items-center cursor-pointer gap-2 rounded-xl border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/50">
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
