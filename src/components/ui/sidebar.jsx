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
  FileText,
  LayoutDashboard,
  HardDrive,
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
  faSliders,
  faChartLine,
  faWrench,
  faTools,
  faGear,
  faLink,
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
      label: "Custom filter",
      icon: <FontAwesomeIcon icon={faSliders} size="lg" />,
      // route: "/Dashboard/allCampaign",
    },

    {
      label: "Report",
      icon: <FileText size={24} />,
    },
    {
      label: "Analytics",
      icon: <FontAwesomeIcon icon={faChartLine} size="lg" />,
      route: "/Dashboard/analytics",
    },
    {
      label: "Tools",
      icon: <FontAwesomeIcon icon={faGear} size="lg" />,
      route: "/Dashboard/analytics",
    },
    {
      label: "Url Shortner",
      icon: <FontAwesomeIcon icon={faLink} size="lg" />,
      route: "/Dashboard/analytics",
    },
    {
      label: "Blacklisted IP",
      icon: <FontAwesomeIcon icon={faShieldHalved} size="lg" />,
      route: "/Dashboard/IpListings",
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
    {
      label: "Server",
      icon: <Database size={24} />,
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
      className={`h-full flex flex-col items-center py-4
    bg-[#F1F3F4] dark:bg-[#0F172A]
    transition-colors
    ${isCollapsed ? "w-[48px]" : "w-[120px]"}
  `}
    >
      {/* CREATE BUTTON */}
      <div className="flex flex-col items-center mb-6 cursor-pointer w-full">
        {/* PLUS CIRCLE */}
        <div
          className="w-10 h-10 rounded-full
  bg-white dark:bg-slate-800
  shadow-md
  flex items-center justify-center
"
        >
          <span
            className="text-3xl font-light
    text-gray-800 dark:text-white
  "
          >
            +
          </span>
        </div>

        {/* CREATE TEXT */}
        <span
          className="text-[12px] mt-1
  text-gray-700 dark:text-gray-200
"
        >
          Create
        </span>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col items-center gap-3 w-full">
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
                className={`w-full flex flex-col items-center py-2 cursor-pointer transition-all duration-200
    ${
      isItemActive
        ? "bg-[#ECF3FF] dark:bg-blue-500/10 text-[#091ea3] dark:text-blue-400"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/10"
    }
  `}
              >
                <span
                  className={`
              transition-colors
              ${
                isItemActive
                  ? "text-[#091ea3] dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-200"
              }
            `}
                >
                  {item.icon}
                </span>

                <span
                  className={`text-[12px] mt-0 text-center leading-tight transition-all
              ${isCollapsed ? "scale-90" : "scale-100"}
              ${
                isItemActive
                  ? "text-[#091ea3] dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-200"
              }`}
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
                        className={`text-xs px-3 py-1 rounded cursor-pointer transition
     ${
       isSubActive
         ? "bg-[#ECF3FF] dark:bg-blue-500/10 text-[#465FFF] dark:text-blue-400"
         : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
     }
  `}
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
          className={`h-[calc(100vh-8vh)] overflow-y-auto  overflow-x-hidden
    bg-[#F1F3F4] dark:bg-[#0F172A]
    border-r border-gray-200 dark:border-gray-800
    shadow-md
    scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700
    ${collapsed && !hovered ? "w-[48px]" : "w-[120px]"}
    transition-all duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)]
  `}
        >
          <div className="h-full flex flex-col pb-6">
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
          <div className="w-[120px] bg-[#F1F3F4] dark:bg-[#0F172A] shadow-lg h-[calc(100vh-8vh)] overflow-y-auto overflow-x-hidden  pb-10">
            <SidebarContent isCollapsed={false} />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
