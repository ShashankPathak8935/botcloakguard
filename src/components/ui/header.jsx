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
  Zap,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFunction } from "../../api/ApiFunction";
import { getUpdatedPlan, signOutApi } from "../../api/Apis";
import NotificationModal from "./NotificationModal";

const Header = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const profileButtonRef = useRef(null);
  const modalRef = useRef(null);
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
    const clickedOutsideModal =
      modalRef.current &&
      !modalRef.current.contains(event.target);

    const clickedOutsideButton =
      profileButtonRef.current &&
      !profileButtonRef.current.contains(event.target);

    if (clickedOutsideModal && clickedOutsideButton) {
      setShowProfileModal(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
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
    w-full h-[65px] flex items-center px-6 shadow-sm
    bg-[#F1F3F4] dark:bg-[#141824] z-[99]
    text-gray-800 dark:text-gray-100
    border-b border-gray-200 dark:border-[#1f2433]
  "
    >
      {/* LEFT SECTION */}
      <div className="flex items-center gap-1 mb-2 mt-1">
        {/* Logo */}
        <img
          src="/applogo.png"
          alt="Logo"
          className="w-15 h-15 cursor-pointer"
        />


        {/* Brand Text */}
<div className="flex flex-col leading-[1.1] select-none w-fit">
  {/* Main Title */}
  <h1
    className="
      text-[14px] font-semibold tracking-wide whitespace-nowrap
      bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600
      dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400
      bg-clip-text text-transparent
    "
  >
    Botcloakguard.com
  </h1>

  {/* Underline (same width as text) */}
  <div
    className="
      h-[1.5px] rounded-full w-full
      bg-gradient-to-r
      from-indigo-500 via-purple-500 to-blue-500
      dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400
      my-[2px]
    "
  />

  {/* Subtitle */}
  <span
    className="
      text-[10px] font-medium tracking-wide whitespace-nowrap
      text-indigo-700 dark:text-indigo-300
    "
  >
    Advanced AI for Ad Traffic Protection
  </span>
</div>

        {/* Search */}
        <div className="relative ml-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="
          w-[280px] h-[38px] pl-10 pr-14 rounded-xl text-sm
          bg-white dark:bg-[#1c2130]
          text-gray-800 dark:text-gray-200
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
        <div className="relative group">
          <button
            onClick={toggleTheme}
            className="
      w-10 h-10 flex items-center justify-center rounded-full
      bg-gradient-to-br cursor-pointer from-indigo-500/20 to-purple-500/20
      dark:from-indigo-500/10 dark:to-purple-500/10
      backdrop-blur-md
      border border-gray-300/40 dark:border-white/10
      text-indigo-800 dark:text-indigo-200
      shadow-sm hover:shadow-md
      hover:scale-105 active:scale-95
      transition-all duration-300
    "
          >
            {theme === "dark" ? (
              <Sun
                size={18}
                className="rotate-0 group-hover:rotate-180 transition duration-500"
              />
            ) : (
              <Moon
                size={18}
                className="rotate-0 group-hover:-rotate-12 transition duration-300"
              />
            )}
          </button>

          {/* Tooltip */}
          <span
            className="
      absolute -bottom-11 left-1/2 -translate-x-1/2
      bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg
      opacity-0 group-hover:opacity-100
      translate-y-1 group-hover:translate-y-0
      transition-all duration-200
      whitespace-nowrap
      shadow-lg
    "
          >
            Switch Theme
          </span>
        </div>
      </div>

      {/* CENTER SPACER */}
      <div className="flex-1" />

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-3">
        {/* Clicks Box */}
        <div className="flex items-center gap-2 px-3 h-[30px] rounded-md bg-sky-100 text-sky-700 text-sm font-medium">
          <MousePointerClick className="w-4 h-4" />
          Clicks:
          <span className="font-semibold text-sky-900 dark:text-sky-300">
            {planName === "Starter Monthly" ? "10000" : "Unlimited"}
          </span>
        </div>

        {/* Market Place */}
        <div
          className="
    flex items-center gap-1 px-3 h-[30px] rounded-md
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
          onClick={() => navigate("/Dashboard/pricing")}
          className="
        px-2 h-[30px] rounded-md cursor-pointer flex items-center
        bg-blue-600 hover:bg-blue-700
        text-white text-sm font-semibold
      "
        >
          <Zap size={16} strokeWidth={2.2} />
          Upgrade
        </div>

        {/* Notification */}
        <Bell
          onClick={() => setOpen(true)}
          className="
          w-5 h-5 cursor-pointer
          text-gray-700 dark:text-gray-200
          hover:text-orange-500
          transition-colors
        "
        />

        <NotificationModal open={open} onClose={() => setOpen(false)} />

        {/* Profile */}
        <div className="relative ml-auto">
          <div
            ref={profileButtonRef}
            onClick={() => setShowProfileModal((prev) => !prev)}
            className="
      group flex items-center gap-3 cursor-pointer
      px-3 py-1.5 rounded-full
      transition-all duration-300 ease-out
      border border-gray-200 dark:border-white/10
      bg-white/80 dark:bg-[#1A1D2B]/80
      backdrop-blur-md
      hover:shadow-lg hover:scale-[1.02]
      hover:border-blue-200 dark:hover:border-blue-500/30
      active:scale-[0.97]
      relative -top-[2px]
    "
          >
            <div className="relative shrink-0">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="avatar"
                className="
          w-9 h-9 rounded-full object-cover
          ring-2 ring-white dark:ring-[#1A1D2B]
          transition duration-300
          group-hover:ring-blue-500
        "
              />
              <span
                className="
        absolute bottom-0 right-0
        w-2.5 h-2.5 rounded-full
        bg-green-500
        border-2 border-white dark:border-[#1A1D2B]
      "
              />
            </div>

            <span
              className="
      max-w-[130px] text-sm font-semibold
      text-gray-800 dark:text-gray-100 truncate
    "
            >
              {user?.name || "User"}
            </span>

            <svg
              className={`
        w-4 h-4 transition-transform duration-300
        ${
          showProfileModal
            ? "rotate-180 text-blue-500"
            : "text-gray-400 dark:text-gray-500"
        }
      `}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/*==========Modal============*/}
        {showProfileModal && (
          <div
            ref={modalRef}
            className="
      absolute right-0 mt-115 w-64 mr-6 rounded-2xl
      bg-white dark:bg-[#111827]
      ring-1 ring-gray-200 dark:ring-white/10
      z-50 overflow-hidden isolate
      transition-all duration-200
    "
          >
            {/* ===== Avatar Section ===== */}
            <div
              className="
        relative flex flex-col items-center py-6
        border-b border-gray-200 dark:border-white/[0.07]
        bg-gradient-to-b from-slate-100 to-gray-50
        dark:from-[#1a2035] dark:to-[#111827]
      "
            >
              {/* Top accent line — clipped inside card */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />

              {/* Avatar */}
              <div
                className="
        relative p-[3px] rounded-full
        bg-gradient-to-br from-blue-400 to-violet-400
      "
              >
                <div className="rounded-full overflow-hidden bg-slate-100 dark:bg-[#111827]">
                  <img
                    src="/icons/avtar.jpg"
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover block"
                  />
                </div>
                <span
                  className="
          absolute bottom-1 right-1
          w-3 h-3 rounded-full bg-green-500
          border-2 border-white dark:border-[#111827]
        "
                />
              </div>

              {/* User Name */}
              <p className="text-sm font-semibold mt-3 text-gray-900 dark:text-gray-100 leading-tight">
                {user?.name}
              </p>

              {/* Email — new line */}
              <p className="text-[11px] text-gray-600 dark:text-gray-500 mt-0.5 truncate max-w-[180px]">
                {user?.email}
              </p>

              {/* Online badge */}
              <span
                className="
        mt-1.5 inline-flex items-center gap-1.5
        text-[11px] font-medium px-2.5 py-0.5 rounded-full
        bg-green-100 text-green-800
        dark:bg-green-500/10 dark:text-green-400
      "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                Online
              </span>
            </div>

            {/* ===== Menu ===== */}
            <div className="py-1.5 bg-white dark:bg-[#111827]">
              <button
                onClick={() => navigate("/myProfile")}
                className="
          flex items-center w-full px-4 py-2.5 text-[13px] gap-3
          text-gray-700 dark:text-gray-300
          hover:bg-gray-200 dark:hover:bg-white/5
          transition-colors duration-150 cursor-pointer
        "
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gray-100 dark:bg-white/5">
                  <User className="w-3.5 h-3.5 text-gray-800 dark:text-gray-100" />
                </span>
                My Profile
              </button>

              <button
                onClick={() => navigate("/Dashboard/pricing")}
                className="
          flex items-center w-full px-4 py-2.5 text-[13px] gap-3
          text-gray-700 dark:text-gray-300
          hover:bg-gray-200 dark:hover:bg-white/5
          transition-colors duration-150 cursor-pointer
        "
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gray-100 dark:bg-white/5">
                  <DollarSign className="w-3.5 h-3.5 text-gray-800 dark:text-gray-100" />
                </span>
                Pricing
              </button>

              <button
                onClick={() => navigate("/myProfile")}
                className="
          flex items-center w-full px-4 py-2.5 text-[13px] gap-3
          text-gray-700 dark:text-gray-300
          hover:bg-gray-200 dark:hover:bg-white/5
          transition-colors duration-150 cursor-pointer
        "
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-gray-100 dark:bg-white/5">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-800 dark:text-gray-100" />
                </span>
                Help
              </button>

              <div className="mx-3 my-1.5 border-t border-gray-100 dark:border-white/[0.07]" />

              <button
                onClick={handleLogout}
                className="
          flex items-center w-full px-4 py-2.5 text-[13px] gap-3
          text-red-500 dark:text-red-400
          hover:bg-red-100 dark:hover:bg-red-500/10
          transition-colors duration-150 cursor-pointer
        "
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-red-50 dark:bg-red-500/10">
                  <LogOut className="w-3.5 h-3.5 text-red-600" />
                </span>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
