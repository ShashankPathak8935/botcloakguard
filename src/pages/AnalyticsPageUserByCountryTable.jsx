import React from "react";
import ReactCountryFlag from "react-country-flag";
import { getBrowserIcon } from "../utils/getBrowserIcon";
import { getDeviceIcon } from "../utils/getDeviceIcon";
import { getCountryIcon } from "../utils/getCountryIcon";
import { getOSIcon } from "../utils/getOsIcon";

/* ---------- STATIC DATA ---------- */

const usersData = [
  {
    id: 1,
    country: "Nepal",
    code: "NP",
    total: "84,694",
    change: "+2.90%",
    changeType: "up",
    newUsers: "9,536",
    sessions: "19,536",
  },
  {
    id: 2,
    country: "India",
    code: "IN",
    total: "30,612",
    change: "-4.31%",
    changeType: "down",
    newUsers: "7,700",
    sessions: "2,900",
  },
  {
    id: 3,
    country: "Australia",
    code: "AU",
    total: "22,112",
    change: "0.05%",
    changeType: "neutral",
    newUsers: "2,778",
    sessions: "21,778",
  },
  {
    id: 4,
    country: "USA",
    code: "US",
    total: "9,928",
    change: "+11.31%",
    changeType: "up",
    newUsers: "2,272",
    sessions: "29,272",
  },
  {
    id: 5,
    country: "Egypt",
    code: "EG",
    total: "9,025",
    change: "+3.77%",
    changeType: "up",
    newUsers: "1,374",
    sessions: "3,374",
  },
  {
    id: 6,
    country: "France",
    code: "FR",
    total: "5,357",
    change: "-1.94%",
    changeType: "down",
    newUsers: "3,374",
    sessions: "3,374",
  },
];

/* ---------- CHANGE BADGE ---------- */

const ChangeBadge = ({ type, value }) => {
  const styles = {
    up: `
      bg-emerald-100 text-emerald-700 border border-emerald-300
      dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-600
    `,
    down: `
      bg-red-100 text-red-700 border border-red-300
      dark:bg-red-900/40 dark:text-red-400 dark:border-red-600
    `,
    neutral: `
      bg-gray-100 text-gray-700 border border-gray-300
      dark:bg-gray-700/40 dark:text-gray-300 dark:border-gray-600
    `,
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${styles[type]}`}
    >
      {value}
    </span>
  );
};

/* ---------- COMPONENT ---------- */

export default function AnalyticsPageUserByCountryTable({ logs }) {
  return (
    <div
      className="
      w-full rounded-2xl p-6 transition
      bg-white border border-gray-200 text-gray-900
      dark:bg-[#0F111A] dark:border-white/10 dark:text-gray-100
    "
    >
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Click Activity of Users</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Detail informations of users
          </p>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex bg-gray-100 dark:bg-[#1A1D29] p-1 rounded-lg">
          <button className="px-4 py-1 text-sm rounded-md bg-blue-500 text-white">
            Weekly
          </button>
          <button className="px-4 py-1 text-sm text-gray-500 dark:text-gray-400">
            Monthly
          </button>
          <button className="px-4 py-1 text-sm text-gray-500 dark:text-gray-400">
            Yearly
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-white/10">
            <tr>
              <th className="py-4">S.no</th>
              <th>Created at</th>
              <th>User IP</th>
              <th>Browser</th>
              <th>Device</th>
              <th>Country</th>
              <th>OS</th>
            </tr>
          </thead>

          <tbody>
            {logs?.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <p className="text-lg font-medium">No Data Found</p>

                    <p className="text-sm mt-1">
                      No visitor logs available right now.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              logs.slice(0, 5).map((log, index) => (
                <tr
                  key={log?.uniqueKey}
                  className="
          border-b border-gray-200 dark:border-white/10
          hover:bg-gray-50 dark:hover:bg-white/5 transition
        "
                >
                  <td className="text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>

                  <td className="py-4 text-gray-500">
                    {new Date(log.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="text-gray-700 dark:text-gray-300">{log.ip}</td>

                  <td className="text-gray-700 dark:text-gray-300">
                    <div className="relative group w-fit">
                      <img
                        src={getBrowserIcon(log.browser)}
                        alt={log.browser}
                        className="w-5 h-5"
                      />

                      <span
                        className="
      absolute -top-7 left-1/2 -translate-x-1/2
      px-2 py-1 text-xs rounded-md whitespace-nowrap
      opacity-0 group-hover:opacity-100 transition

      bg-gray-900 text-white
      dark:bg-white dark:text-black
    "
                      >
                        {log.browser || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <div className="relative group w-fit flex items-center justify-center">
                        {/* device icon */}
                        <div className="w-5 h-5 flex items-center justify-center">
                          {getDeviceIcon(log.device)}
                        </div>

                        {/* tooltip */}
                        <span
                          className="
          absolute -top-7 left-1/2 -translate-x-1/2
          px-2 py-1 text-xs rounded-md whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition
          pointer-events-none z-50

          bg-gray-900 text-white
          dark:bg-white dark:text-black
        "
                        >
                          {log.device || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <div className="relative group w-fit flex items-center justify-center">
                        {/* country flag */}
                        <img
                          src={getCountryIcon(log.country)}
                          className="w-6 h-5 object-cover rounded-sm border border-gray-200 dark:border-white/10"
                          alt={log.country}
                        />

                        {/* tooltip */}
                        <span
                          className="
          absolute -top-7 left-1/2 -translate-x-1/2
          px-2 py-1 text-xs rounded-md whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition
          pointer-events-none z-50

          bg-gray-900 text-white
          dark:bg-white dark:text-black
        "
                        >
                          {log.country || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-700 dark:text-gray-300">
                    <div className="relative group w-fit">
                      <img
                        src={getOSIcon(log.os)}
                        alt={log.os}
                        className="w-6 h-6 object-contain rounded-sm border border-gray-200 dark:border-white/10 p-[2px]"
                      />

                      <span
                        className="
        absolute -top-7 left-1/2 -translate-x-1/2
        px-2 py-1 text-xs rounded-md whitespace-nowrap
        opacity-0 group-hover:opacity-100 transition
        pointer-events-none z-50
        bg-gray-900 text-white
        dark:bg-white dark:text-black
      "
                      >
                        {log.os || "Unknown"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
