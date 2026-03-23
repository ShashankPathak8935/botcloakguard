import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaClipboardList,
  FaHeadset,
} from "react-icons/fa";

import { AccountDetailsForm } from "../components/ui/MyProfile/AccountDetailsForm";
import { OrdersView } from "../components/ui/MyProfile/OrdersView";
import SubscriptionView  from "../components/ui/MyProfile/SubscriptionView";
import { SupportTicketsView } from "../components/ui/MyProfile/SupportTicketsView";

import { useNavigate } from "react-router-dom";
import { apiFunction } from "../api/ApiFunction";
import { signOutApi } from "../api/Apis";

const MyProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const [user,setUser] = useState(null);

   // Load user AFTER component mounts
    useEffect(() => {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored)); // ⬅️ FIX
      }
    }, []);

  const views = {
    orders: <OrdersView />,
    subscription: <SubscriptionView />,
    account: <AccountDetailsForm />,
    ticket: <SupportTicketsView />,
  };

  const breadcrumbNames = {
  account: "Account Details",
  orders: "My Orders",
  subscription: "My Subscription",
  ticket: "Support Tickets",
};

  const handleLogout = async () => {
    try {
      const res = await apiFunction("get", signOutApi, null, null);
      if (res) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("plan");
        localStorage.removeItem("todo_tasks ");
        navigate("/");
      }
    } catch (error) {
//  console.log(error);
 
    }
  };

  return (
    <div
      className="w-full min-h-screen 
  bg-gray-50 text-gray-900
  dark:bg-slate-900 dark:text-white
  px-6 py-10 transition-colors duration-300"
    >
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-semibold mb-2">My Profile</h1>
      <p className="text-gray-500 dark:text-slate-400 mb-8">
        Account &gt;{" "}
        <span className="text-blue-500 font-sm">
          {breadcrumbNames[activeTab]}
        </span>
      </p>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-12 gap-8">
        {/* LEFT SIDEBAR */}
        <div
          className="
    col-span-3
    bg-white dark:bg-slate-800
    border border-gray-200 dark:border-slate-700
    rounded-xl p-6 space-y-6
    h-[530px]
    shadow-sm dark:shadow-none
    transition-colors duration-300
  "
        >
          {/* ===== Avatar Section ===== */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src="/icons/avtar.jpg"
                alt="profile"
                className="
          w-20 h-20 rounded-full object-cover
          ring-2 ring-gray-200 dark:ring-slate-700
          shadow-sm
        "
              />

              {/* Online Dot */}
              <span
                className="
          absolute bottom-1 right-1
          w-4 h-4 bg-green-500
          border-2 border-white dark:border-slate-800
          rounded-full
        "
              ></span>
            </div>

            {/* User Name */}
            <p className="mt-3 text-base font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </p>

            <p className="text-xs text-gray-700 dark:text-slate-300">Online</p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-slate-700"></div>

          {/* ===== Menu Section ===== */}
          <div className="space-y-4 text-[15px]">
            <SidebarItem
              title="Dashboard"
              icon={<FaHome />}
              onClick={() => navigate("/Dashboard/allStats")}
            />

            <SidebarItem
              title="My Subscription"
              icon={<FaClipboardList />}
              active={activeTab === "subscription"}
              onClick={() => setActiveTab("subscription")}
            />

            <SidebarItem
              title="Account Details"
              icon={<FaUser />}
              active={activeTab === "account"}
              onClick={() => setActiveTab("account")}
            />

            <SidebarItem
              title="Support Tickets"
              icon={<FaHeadset />}
              active={activeTab === "ticket"}
              onClick={() => setActiveTab("ticket")}
            />
          </div>

          {/* ===== Logout ===== */}
          <button
            onClick={handleLogout}
            className="
      text-gray-500 dark:text-slate-400
      hover:text-red-500 dark:hover:text-red-400
      flex items-center gap-2 cursor-pointer
      transition-colors pt-4 border-t
      border-gray-200 dark:border-slate-700
    "
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div
          className="
      col-span-9
      rounded-xl
      bg-transparent
      transition-colors duration-300
    "
        >
          {views[activeTab]}
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ title, icon, onClick, active }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center gap-3 cursor-pointer
      px-3 py-2 rounded-lg
      transition-all duration-200

      ${
        active
          ? "bg-orange-50 dark:bg-orange-500/10 text-orange-500 font-semibold"
          : "text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
      }
    `}
  >
    <span className="text-base">{icon}</span>
    {title}
  </div>
);
export default MyProfile;
