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
    const short = `https://${domain}/${Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase()}`;
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
    <div className="relative space-y-6">
      <div className="pointer-events-none absolute -inset-4 rounded-[36px] bg-gradient-to-r from-indigo-500/15 via-sky-400/10 to-fuchsia-400/15 blur-2xl" />

      {/* Form Card */}
      <div
        className="relative rounded-[26px] border
        bg-white/85 dark:bg-slate-900/75
        border-gray-200/80 dark:border-white/10
        shadow-[0_18px_60px_-30px_rgba(2,6,23,0.7)]
        backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/5
        overflow-hidden transition-colors duration-150"
      >
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent dark:via-indigo-300/40" />

        <div className="px-6 pt-6 pb-4 border-b border-gray-100/80 dark:border-white/10">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600/90 dark:text-indigo-300/90">
            Link Builder
            <span className="h-1 w-1 rounded-full bg-indigo-500/70" />
            SaaS
          </div>
          <h2 className="mt-2 text-[26px] font-semibold tracking-tight text-gray-900 dark:text-white">
            Create your short link
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1.5 max-w-2xl leading-6">
            Paste a long URL, choose a branded domain, and get a clean, trackable
            short link instantly.
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* URL Input */}
          <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2">
              <Link2 size={15} className="text-gray-400 dark:text-gray-500" strokeWidth={2} />
            </div>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-very-long-url.com/goes/here"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm
                bg-white/80 dark:bg-slate-900/60
                border border-gray-200 dark:border-white/10
                text-gray-900 dark:text-gray-100
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500/25 focus:border-indigo-400 dark:focus:border-indigo-500
                transition-colors duration-150"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            {/* Domain Dropdown */}
            <div className="relative flex-1">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm
                  bg-white/80 dark:bg-slate-900/60
                  border border-gray-200 dark:border-white/10
                  text-gray-700 dark:text-gray-300
                  hover:border-gray-300 dark:hover:border-white/20
                  transition-colors duration-150 cursor-pointer select-none"
              >
                <span>{domain}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              {dropOpen && (
                <div
                  className="absolute top-full left-0 w-full mt-1.5 rounded-xl z-20 overflow-hidden
                  bg-white/95 dark:bg-slate-900
                  border border-gray-200 dark:border-white/10
                  shadow-[0_10px_30px_rgba(2,6,23,0.1)] dark:shadow-[0_12px_36px_rgba(2,6,23,0.6)]"
                >
                  {DOMAINS.map((d) => (
                    <div
                      key={d}
                      onClick={() => {
                        setDomain(d);
                        setDropOpen(false);
                      }}
                      className="px-4 py-2.5 text-sm cursor-pointer
                        text-gray-700 dark:text-gray-300
                        hover:bg-gray-50 dark:hover:bg-white/5
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
                <Tag size={13} className="text-gray-400 dark:text-gray-500" strokeWidth={2} />
              </div>
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Tag (optional)"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm
                  bg-white/80 dark:bg-slate-900/60
                  border border-gray-200 dark:border-white/10
                  text-gray-900 dark:text-gray-100
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
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
              bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500
              text-white
              shadow-[0_8px_24px_rgba(99,102,241,0.35)]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none
              active:scale-[0.99] transition-transform duration-150 select-none"
          >
            Create Short Link
          </button>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div
          className="rounded-[24px] overflow-hidden
          bg-white/85 dark:bg-slate-900/75
          border border-emerald-200/80 dark:border-emerald-500/20
          shadow-[0_14px_40px_-28px_rgba(16,185,129,0.4)]
          backdrop-blur transition-colors duration-150"
        >
          {/* Top bar */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-violet-500" />

          <div className="p-5 space-y-4">
            {/* Success badge + meta */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
              <div className="space-y-1">
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
                <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
                  Created - {result.createdAt}
                </p>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate max-w-xs">
                  Redirects to -{" "}
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
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
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <div
                className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
                bg-white/80 dark:bg-slate-900/60
                border border-gray-200 dark:border-white/10"
              >
                <Link2 size={13} className="text-indigo-500 shrink-0" strokeWidth={2} />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                  {result.shortUrl}
                </span>
                {copied && (
                  <Check size={13} className="text-emerald-500 shrink-0 ml-auto" strokeWidth={2.5} />
                )}
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium cursor-pointer
                  bg-gray-900 dark:bg-gray-100
                  text-white dark:text-gray-900
                  hover:bg-gray-700 dark:hover:bg-white
                  active:scale-[0.97] transition-transform duration-150 select-none shrink-0"
              >
                <Copy size={13} strokeWidth={2} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-medium cursor-pointer
                bg-indigo-50 dark:bg-indigo-500/10
                text-indigo-600 dark:text-indigo-400
                border border-indigo-100 dark:border-indigo-500/20
                hover:bg-indigo-100 dark:hover:bg-indigo-500/20
                active:scale-[0.97] transition-transform duration-150 select-none"
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
                active:scale-[0.97] transition-transform duration-150 select-none"
              >
                <BarChart2 size={13} strokeWidth={2} />
                View Stats
              </button>
              <button
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12.5px] font-medium cursor-pointer
                bg-gray-100 dark:bg-white/10
                text-gray-600 dark:text-gray-300
                border border-gray-200 dark:border-white/10
                hover:bg-gray-200 dark:hover:bg-white/20
                active:scale-[0.97] transition-transform duration-150 select-none"
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
                active:scale-[0.97] transition-transform duration-150 select-none md:ml-auto"
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
