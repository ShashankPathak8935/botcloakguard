import React from "react";
import { useNavigate } from "react-router-dom";
import { SquarePen } from "lucide-react";
import TrafficSource from "./TrafficSource";
import {
  CheckCircle2,
  XCircle,
  Trash2,
  Copy,
  PlayCircle,
  Rocket,
  ShieldX,
} from "lucide-react";

export default function CampaignTable({ campaigns, setCampaigns }) {
  const navigate = useNavigate();
  console.log("campaign data", campaigns);

  return (
    <div
      className="
      rounded-2xl p-6 transition
      bg-white border border-gray-200 text-gray-900
      dark:bg-[#0F111A] dark:border-white/10 dark:text-gray-100
    "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">All Campaign Info</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Detailed information about the campaigns, including clicks, IPs, and
            more.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="
              text-sm px-4 py-2 rounded-lg border transition
              bg-gray-100 border-gray-300 text-gray-900
              dark:bg-[#1A1D29] dark:border-white/10 dark:text-gray-200
              focus:outline-none focus:ring-1 focus:ring-emerald-500
            "
          />
          <div className="text-gray-500 dark:text-gray-400 text-xl cursor-pointer">
            •••
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="
        overflow-hidden rounded-xl border transition
        border-gray-200
        dark:border-white/10
      "
      >
        <table className="w-full text-sm">
          <thead
            className="
            bg-gray-100 text-gray-600
            dark:bg-[#131620] dark:text-gray-400
          "
          >
            <tr className="text-left">
              <th className="p-4 font-medium">Edit</th>
              <th className="p-4 font-medium">SN</th>
              <th className="p-4 font-medium">Campaign Name</th>
              <th className="p-4 font-medium">Source</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Integration</th>
              <th className="p-4">Clicks</th>
              <th className="p-4">Safe</th>
              <th className="p-4">Money</th>
              <th className="p-4">Created at</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((item, index) => (
              <tr
                key={item.id}
                className="
                border-t transition
                border-gray-200 hover:bg-gray-50
                dark:border-white/10 dark:hover:bg-[#161A24]
              "
              >
                <td className="p-4">
                  <div className="relative group inline-block">
                    <button
                      onClick={() => navigate(`/edit/${row.id}`)}
                      className="text-blue-500 hover:text-blue-400 cursor-pointer"
                    >
                      <SquarePen size={18} />
                    </button>

                    {/* Tooltip */}
                    <div
                      className="
    absolute left-full top-1/2 -translate-y-1/2 ml-2
    hidden group-hover:block whitespace-nowrap
    bg-gray-800 text-white text-xs px-3 py-1 rounded shadow-lg z-50
  "
                    >
                      Edit your campaign
                    </div>
                  </div>
                </td>

                <td className="p-1 font-medium">{index + 1}</td>
                <td className="p-1 font-medium">
                  {item.campaign_info?.campaignName}
                </td>
                <td className="p-1 text-gray-700 dark:text-gray-300">
                  <TrafficSource source={item.campaign_info?.trafficSource} />
                </td>
                <td className="px-3 py-3 flex items-center gap-3">
                  {/* Active */}
                  <button
                    disabled={item.statusLoading}
                    onClick={() => handleStatusChange(item.uid, "Active")}
                    className={`
      ${item.statusLoading ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
      ${
        item.status === "Active"
          ? "text-green-500"
          : "text-gray-400 hover:text-green-500"
      }
    `}
                  >
                    {/* Play icon */}
                    <svg
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="1.8"
                      className="w-4 h-4"
                    >
                      <path d="M5 3l14 9-14 9V3z" />
                    </svg>
                  </button>

                  {/* Allow / Boost */}
                  <button
                    disabled={item.statusLoading}
                    onClick={() => handleStatusChange(item.uid, "Allow")}
                    className={`
      ${item.statusLoading ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
      ${
        item.status === "Allow"
          ? "text-yellow-500"
          : "text-gray-400 hover:text-yellow-500"
      }
    `}
                  >
                    {/* Lightning icon */}
                    <svg
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="1.8"
                      className="w-4 h-4"
                    >
                      <path d="M13 2L3 14h7v8l11-12h-7z" />
                    </svg>
                  </button>

                  {/* Block */}
                  <button
                    disabled={item.statusLoading}
                    onClick={() => handleStatusChange(item.uid, "Block")}
                    className={`
      ${item.statusLoading ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
      ${
        item.status === "Block"
          ? "text-red-500"
          : "text-gray-400 hover:text-red-500"
      }
    `}
                  >
                    {/* Ban icon */}
                    <svg
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="1.8"
                      className="w-4 h-4"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M5 19L19 5" />
                    </svg>
                  </button>
                </td>

                <td className="px-3 py-3 text-left">
                  {item.integration ? (
                    <div className="relative group flex justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />

                      <div
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block 
                       bg-gray-900 text-white text-xs px-3 py-1 rounded-md shadow-lg"
                      >
                        {item.integrationUrl || "No URL Found"}
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <XCircle className="w-5 h-5 text-rose-500" />
                    </div>
                  )}
                </td>
                <td className="p-4 text-gray-500 dark:text-gray-400 cursor-pointer">
                  {item?.campclicks?.total_t_clicks || 0}
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300 text-right w-16">
                  <div className="flex items-center gap-1 relative group">
                    {/* i Icon */}
                    <svg
                      className="h-4 w-4 text-blue-400 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
                      />
                    </svg>

                    {/* Value */}
                    <span>{item?.campclicks?.total_s_clicks || 0}</span>

                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
      hidden group-hover:block bg-gray-800 text-gray-200 text-xs 
      px-3 py-1 rounded shadow-lg whitespace-nowrap z-50"
                    >
                      {item?.safe_page || "No URL Found"}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-300 text-right w-20">
                  <div className="flex items-center gap-1 relative group">
                    {/* i Icon */}
                    <svg
                      className="h-4 w-4 text-blue-400 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
                      />
                    </svg>

                    {/* Value */}
                    <span>{item?.campclicks?.total_m_clicks || 0}</span>

                    {/* Tooltip */}
                    <div
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
      hidden group-hover:block bg-gray-800 text-gray-200 text-xs 
      px-3 py-1 rounded shadow-lg whitespace-nowrap z-50"
                    >
                      {item?.money_page?.[0]?.url || "No URL Found"}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-gray-500 dark:text-gray-400 cursor-pointer">
                  {new Date(item.date_time).toLocaleString()}
                </td>
                <td className="p-4 text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    {/* DUPLICATE */}
                    <div className="relative group">
                      <Copy
                        size={18}
                        className="cursor-pointer hover:text-blue-500 transition"
                        onClick={() => console.log("duplicate clicked")}
                      />

                      {/* Tooltip */}
                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
        hidden group-hover:block whitespace-nowrap
        bg-gray-800 text-white text-xs px-3 py-1 rounded shadow-lg"
                      >
                        Duplicate your campaign
                      </div>
                    </div>

                    {/* DELETE */}
                    <div className="relative group">
                      <Trash2
                        size={18}
                        className="cursor-pointer hover:text-red-500 transition"
                        onClick={() => console.log("delete clicked")}
                      />

                      {/* Tooltip */}
                      <div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
        hidden group-hover:block whitespace-nowrap
        bg-gray-800 text-white text-xs px-3 py-1 rounded shadow-lg"
                      >
                        Delete your campaign
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600 dark:text-gray-400">
        <p>
          Showing <span className="font-semibold">1–6</span> out of{" "}
          <span className="font-semibold">12</span> items
        </p>

        <div className="flex gap-4">
          <button className="hover:text-black dark:hover:text-white transition">
            Previous
          </button>
          <button className="text-emerald-600 dark:text-emerald-400">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
