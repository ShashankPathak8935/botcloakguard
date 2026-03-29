import React from "react";

const utmData = [
  {
    name: "Campaign ID",
    param: "utm_id",
    required: "No",
    example: "abc.123",
    desc: "Used to identify which ads campaign this referral references."
  },
  {
    name: "Campaign Source",
    param: "utm_source",
    required: "Yes",
    example: "google",
    desc: "Identify a search engine, newsletter name, or other source."
  },
  {
    name: "Campaign Medium",
    param: "utm_medium",
    required: "Yes",
    example: "cpc",
    desc: "Identify a marketing medium such as email or cost-per-click."
  },
  {
    name: "Campaign Name",
    param: "utm_campaign",
    required: "No",
    example: "spring_sale",
    desc: "Identify a specific promotion or strategic campaign."
  },
  {
    name: "Campaign Term",
    param: "utm_term",
    required: "No",
    example: "running+shoes",
    desc: "Used for paid search keywords."
  },
  {
    name: "Campaign Content",
    param: "utm_content",
    required: "No",
    example: "logolink",
    desc: "Used for A/B testing and differentiating links pointing to the same URL."
  }
];

export default function UtmInfo() {
  return (
    <div className="relative w-full mt-8">
      <div className="pointer-events-none absolute -inset-3 rounded-[32px] bg-gradient-to-r from-indigo-500/20 via-sky-400/10 to-fuchsia-400/20 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.12),transparent_60%)]" />

      {/* Card */}
      <div
        className="
          relative
          rounded-[26px] border
          bg-white/85 dark:bg-slate-900/75
          border-gray-200/80 dark:border-white/10
          shadow-[0_20px_60px_-30px_rgba(2,6,23,0.7)]
          backdrop-blur-xl
          ring-1 ring-black/5 dark:ring-white/5
          p-6 md:p-8
        "
      >
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent dark:via-indigo-300/40" />

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600/90 dark:text-indigo-300/90">
            UTM Parameters
            <span className="h-1 w-1 rounded-full bg-indigo-500/70" />
            Quick Reference
          </div>
          <h2 className="text-[26px] font-semibold tracking-tight text-gray-900 dark:text-white">
            More Information & Examples
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl leading-6">
            The following table explains each campaign parameter and how it is used
            for tracking marketing campaigns.
          </p>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-slate-950/40">
          <table className="w-full border-collapse text-left">
            {/* Header */}
            <thead className="sticky top-0">
              <tr
                className="
                  bg-gray-50/90 dark:bg-slate-950/70
                  text-left
                "
              >
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  Parameter
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  Required
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  Example
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                  Description
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {utmData.map((item, index) => (
                <tr
                  key={index}
                  className="
                    border-t border-gray-100/90 dark:border-white/10
                    odd:bg-gray-50/70 dark:odd:bg-white/5
                    hover:bg-gray-100/80 dark:hover:bg-white/10
                  "
                >
                  {/* Parameter */}
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </p>
                    <span className="mt-1 inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-50/90 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-300">
                      {item.param}
                    </span>
                  </td>

                  {/* Required */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${
                        item.required === "Yes"
                          ? "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                          : "bg-gray-200/80 text-gray-700 dark:bg-white/10 dark:text-gray-300"
                      }`}
                    >
                      {item.required}
                    </span>
                  </td>

                  {/* Example */}
                  <td className="px-4 py-4 font-mono text-sky-700 dark:text-sky-300 text-sm">
                    {item.example}
                  </td>

                  {/* Description */}
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
