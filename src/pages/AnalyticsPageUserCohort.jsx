const AnalyticsPageUserCohort = () => {
  /* ================= STATIC DATA ================= */
  // later API se replace karna

  const cohortData = [
    {
      date: "May 12 - May 18",
      users: 142,
      activity: [100, 84, 72, 56, 28],
    },
    {
      date: "May 19 - May 25",
      users: 185,
      activity: [95, 80, 65, 48, 20],
    },
    {
      date: "May 26 - Jun 01",
      users: 112,
      activity: [88, 74, 60, 42, 18],
    },
    {
      date: "Jun 02 - Jun 08",
      users: 56,
      activity: [60, 45, 38, 22, 10],
    },
    {
      date: "Jun 09 - Jun 15",
      users: 47,
      activity: [52, 40, 28, 18, 9],
    },
    {
      date: "Jun 16 - Jun 22",
      users: 27,
      activity: [40, 25, 18, 12, 6],
    },
  ];

  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

  /* ================= HEAT COLOR ================= */
  const getColor = (value) => {
    if (value > 80) return "bg-blue-500";
    if (value > 60) return "bg-blue-600/80";
    if (value > 40) return "bg-blue-700/70";
    if (value > 20) return "bg-blue-900/60";
    return "bg-gray-700";
  };

  /* ================= UI ================= */

  return (
    <div
      className="rounded-xl p-6 border
    bg-white border-gray-200 text-gray-900
    dark:bg-[#111827] dark:border-gray-800 dark:text-white"
    >
      {/* header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">User activity by Cohort</h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Detail information of the products
          </p>
        </div>

        <select
          className="px-3 py-1 text-sm rounded-md border
        bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
        >
          <option>Count Per User</option>
        </select>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* table head */}
          <thead className="text-left text-gray-500 dark:text-gray-400">
            <tr>
              <th className="pb-3">Acquisition</th>
              <th className="pb-3">Users</th>

              {weekLabels.map((week, i) => (
                <th key={i} className="pb-3 text-center">
                  {week}
                </th>
              ))}
            </tr>
          </thead>

          {/* table body */}
          <tbody className="space-y-3">
            {cohortData.map((row, i) => (
              <tr
                key={i}
                className="border-t border-gray-200 dark:border-gray-800"
              >
                <td className="py-4">{row.date}</td>

                <td className="py-4">{row.users}</td>

                {row.activity.map((val, idx) => (
                  <td key={idx} className="py-2 px-1">
                    <div
                      className={`h-10 rounded-md flex items-center justify-center text-xs font-medium text-white ${getColor(
                        val,
                      )}`}
                    >
                      {val}%
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* button */}
      <button
        className="mt-6 px-6 py-3 rounded-full text-white font-medium
      bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/40"
      >
        Purchase Now
      </button>
    </div>
  );
};

export default AnalyticsPageUserCohort;
