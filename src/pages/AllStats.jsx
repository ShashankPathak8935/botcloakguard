import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Smartphone, Monitor, Tablet } from "lucide-react";

import { useNavigate, Link } from "react-router-dom";
import RevenueinSights from "./RevenueInsights.jsx";
import { StatCard } from "./StatCard.jsx";

// import {ipClicks} from "../api/Apis.js";
import { apiFunction } from "../api/ApiFunction.js";
import {
  ipClicks,
  campdata,
  getAllCampaign,
  createCampaignApi,
} from "../api/Apis.js";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../components/toast/toast.jsx";

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [stats, setStats] = useState({
    total_campaigns: 0,
    active_campaigns: 0,
    blocked_campaigns: 0,
    allowed_campaigns: 0,
  });

  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [dropdownPos, setDropdownPos] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todo_tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const ITEMS_PER_PAGE = 5;

  const [clickSummary, setClickSummary] = useState({
    totalClicks: 0,
    safeClicks: 0,
    moneyClicks: 0,
  });
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const fetchIpClicks = async () => {
    try {
      setLoading(true);

      const res = await apiFunction("get", ipClicks);
      const rawData = res?.data?.data || [];

      // 👉 Only latest 10 days
      const last10DaysData = rawData.slice(-10);

      // Chart data
      const formattedData = last10DaysData.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        Safe: Number(item.total_s_clicks || 0),
        Money: Number(item.total_m_clicks || 0),
        Total: Number(item.total_t_clicks || 0),
      }));

      setChartData(formattedData);

      // Summary totals (only last 10 days)
      const totals = last10DaysData.reduce(
        (acc, item) => {
          acc.totalClicks += Number(item.total_t_clicks || 0);
          acc.safeClicks += Number(item.total_s_clicks || 0);
          acc.moneyClicks += Number(item.total_m_clicks || 0);
          return acc;
        },
        { totalClicks: 0, safeClicks: 0, moneyClicks: 0 },
      );

      setClickSummary(totals);
    } catch (err) {
      // console.error("IP Click API Error:", err);
      setChartData([]);
      setClickSummary({ totalClicks: 0, safeClicks: 0, moneyClicks: 0 });
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFunction(
        "get",
        `${getAllCampaign}?page=${page}&limit=${ITEMS_PER_PAGE}`,
        null,
        null,
      );
      // console.log(response);

      // Assume total items is available in response.data.total or we use array length
      const dataRows = response.data.data || [];

      setCampaigns(dataRows);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setTotalRecords(response.data.totalRecords);

      setTotalItems(response.data.total || dataRows.length);
      setIsLoading(false);
    } catch (err) {
      // console.error("Error fetching campaigns:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to load campaign data.";
      setError(errorMessage); // Updated to show actual error if available
      setIsLoading(false);
      setCampaigns([]);
      setTotalItems(0);
    }
  }, []);

  const fetchStats = async () => {
    try {
      const res = await apiFunction("get", campdata, null, null);

      setStats({
        total_campaigns: res?.data?.data?.total_campaigns || 0,
        active_campaigns: res?.data?.data?.active_campaigns || 0,
        blocked_campaigns: res?.data?.data?.blocked_campaigns || 0,
        allowed_campaigns: res?.data?.data?.allowed_campaigns || 0,
      });
    } catch (error) {
      // console.error("Stats API Error:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      signOut();
      navigate("/signin");
    }

    fetchIpClicks();
    fetchStats();
    fetchCampaigns();
  }, []);

  // dummy data for click distribution
  const clickData = [
    {
      name: "Mobile Clicks",
      value: 12,
      color: "#3b82f6",
      icon: <Smartphone size={14} />,
    },
    {
      name: "Desktop Clicks",
      value: 8,
      color: "#22c55e",
      icon: <Monitor size={14} />,
    },
    {
      name: "Tablet Clicks",
      value: 5,
      color: "#facc15",
      icon: <Tablet size={14} />,
    },
  ];

  const totalClicks = clickData.reduce((a, b) => a + b.value, 0);
  
  // percentage calculation for click distribution
  const renderPercentage = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#111827"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {`${Math.round(percent * 100)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-[#F1F3F4] p-6 text-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="text-slate-400 text-sm">
            Track your campaigns performance.
          </p>
        </div>
      </div>
      <div className="bg-[#F1F3F4] p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <StatCard
            title="Total Campaign"
            value="7"
            iconBg="bg-green-100"
            iconColor="text-green-600"
            footer="+12% from last month"
          />

          <StatCard
            title="Active Campaign"
            value="6"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            footer="Running smoothly"
          />

          <StatCard
            title="Paused Campaign"
            value="1"
            iconBg="bg-red-100"
            iconColor="text-red-600"
            footer="Needs attention"
          />

          <StatCard
            title="Plan"
            value="Pro"
            amount="99 USDT"
            footer="Valid until 12 Feb 2026"
            highlight
          />
        </div>
      </div>

      {/* MAIN ROW */}
      <div className="w-full flex gap-4 items-start">
        {/* LEFT COLUMN – 70% */}
        <div className="w-[70%] flex flex-col gap-4">
          {/* GRAPH CARD */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {/* TOP ROW */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-900 text-lg font-semibold">
                Clicks Overview
              </h3>

              <div className="flex gap-2">
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Money
                </span>
                <span className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  Safe
                </span>
              </div>
            </div>

            {/* STATS */}
            <div className="flex gap-10 mb-6">
              <div>
                <p className="text-sm text-gray-500">Money Clicks</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {clickSummary.moneyClicks}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Safe Clicks</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {clickSummary.safeClicks}
                </p>
              </div>
            </div>

            {/* CHART */}
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#E5E7EB"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 2]}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Money"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Safe"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 h-full">
            <h3 className="text-gray-900 font-semibold mb-0">
              Click Distribution
            </h3>

            <div className="flex items-center gap-6">
              {/* LEFT : PIE CHART */}
              <div className="relative w-[220px] h-[200px]">
                <PieChart width={220} height={220}>
                  <Pie
                    data={clickData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={renderPercentage}
                    labelLine={false}
                  >
                    {clickData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>

                {/* CENTER TOTAL */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {totalClicks}
                  </p>
                </div>
              </div>

              {/* RIGHT : LEGEND WITH ICON */}
              <div className="flex-1 space-y-4">
                {clickData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex items-center gap-1 text-gray-700">
                        {item.icon}
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">
                    Total Clicks
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {clickData.reduce((sum, item) => sum + item.value, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN – 30% */}
        <div className="w-[30%]">
          {/* 👇 Tumhara Click Performance card */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 h-full min-h-[697px]">
            {/* HEADER */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-gray-900 font-semibold text-lg">
                  Click Performance
                </h3>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
              <p className="text-sm text-gray-500">
                Recent activity across all campaigns
              </p>
            </div>

            {/* STATS BOX */}
            <div className="bg-[#F1F3F4] rounded-xl p-4 flex justify-between mb-4">
              <div className="flex-1 text-center">
                <p className="text-xs tracking-wide text-gray-600 mb-2">
                  MONEY CLICKS
                </p>
                <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-green-100 text-green-600 font-semibold">
                  {clickSummary.moneyClicks}
                </div>
                <span className="inline-block mt-2 text-[11px] px-3 py-0.5 rounded-full bg-white text-gray-600">
                  TODAY
                </span>
              </div>

              <div className="flex-1 text-center">
                <p className="text-xs tracking-wide text-gray-600 mb-2">
                  SAFE CLICKS
                </p>
                <div className="w-10 h-10 mx-auto flex items-center justify-center rounded-full bg-red-100 text-red-600 font-semibold">
                  {clickSummary.safeClicks}
                </div>
                <span className="inline-block mt-2 text-[11px] px-3 py-0.5 rounded-full bg-white text-gray-600">
                  TODAY
                </span>
              </div>
            </div>

            {/* EMPTY STATE */}
            <div className="bg-[#F1F3F4] rounded-xl py-3 text-center text-sm text-gray-500">
              No Clicks Data Available.
            </div>
          </div>
        </div>
      </div>
      <div className="my-3">
        <RevenueinSights />
      </div>
    </div>
  );
};

export default Dashboard;
