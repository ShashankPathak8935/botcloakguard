import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Link2,
  BarChart3,
  Layers,
  QrCode,
  Shield,
  ExternalLink,
} from "lucide-react";

const TABS = [
  { label: "Create Link", route: "create" },
  { label: "My Links", route: "manage" },
];

const FEATURE_CARDS = [
  {
    icon: Link2,
    title: "URL Shortener",
    desc: "A powerful Link Management Platform with features that help you handle all your links intuitively and reveal the true potential of every click.",
    color: "indigo",
  },
  {
    icon: BarChart3,
    title: "Link Analytics",
    desc: "Advanced analytics that track clicks on short links and measure effectiveness with extensive statistics, geo data, and device breakdowns.",
    color: "violet",
  },
  {
    icon: Layers,
    title: "Link in Bio",
    desc: "Create stunning link-in-bio microsites to reach your audience, measure click rates, and expand reach with dedicated QR codes.",
    color: "sky",
  },
  {
    icon: QrCode,
    title: "QR Codes",
    desc: "Generate and customize QR codes to match your brand style, manage their redirection, and grow your business with trackable scans.",
    color: "emerald",
  },
];

const colorMap = {
  indigo: {
    icon: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20 text-indigo-500 dark:text-indigo-400",
    title: "text-indigo-600 dark:text-indigo-400",
  },
  violet: {
    icon: "bg-violet-50 dark:bg-violet-500/10 border-violet-100 dark:border-violet-500/20 text-violet-500 dark:text-violet-400",
    title: "text-violet-600 dark:text-violet-400",
  },
  sky: {
    icon: "bg-sky-50 dark:bg-sky-500/10 border-sky-100 dark:border-sky-500/20 text-sky-500 dark:text-sky-400",
    title: "text-sky-600 dark:text-sky-400",
  },
  emerald: {
    icon: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20 text-emerald-500 dark:text-emerald-400",
    title: "text-emerald-600 dark:text-emerald-400",
  },
};

export default function UrlShortener() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0c10]">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full
              bg-indigo-50 text-indigo-600 border border-indigo-100
              dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20 uppercase tracking-wider"
            >
              <Link2 size={10} strokeWidth={2.5} />
              URL Shortener
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Shorten, track & manage
            <span className="text-indigo-500 dark:text-indigo-400">
              {" "}
              your links
            </span>
          </h1>
          <p
            className="
              text-base
              text-zinc-500 dark:text-zinc-400
              max-w-lg
              leading-relaxed
              text-center
              mx-auto
            "
          >
            Create powerful short links with analytics, custom domains, and QR
            codes - all in one place.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex items-center gap-1 p-1 rounded-2xl w-fit
          bg-zinc-100 dark:bg-zinc-900
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
                    ? "bg-gradient-to-b from-white to-zinc-50 dark:from-indigo-500/20 dark:to-indigo-600/10 text-indigo-600 dark:text-indigo-300 shadow-[0_1px_6px_rgba(0,0,0,0.1),0_0_0_1px_rgba(99,102,241,0.15)] dark:shadow-[0_1px_8px_rgba(99,102,241,0.15),0_0_0_1px_rgba(99,102,241,0.2)]"
                    : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </div>

        {/* Tab content */}
        <Outlet />

        {/* Divider */}
        <div className="flex items-center gap-4 pt-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.25em]
            text-zinc-400 dark:text-zinc-500
            px-3 py-1 rounded-full
            border border-zinc-200/80 dark:border-white/10
            bg-white/80 dark:bg-zinc-900/70
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.6)]"
          >
            What we provide
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />
        </div>

        {/* Feature Cards */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 pb-10">
          <div className="pointer-events-none absolute -inset-4 rounded-[32px] bg-gradient-to-r from-indigo-500/10 via-sky-400/10 to-violet-400/10 blur-2xl" />
          {FEATURE_CARDS.map((card) => {
            const Icon = card.icon;
            const c = colorMap[card.color];
            return (
              <div
                key={card.title}
                className="group relative p-5 rounded-[22px] cursor-pointer
                  bg-white/90 dark:bg-zinc-900/70
                  border border-zinc-200/80 dark:border-white/10
                  ring-1 ring-black/5 dark:ring-white/5
                  shadow-[0_12px_40px_-28px_rgba(2,6,23,0.45)]
                  hover:shadow-[0_18px_50px_-28px_rgba(2,6,23,0.6)]
                  hover:-translate-y-0.5
                  transition-[transform,box-shadow,border-color,background-color] duration-200"
              >
                <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10" />
                <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div
                  className={`relative h-10 w-10 rounded-xl flex items-center justify-center mb-4
                  border ${c.icon}`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </div>
                <h3 className={`text-[15px] font-semibold mb-1.5 ${c.title}`}>
                  {card.title}
                </h3>
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                  Learn more
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                  See details
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
