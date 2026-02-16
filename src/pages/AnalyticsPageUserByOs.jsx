import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const AnalyticsPageUserByOs = ({ deviceCount }) => {
  /* ================= STATIC DATA (Replace with API later) ================= */

  const deviceData = [
    { name: "Mobile", value: deviceCount?.Mobile || 5, color: "#f59e0b" },
    { name: "Desktop", value: deviceCount?.Desktop || 10, color: "#3b82f6" },
    { name: "Tablet", value: deviceCount?.Tablet || 20, color: "#06b6d4" },
  ];

  const osStats = [
    { label: "iOS", value: "8%" },
    { label: "Windows", value: "35%" },
    { label: "Android", value: "2%" },
    { label: "Linux", value: "21%" },
    { label: "iPadOS", value: "14%" },
    { label: "MacOS", value: "9.1%" },
    { label: "Android", value: "6%" },
    { label: "ChromeOS", value: "4.9%" },
  ];

  const sessionData = [
    { name: "Jan", uv: 40, pv: 24 },
    { name: "Feb", uv: 20, pv: 35 },
    { name: "Mar", uv: 50, pv: 10 },
    { name: "Apr", uv: 30, pv: 40 },
    { name: "May", uv: 60, pv: 15 },
    { name: "Jun", uv: 45, pv: 30 },
    { name: "Jul", uv: 70, pv: 25 },
  ];

  /* ================= UI ================= */

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* ================= USERS BY OS ================= */}
      <div
        className="rounded-xl p-6 border
      bg-white border-gray-200 text-gray-900
      dark:bg-[#111827] dark:border-gray-800 dark:text-white"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-semibold text-lg">Users by OS</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Categorized by devices
            </p>
          </div>

          <select
            className="px-3 py-1 text-sm rounded-md border
          bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          >
            <option>Subscribed</option>
          </select>
        </div>

        {/* legend */}
        <div className="flex gap-6 text-sm mb-6">
          {deviceData.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ background: item.color }}
              />
              <span>{item.name}</span>
              <span className="text-gray-500 dark:text-gray-400">
                ({item.value})
              </span>
            </div>
          ))}
        </div>

        {/* donut chart */}
        {/* full pie chart */}
        <div className="h-56 relative">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={deviceData.filter((d) => d.value > 0)}
                cx="50%"
                cy="50%"
                outerRadius={95}
                dataKey="value"
                label={({ percent, value }) =>
                  `${value} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {deviceData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* center total */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold">
              {deviceData.reduce((sum, item) => sum + item.value, 0)}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total Users
            </span>
          </div>
        </div>
      </div>

      {/* ================= SESSION BY OS ================= */}
      <div
        className="rounded-xl p-6 border
      bg-white border-gray-200 text-gray-900
      dark:bg-[#111827] dark:border-gray-800 dark:text-white"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-semibold text-lg">Session by OS</h3>

            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-xs px-2 py-1 rounded-full
              bg-emerald-100 text-emerald-700
              dark:bg-emerald-900/40 dark:text-emerald-400"
              >
                1.52% ↑
              </span>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                more than last week (on average)
              </p>
            </div>
          </div>

          <select
            className="px-3 py-1 text-sm rounded-md border
          bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          >
            <option>Windows</option>
          </select>
        </div>

        {/* line chart */}
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={sessionData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="uv"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#94a3b8"
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <button
          className="mt-6 px-6 py-3 rounded-full text-white font-medium
        bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/40"
        >
          Purchase Now
        </button>
      </div>
    </div>
  );
};

export default AnalyticsPageUserByOs;
