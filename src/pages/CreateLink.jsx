// ── CreateLink.jsx ────────────────────────────────────────────
import { useState } from "react";
import {
  Link2,
  ChevronDown,
  Tag,
  Check,
  Copy,
  ExternalLink,
  Trash2,
  BarChart2,
  Settings,
} from "lucide-react";

const DOMAINS = ["tsshrt.click", "trfshld.io", "lnk.run"];

export default function CreateLink() {
  const [url, setUrl] = useState("");
  const [domain, setDomain] = useState(DOMAINS[0]);
  const [tag, setTag] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCreate = () => {
    if (!url) return;
    const short = `https://${domain}/${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    setResult({
      shortUrl: short,
      originalUrl: url,
      createdAt: new Date().toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      tag,
    });
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <div
        className="rounded-2xl bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]
        overflow-hidden"
      >
        <div className="px-6 pt-5 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Create your short link
          </h2>
          <p className="text-[12.5px] text-zinc-400 dark:text-zinc-500 mt-0.5">
            Paste a long URL and get a clean, trackable short link instantly.
          </p>
        </div>

        <div className="p-6 space-y-3">
          {/* URL Input */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Link2
                size={15}
                className="text-zinc-400 dark:text-zinc-500"
                strokeWidth={2}
              />
            </div>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-very-long-url.com/goes/here"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm
                bg-zinc-50 dark:bg-zinc-800/60
                border border-zinc-200 dark:border-zinc-700
                text-zinc-900 dark:text-zinc-100
                placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 dark:focus:border-indigo-500
                transition-colors duration-150"
            />
          </div>

          <div className="flex gap-3">
            {/* Domain Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm
                  bg-zinc-50 dark:bg-zinc-800/60
                  border border-zinc-200 dark:border-zinc-700
                  text-zinc-700 dark:text-zinc-300
                  hover:border-zinc-300 dark:hover:border-zinc-600
                  transition-colors duration-150 cursor-pointer select-none"
              >
                <span>{domain}</span>
                <ChevronDown size={14} className="text-zinc-400" />
              </button>
              {dropOpen && (
                <div
                  className="absolute top-full left-0 w-full mt-1.5 rounded-xl z-20 overflow-hidden
                  bg-white dark:bg-zinc-900
                  border border-zinc-200 dark:border-zinc-800
                  shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
                >
                  {DOMAINS.map((d) => (
                    <div
                      key={d}
                      onClick={() => {
                        setDomain(d);
                        setDropOpen(false);
                      }}
                      className="px-4 py-2.5 text-sm cursor-pointer
                        text-zinc-700 dark:text-zinc-300
                        hover:bg-zinc-50 dark:hover:bg-zinc-800
                        transition-colors duration-100"
                    >
                      {d}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tag Input */}
            <div className="relative flex-1">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
                <Tag
                  size={13}
                  className="text-zinc-400 dark:text-zinc-500"
                  strokeWidth={2}
                />
              </div>
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Tag (optional)"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm
                  bg-zinc-50 dark:bg-zinc-800/60
                  border border-zinc-200 dark:border-zinc-700
                  text-zinc-900 dark:text-zinc-100
                  placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 dark:focus:border-indigo-500
                  transition-colors duration-150"
              />
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            disabled={!url}
            className="w-full py-2.5 rounded-xl text-sm font-semibold cursor-pointer
              bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
              text-white
              shadow-[0_2px_10px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_18px_rgba(99,102,241,0.45)]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-indigo-600
              active:scale-[0.99] transition-all duration-150 select-none"
          >
            Create Short Link
          </button>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div
          className="rounded-2xl overflow-hidden
          bg-white dark:bg-zinc-900
          border border-emerald-200 dark:border-emerald-500/20
          shadow-[0_4px_20px_rgba(16,185,129,0.08)] dark:shadow-[0_4px_20px_rgba(16,185,129,0.06)]"
        >
          {/* Top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-violet-500" />

          <div className="p-5 space-y-4">
            {/* Success badge + meta */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full
                    bg-emerald-50 text-emerald-600 border border-emerald-100
                    dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                  >
                    <Check size={9} strokeWidth={3} />
                    Short link created
                  </span>
                </div>
                <p className="text-[12px] text-zinc-400 dark:text-zinc-500 mt-1.5">
                  Created · {result.createdAt}
                </p>
                <p className="text-[12px] text-zinc-400 dark:text-zinc-500 truncate max-w-xs">
                  Redirects to ·{" "}
                  <span className="text-zinc-600 dark:text-zinc-300 font-medium">
                    {result.originalUrl}
                  </span>
                </p>
              </div>
              {result.tag && (
                <span
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full shrink-0
                  bg-indigo-50 text-indigo-600 border border-indigo-100
                  dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20"
                >
                  #{result.tag}
                </span>
              )}
            </div>

            {/* Short URL row */}
            <div className="flex items-center gap-2">
              <div
                className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
                bg-zinc-50 dark:bg-zinc-800
                border border-zinc-200 dark:border-zinc-700"
              >
                <Link2
                  size={13}
                  className="text-indigo-500 shrink-0"
                  strokeWidth={2}
                />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                  {result.shortUrl}
                </span>
                {copied && (
                  <Check
                    size={13}
                    className="text-emerald-500 shrink-0 ml-auto"
                    strokeWidth={2.5}
                  />
                )}
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer
                  bg-zinc-900 dark:bg-zinc-100
                  text-white dark:text-zinc-900
                  hover:bg-zinc-700 dark:hover:bg-white
                  active:scale-[0.97] transition-all duration-150 select-none shrink-0"
              >
                <Copy size={13} strokeWidth={2} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-medium cursor-pointer
                bg-indigo-50 dark:bg-indigo-500/10
                text-indigo-600 dark:text-indigo-400
                border border-indigo-100 dark:border-indigo-500/20
                hover:bg-indigo-100 dark:hover:bg-indigo-500/20
                active:scale-[0.97] transition-all duration-150 select-none"
              >
                <ExternalLink size={13} strokeWidth={2} />
                Test URL
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-medium cursor-pointer
                bg-violet-50 dark:bg-violet-500/10
                text-violet-600 dark:text-violet-400
                border border-violet-100 dark:border-violet-500/20
                hover:bg-violet-100 dark:hover:bg-violet-500/20
                active:scale-[0.97] transition-all duration-150 select-none"
              >
                <BarChart2 size={13} strokeWidth={2} />
                View Stats
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-medium cursor-pointer
                bg-zinc-100 dark:bg-zinc-800
                text-zinc-600 dark:text-zinc-400
                border border-zinc-200 dark:border-zinc-700
                hover:bg-zinc-200 dark:hover:bg-zinc-700
                active:scale-[0.97] transition-all duration-150 select-none"
              >
                <Settings size={13} strokeWidth={2} />
                Manage
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-medium cursor-pointer
                bg-red-50 dark:bg-red-500/10
                text-red-500 dark:text-red-400
                border border-red-100 dark:border-red-500/20
                hover:bg-red-100 dark:hover:bg-red-500/20
                active:scale-[0.97] transition-all duration-150 select-none ml-auto"
              >
                <Trash2 size={13} strokeWidth={2} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
