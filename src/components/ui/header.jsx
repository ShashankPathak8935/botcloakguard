import {
  Menu,
  LogOut,
  User,
  DollarSign,
  SlidersHorizontal,
  Search,
  MousePointerClick,
  Trash2,
  Bell,
  HelpCircle,
  Grip,
  Minus,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFunction } from "../../api/ApiFunction";
import { getUpdatedPlan, signOutApi } from "../../api/Apis";

const Header = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const avatarRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [planName, setPlanName] = useState();
  const [planStatus, setPlanStatus] = useState();

  // Example plan data (replace later with API)

  const fetchUpdatedPlan = async () => {
    try {
      const response = await apiFunction("get", getUpdatedPlan, null, null);

      const plan = response?.data?.data;

      if (plan) {
        localStorage.setItem("plan", JSON.stringify(plan));
        setPlanName(plan?.Plan?.name);
        setPlanStatus(plan?.status);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  // ✅ Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    fetchUpdatedPlan();
  }, []);

  const handleLogout = async () => {
    const response = await apiFunction("get", signOutApi, null, null);
    if (response) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("plan");
      localStorage.removeItem("todo_tasks");

      navigate("/");
    }
  };

  return (
    <header
      className="
    w-full h-[64px] flex items-center px-6 shadow-sm
    bg-[#F1F3F4] dark:bg-[#141824]
    text-gray-800 dark:text-gray-100
    border-b border-gray-200 dark:border-[#1f2433]
  "
    >
      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <Menu
          // onClick={onMenuClick}
          className="
        w-6 h-6 cursor-pointer
        text-gray-700 dark:text-gray-300
        hover:text-gray-900 dark:hover:text-white
      "
        />

        {/* Logo */}
        <img
          src="/Botcloakguradlogo.png"
          alt="Logo"
          className="w-9 h-9 cursor-pointer"
        />

        {/* Brand Text */}
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            BotcloakGuard
          </span>
          <span className="text-[11px] text-gray-500 dark:text-gray-400">
            Run Ads Without Risk
          </span>
        </div>

        {/* Search */}
        <div className="relative ml-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="
          w-[280px] h-[38px] pl-10 pr-14 rounded-md text-sm
          bg-white dark:bg-[#1c2130]
          text-gray-700 dark:text-gray-200
          border border-gray-200 dark:border-[#2a3042]
          focus:outline-none
        "
          />
          <span
            className="
          absolute right-3 top-1/2 -translate-y-1/2
          text-[11px] px-1.5 rounded border
          text-gray-400 dark:text-gray-500
          border-gray-300 dark:border-[#2a3042]
        "
          >
            CTRL K
          </span>
        </div>
        <button
          onClick={toggleTheme}
          className="
        w-9 h-9 flex items-center justify-center rounded-full
        bg-gray-200 dark:bg-[#1c2130]
        text-gray-700 dark:text-gray-200
        hover:bg-gray-300 dark:hover:bg-[#242a3a]
        transition
      "
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* CENTER SPACER */}
      <div className="flex-1" />

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        {/* Clicks Box */}
        <div className="flex items-center gap-2 px-3 h-[30px] rounded-md bg-sky-100 text-sky-700 text-sm font-medium">
          <MousePointerClick className="w-4 h-4" />
          Clicks:{" "}
          <span className="font-semibold text-sky-900 dark:text-sky-300">
            5000
          </span>
        </div>

        {/* Market Place */}
        <div
          className="
    flex items-center gap-2 px-3 h-[30px] rounded-md
    bg-slate-100 dark:bg-slate-800
    text-slate-700 dark:text-slate-200
    border border-slate-200 dark:border-slate-700
    text-sm font-medium
    transition-colors
  "
        >
          <span className="text-xs opacity-70">Plan:</span>
          <span className="font-semibold">{planName}</span>
        </div>

        {/* Upgrade */}
        <div
          className="
        px-4 h-[30px] rounded-md cursor-pointer flex items-center
        bg-blue-600 hover:bg-blue-700
        text-white text-sm font-semibold
      "
        >
          Upgrade
        </div>

        {/* Two Lines Icon */}
        <Minus className="w-5 h-5 text-gray-500 dark:text-gray-400 ml-2" />

        {/* Notification */}
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer" />

        {/* Help */}
        <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer" />

        {/* 9 Dots */}
        <Grip className="w-5 h-5 text-gray-600 dark:text-gray-300 cursor-pointer" />

        {/* Profile */}
        <div
          className="ml-2 flex items-center gap-2 cursor-pointer"
          // onClick={() => setShowProfileModal(!showProfileModal)}
        >
          {user?.image ? (
            <img
              src={user.image}
              className="w-8 h-8 rounded-full object-cover"
              alt="profile"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {showProfileModal && (
          <div className="absolute right-0 mt-2 w-44 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
              {/* My Profile */}

              <button
                onClick={() => navigate("/myProfile")}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
              >
                <User className="w-4 h-4 mr-2" />
                My Profile
              </button>

              {/* billing */}

              <button
                onClick={() => navigate("/Dashboard/pricing")}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Pricing
              </button>

              {/* Help */}
              <button
                onClick={() => navigate("/help")}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 mr-2" /> Help
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          </div>
        )}

        {/* Powered By */}
        <span className="text-[11px] text-gray-400 dark:text-gray-500 ml-1">
          Powered by AI
        </span>
      </div>
    </header>
  );
};

export default Header;
