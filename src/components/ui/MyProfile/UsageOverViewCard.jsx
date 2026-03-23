import {
  FaSignInAlt,
  FaServer,
  FaDatabase,
  FaLaptop,
  FaChartLine,
} from "react-icons/fa";

export default function UsageOverviewCard() {
  const usageData = [
    {
      title: "Total Logins",
      value: "124",
      sub: "Last 30 days",
      icon: <FaSignInAlt />,
    },
    {
      title: "Requests Used",
      value: "12,450 / 20,000",
      percent: 62,
      icon: <FaServer />,
    },
    {
      title: "Storage Used",
      value: "8.2 GB / 15 GB",
      percent: 55,
      icon: <FaDatabase />,
    },
    {
      title: "Active Sessions",
      value: "3 Devices",
      sub: "Currently logged in",
      icon: <FaLaptop />,
    },
    {
      title: "This Month Activity",
      value: "+18%",
      sub: "Compared to last month",
      icon: <FaChartLine />,
    },
  ];

  return (
    <div
      className="
        w-full rounded-2xl border
        border-gray-200 dark:border-slate-700
        bg-white dark:bg-slate-800
        p-6 shadow-sm
        transition-colors
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Usage Overview
        </h2>

        <span
          className="
            text-xs px-3 py-1 rounded-full
            bg-gray-100 dark:bg-slate-700
            text-gray-600 dark:text-slate-300
          "
        >
          Updated today
        </span>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-5">
        {usageData.map((item, index) => (
          <div
            key={index}
            className="
              p-4 rounded-xl border
              border-gray-200 dark:border-slate-700
              bg-gray-50 dark:bg-slate-900
              hover:shadow-md
              transition
            "
          >
            {/* TOP */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="
                  size-10 flex items-center justify-center
                  rounded-lg
                  bg-white dark:bg-slate-800
                  border border-gray-200 dark:border-slate-600
                  text-gray-700 dark:text-gray-200
                "
              >
                {item.icon}
              </div>

              <p className="text-sm text-gray-600 dark:text-slate-400">
                {item.title}
              </p>
            </div>

            {/* VALUE */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {item.value}
            </h3>

            {/* SUB TEXT */}
            {item.sub && (
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                {item.sub}
              </p>
            )}

            {/* PROGRESS BAR */}
            {item.percent && (
              <div className="mt-3">
                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    style={{ width: `${item.percent}%` }}
                    className="
                      h-full rounded-full
                      bg-gradient-to-r
                      from-indigo-500 to-blue-500
                    "
                  />
                </div>

                <p className="text-xs text-right mt-1 text-gray-500 dark:text-slate-400">
                  {item.percent}% used
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
