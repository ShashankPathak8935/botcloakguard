import React from "react";
import ReactCountryFlag from "react-country-flag";



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

export default function AnalyticsPageUserByCountryTable() {
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
          <h2 className="text-lg font-semibold">Users by Country</h2>
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
              <th className="py-4">#</th>
              <th>Country</th>
              <th>Total User</th>
              <th>vs. Last week</th>
              <th>New User</th>
              <th>Engaged Sessions</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {usersData.map((item) => (
              <tr
                key={item.id}
                className="
                border-b border-gray-200 dark:border-white/10
                hover:bg-gray-50 dark:hover:bg-white/5 transition
              "
              >
                <td className="py-4 text-gray-500">{item.id}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <ReactCountryFlag
                      countryCode={item.code}
                      svg
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "4px",
                      }}
                    />
                    <span className="font-medium">{item.country}</span>
                  </div>
                </td>

                <td className="text-gray-700 dark:text-gray-300">
                  {item.total}
                </td>

                <td>
                  <ChangeBadge type={item.changeType} value={item.change} />
                </td>

                <td className="text-gray-700 dark:text-gray-300">
                  {item.newUsers}
                </td>

                <td className="text-gray-700 dark:text-gray-300">
                  {item.sessions}
                </td>

                <td className="text-gray-400 cursor-pointer">•••</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
