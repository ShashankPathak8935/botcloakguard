import React from "react";
import {
  Globe,
  AlertTriangle,
  Copy,
  Wifi,
  Monitor,
  Smartphone,
} from "lucide-react";

const ViewStatsChart3rd = ({ clickDetailsData }) => {
  /* ---------------- STATIC DATA ---------------- */

  const topReferrers = [
    { site: "google.com", clicks: 120 },
    { site: "facebook.com", clicks: 85 },
    { site: "twitter.com", clicks: 62 },
    { site: "reddit.com", clicks: 41 },
    { site: "linkedin.com", clicks: 25 },
  ];

  const highRiskClicks = [
    {
      ip: "45.12.22.1",
      country: "🇺🇸",
      device: "desktop",
      browser: "Chrome",
      os: "Windows",
      clicks: 18,
    },
    {
      ip: "91.201.33.8",
      country: "🇩🇪",
      device: "phone",
      browser: "Safari",
      os: "iOS",
      clicks: 11,
    },
    {
      ip: "103.44.12.9",
      country: "🇮🇳",
      device: "robot",
      browser: "Bot",
      os: "Linux",
      clicks: 27,
    },
  ];

  const ispClicks = [
    { name: "Jio Fiber", value: 142 },
    { name: "Airtel", value: 97 },
    { name: "Vodafone", value: 56 },
    { name: "BSNL", value: 31 },
  ];

  /* ---------------- HELPERS ---------------- */

  const deviceIcon = (device) => {
    if (device === "desktop") return <Monitor size={16} />;
    if (device === "phone") return <Smartphone size={16} />;
    return <Wifi size={16} />;
  };

  /* ---------------- UI ---------------- */

  return (
    <div
      className="
        min-h-screen
        bg-[#F1F3F4] text-gray-900
        dark:bg-[#0F111A] dark:text-gray-100
      "
    >
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ---------- CARD 1 : TOP REFERRERS ---------- */}
        <div
          className="rounded-2xl shadow-md dark:shadow-black/30 p-5 h-[260px] flex flex-col
                        bg-white dark:bg-gray-900
                        border border-gray-200 dark:border-white/10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-blue-600" />
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Top Referrers
            </h2>
          </div>
          {clickDetailsData?.data?.topReferrers.length > 0 ? (
            <div className="overflow-y-auto pr-2 space-y-3">
              {clickDetailsData?.data?.topReferrers?.map((item, i) => (
                <div
                  key={i}
                  className="
                  flex justify-between items-center
                  rounded-xl px-3 py-2 transition
                  bg-gray-50 dark:bg-gray-800
                  hover:bg-blue-50 dark:hover:bg-gray-700
                "
                >
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {item?.url}
                  </span>

                  <span className="text-sm font-semibold text-blue-600">
                    {item?.url_clicks}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              No data found
            </div>
          )}
        </div>

        {/* ---------- CARD 2 : HIGH RISK ---------- */}
        <div
          className="rounded-2xl shadow-md dark:shadow-black/30 p-5 h-[260px] flex flex-col
                        bg-white dark:bg-gray-900
                        border border-gray-200 dark:border-white/10"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-500" />
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              High Risk Clicks
            </h2>
          </div>

          {clickDetailsData?.data?.highRiskClicks.length > 0 ? (
            <div className="overflow-y-auto pr-2 space-y-3">
              {clickDetailsData?.data?.highRiskClicks.map((item, i) => (
                <div
                  key={i}
                  className="
                  rounded-xl p-3
                 
                  border border-red-100 dark:border-red-800
                "
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
                      {item.ip}
                    </span>

                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      HIGH RISK
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-3 text-xs mt-2
                                text-gray-600 dark:text-gray-300"
                  >
                    <span>{item.country}</span>
                    {deviceIcon(item.device)}
                    <span>{item.browser}</span>
                    <span>{item.os}</span>

                    <span className="ml-auto font-semibold text-red-600">
                      {item.click_count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              No data found
            </div>
          )}
        </div>

        {/* ---------- CARD 3 : DUPLICATES ---------- */}
        <div
          className="rounded-2xl shadow-md dark:shadow-black/30 p-5 h-[260px]
                        flex flex-col justify-center items-center text-center
                        bg-white dark:bg-gray-900
                        border border-gray-200 dark:border-white/10"
        >
          <Copy className="text-green-500 mb-3" size={32} />

          <h3 className="font-semibold text-gray-800 dark:text-gray-100">
            Recent Duplicates
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            No duplicates found 🎉
          </p>
        </div>

        {/* ---------- CARD 4 : ISP CLICKS ---------- */}
        <div
          className="rounded-2xl shadow-md dark:shadow-black/30 p-5 h-[260px] flex flex-col
                        bg-white dark:bg-gray-900
                        border border-gray-200 dark:border-white/10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Wifi className="text-purple-600" />
            <h2 className="font-semibold text-gray-800 dark:text-gray-100">
              Clicks by ISP
            </h2>
          </div>

          <div className="overflow-y-auto space-y-4">
            {clickDetailsData?.data?.topIsp.map((isp, i) => (
              <div key={i}>
                <div
                  className="flex justify-between text-sm mb-1
                                text-gray-700 dark:text-gray-200"
                >
                  <span>{isp.isp}</span>
                  <span className="font-semibold">{isp.isp_click_count}</span>
                </div>

                {/* progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${isp.value / 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStatsChart3rd;
