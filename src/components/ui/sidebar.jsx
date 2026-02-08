import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Building,
  Database,
  Notebook,
  UserSearch,
  Save,
  Unlock,
  X,
  ChevronDown,
  ChevronUp,
  Power,
  HandCoins,
  NotepadText,
  LayoutDashboard,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faBan,
  faChartPie,
  faChartSimple,
  faDollarSign,
  faBorderAll,
  faBullhorn,
  faCircleXmark,
  faShieldHalved,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import { CreditCard, Layers, Wallet } from "lucide-react";
import { Layer } from "recharts";

// import { useSelector } from "react-redux";

const SidebarContent = ({ isCollapsed, mobileVisible, onCloseMobile }) => {
  const location = useLocation();
  const [databaseOpen, setDatabaseOpen] = useState(false);
  const showFull = !isCollapsed;

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  // const { employer } = useSelector((state) => state.getDataReducer);
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Dashboard",
      icon: <FontAwesomeIcon icon={faBorderAll} size="lg" />,
      route: "/Dashboard/allStats",
    },
    {
      label: "Campaign",
      icon: <FontAwesomeIcon icon={faBullhorn} size="lg" />,
      // route: "/Dashboard/allCampaign",
    },

    {
      label: "Blacklisted IP",
      icon: <FontAwesomeIcon icon={faShieldHalved} size="lg" />,
      // route: "/Dashboard/IpListings",
    },
    {
      label: "Analytics",
      icon: <FontAwesomeIcon icon={faChartColumn} size="lg" />,
      // route: "/Dashboard/analytics",
    },
    {
      label: "Report",
      icon: <NotepadText size={24} />,
    },
    {
      label: "Pricing",
      icon: <Wallet size={24} />,
      // route: "/Dashboard/pricing",
    },
    {
      label: "Billing",
      icon: <Layers size={24} />,
      // route: "/Dashboard/billing",
    },
  ];

  const databaseSubItems = [
    {
      label: "Click Logs",
      // route: "/Dashboard/reports",
    },
    // {
    //   label: "Stats Overview",
    //   route: "/Dashboard/clicklogs",
    // },
    // {
    //   label: "Tracking",
    //   route: "/employerHome/UnlockedCandidates",
    // },
    // {
    //   label: "Group By Stats",
    //   route: "/employerHome/UnlockedCandidates",
    // },
    // {
    //   label: "Cost Management",
    //   route: "/employerHome/UnlockedCandidates",
    // },
    // {
    //   label: "Campaign Timeline",
    //   route: "/employerHome/UnlockedCandidates",
    // },
    // {
    //   label: "Delete Campaigns",
    //   route: "/employerHome/UnlockedCandidates",
    // },
  ];

  const handleNavigate = (route) => {
    navigate(route);
    if (mobileVisible) onCloseMobile(); // auto-close sidebar on mobile
  };

  const logout = () => {
    localStorage.removeItem("TokenId");
    localStorage.removeItem("User");
    navigate("/");
  };

  const isDatabaseActive = databaseSubItems.some(
    (sub) => location.pathname === sub.route,
  );

  return (
    <div
      className={`h-full flex flex-col items-center py-4 bg-[#F1F3F4] border-r border-gray-200 ${
        isCollapsed ? "w-[48px]" : "w-[120px]"
      } transition-all duration-500 ease-in-out`}
    >
      {/* CREATE BUTTON */}
      <div className="flex flex-col items-center mb-6 cursor-pointer w-full">
        {/* PLUS CIRCLE */}
        <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center">
          <span className="text-3xl font-light text-gray-800 leading-none">
            +
          </span>
        </div>

        {/* CREATE TEXT */}
        <span
          className={`text-[12px] mt-1 text-gray-700 whitespace-nowrap transition ${
            isCollapsed ? "scale-90" : "scale-100"
          }`}
        >
          Create
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col items-center gap-4 w-full">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.route;
          const isDatabase = item.label === "Report";
          const isItemActive = isActive || (isDatabase && isDatabaseActive);

          return (
            <div key={index} className="w-full flex flex-col items-center">
              <div
                id={item.label}
                onClick={() => {
                  if (isDatabase) {
                    setDatabaseOpen(!databaseOpen);
                  } else if (item.route) {
                    handleNavigate(item.route);
                  }
                }}
                className={`w-full flex flex-col items-center py-2 cursor-pointer transition ${
                  isItemActive
                    ? "bg-[#ECF3FF] text-[#091ea3]"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span
                  className={`${
                    isItemActive ? "text-[#091ea3]" : "text-gray-600"
                  }`}
                >
                  {item.icon}
                </span>

                <span
                  className={`text-[12px] mt-0 text-center leading-tight transition-all ${
                    isCollapsed
                      ? "opacity-100 scale-90"
                      : "opacity-100 scale-100"
                  } ${isItemActive ? "text-[#091ea3]" : "text-gray-700"}`}
                >
                  {item.label}
                </span>
              </div>

              {/* SUB ITEMS (Report) */}
              {isDatabase && databaseOpen && !isCollapsed && (
                <div className="mt-2 flex flex-col gap-2">
                  {databaseSubItems.map((sub, subIndex) => {
                    const isSubActive = location.pathname === sub.route;

                    return (
                      <div
                        key={subIndex}
                        onClick={() => handleNavigate(sub.route)}
                        className={`text-xs px-3 py-1 rounded cursor-pointer transition ${
                          isSubActive
                            ? "bg-[#ECF3FF] text-[#465FFF]"
                            : "text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {sub.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

const Sidebar = ({ collapsed, mobileVisible, onCloseMobile }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden md:block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`h-[100vh] mt-[-8vh] bg-[#F1F3F4] shadow-md ${
            collapsed && !hovered ? "w-[48px]" : "w-[120px]"
          } transition-all duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)]`}
        >
          <div className="h-full flex mt-[8vh] flex-col">
            <SidebarContent
              isCollapsed={collapsed && !hovered}
              mobileVisible={mobileVisible}
              onCloseMobile={onCloseMobile}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileVisible && (
        <div className="absolute inset-0 z-50 flex md:hidden">
          <div className="w-[120px] bg-[#F1F3F4] shadow-lg h-[100vh] overflow-hidden">
            <SidebarContent isCollapsed={false} />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
