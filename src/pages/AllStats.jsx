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

  return (
    <div
      className="
    min-h-screen p-6
    bg-[#F1F3F4] text-gray-900
    dark:bg-[#0F111A] dark:text-gray-100
  "
    >
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Good morning, Captain!</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Tuesday, Feb 10, 2026
        </p>
      </div>

      {/* MAIN ROW */}
      <div className="flex gap-4">
        {/* LEFT – 35% */}
        <div className="w-[35%] space-y-6">
          <div
            className="
      rounded-xl p-5 transition
      bg-white
      border border-gray-200
      text-gray-900

      dark:bg-[#0F111A]
      dark:border-white/10
      dark:text-gray-100
    "
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Updates from yesterday
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold">2,110</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Visitors
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">$8.2M</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Earnings
                </p>
              </div>

              <div>
        <h3 className="text-2xl font-semibold">1,124</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Orders
        </p>
      </div>
            </div>
          </div>
        </div>

        {/* RIGHT – 65% */}
        <div className="w-[65%] space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Monthly Earnings"
              value="$25,049"
              footer="+4.33% vs last month"
            />

            <StatCard
              title="Visitor Value"
              value="$63.02"
              footer="-1.03% vs last month"
            />
          </div>

          {/* IMAGE */}
          <div
            className="
          h-[260px] rounded-2xl overflow-hidden
          border border-gray-200
          dark:border-white/10
          bg-gray-200 dark:bg-gradient-to-br
          dark:from-emerald-900/40 dark:to-black
        "
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
