import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* ================= SAMPLE DATA ================= */
/* Replace later with API data */



const countryData = [
  { country: "US", clicks: 80 },
  { country: "IN", clicks: 45 },
  { country: "DE", clicks: 22 },
  { country: "FR", clicks: 18 },
  { country: "CA", clicks: 12 },
];

const COLORS = ["#22c55e", "#ef4444"]; // safe / risky

/* ================= COMPONENT ================= */

export default function ViewStatsChart({ viewstatsData }) {


 const pieData = [
   {
     name: "Money Clicks",
     value: Number(viewstatsData?.stats?.money_clicks || 0),
   },
   {
     name: "Safe Clicks",
     value: Number(viewstatsData?.stats?.safe_clicks || 0),
   },
 ];

 const hasData = pieData.some((item) => item.value > 0);
  return (
    <div
      className="
        grid grid-cols-1 lg:grid-cols-2 gap-6
      "
    >
      {/* ================= PIE CHART ================= */}
      <div
        className="
          rounded-lg p-5 border
          border-gray-200 dark:border-white/10
          bg-gray-50 dark:bg-white/5
        "
      >
        <h3 className="text-lg font-semibold mb-4">Click Safety Overview</h3>

        {hasData ? (
          <>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full" />
                Money Clicks {viewstatsData?.stats?.money_clicks}
              </span>

              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                Safe Clicks {viewstatsData?.stats?.safe_clicks}
              </span>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            No data found
          </div>
        )}
      </div>

      {/* ================= BAR CHART ================= */}
      <div
        className="
          rounded-lg p-5 border
          border-gray-200 dark:border-white/10
          bg-gray-50 dark:bg-white/5
        "
      >
        <h3 className="text-lg font-semibold mb-4">Clicks by Country</h3>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={viewstatsData?.clicksByCountry}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

              <XAxis dataKey="country" stroke="currentColor" />

              <YAxis stroke="currentColor" />

              <Tooltip />

              <Bar dataKey="click_count" radius={[6, 6, 0, 0]} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
