import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { HelpCircle, Infinity } from "lucide-react";

const lineData = [
  { day: "Sun", revenue: 0 },
  { day: "Mon", revenue: 0 },
  { day: "Tue", revenue: 0 },
  { day: "Wed", revenue: 0 },
  { day: "Thu", revenue: 0 },
  { day: "Fri", revenue: 0 },
  { day: "Sat", revenue: 0 },
];

const pieData = [
  { name: "Profit", value: 70 },
  { name: "Expense", value: 30 },
];

const COLORS = ["#22c55e", "#ef4444"];

export default function RevenueInsights() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 w-full">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-gray-900 font-semibold text-lg">
              Revenue Insights
            </h3>

            <HelpCircle
              size={16}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
            />

            <Infinity
              size={16}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => console.log("navigate")}
            />
          </div>

          <p className="text-sm text-gray-500 mt-1">Weekly Earnings Overview</p>
        </div>
      </div>

      {/* CHART AREA */}
      <div className="flex gap-4 h-[240px]">
        {/* LEFT – 70% LINE CHART */}
        <div className="w-[70%] h-full">
          <ResponsiveContainer>
            <LineChart data={lineData}>
              <CartesianGrid
                stroke="#E5E7EB"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RIGHT – 30% PIE CHART */}
        <div className="w-[30%] h-full flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={4}
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* PIE LEGEND */}
          <div className="flex gap-4 mt-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Profit
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Expense
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="mt-4 bg-[#F1F3F4] rounded-lg px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-green-100 flex items-center justify-center">
            $
          </div>
          <div>
            <p className="text-sm text-gray-600">Profit</p>
            <p className="font-semibold text-gray-900">$0.00</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-red-100 flex items-center justify-center">
            −
          </div>
          <div>
            <p className="text-sm text-gray-600">Expense</p>
            <p className="font-semibold text-gray-900">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
