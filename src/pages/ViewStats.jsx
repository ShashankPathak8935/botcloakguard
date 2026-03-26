import React,{ useState } from "react";
import {
  MousePointerClick,
  BarChart3,
  Globe,
  ShieldAlert,
  Search,
} from "lucide-react";
import ViewStatsChart from "./ViewStatsChart";
import ViewStatsChart2nd from "./ViewStatsChart2nd";
import ViewStatsChart3rd from "./ViewStatsChart3rd";
import { apiFunction } from "../api/ApiFunction";
import { getClickIp, getAllCampNames, getClickLogs } from "../api/Apis";
import { showErrorToast, showSuccessToast } from "../components/toast/toast";

export default function ViewStats() {
  const [campaignList, setCampaignList] = useState([]);
  const [campId, setCampId] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [viewstatsData, setViewStatsData] = useState(null);
  const [clickDetailsData, setClickDetailsData] = useState(null);

  // fetch all campaigns
  React.useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await apiFunction("get", getAllCampNames, null, null);
        setCampaignList(res?.data?.data || []); // store campaigns
      } catch (err) {
        console.error("Error fetching campaigns:", err);
      }
    };

    fetchCampaigns();
  }, []);

  // handle fetch
const handleFetch = async () => {
  if (!startdate || !enddate) {
    showErrorToast("Please select a Start date and End date first");
    return;
  }

  // // Validate campaign dropdown
  if (!campId) {
    showErrorToast("Please select a campaign.");
    return;
  }

  // const startDate = start.toISOString().split("T")[0];
  // const endDate = end.toISOString().split("T")[0];

  // setLoading(true);

  try {
    
    const [statsRes, detailsRes] = await Promise.all([
      apiFunction(
        "get",
        `${getClickLogs}?startdate=${startdate}&enddate=${enddate}&campId=${campId}`,
        null,
        null,
      ),

      apiFunction(
        "get",
        `${getClickIp}?startdate=${startdate}&enddate=${enddate}&campId=${campId}`,
        null,
        null,
      ),
    ]);
    showSuccessToast("data fetched Succesfully");

    setViewStatsData(statsRes?.data?.data || "");

    // second API data
    setClickDetailsData(detailsRes?.data?.data || "");
    // setShow(true);

    // setViewStatsData(res || "");
  } catch (err) {
    console.error("Error fetching data:", err);
  } finally {
    // setLoading(false);
  }
};


  /* ================= STAT CARD ================= */

  const StatCard = ({ title, value, icon: Icon }) => (
    <div
      className="
        rounded-lg p-4 border
        border-gray-200 dark:border-white/10
        bg-gray-50 dark:bg-white/5
        hover:shadow-md transition
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>

        <div className="p-2 rounded-lg bg-white dark:bg-white/10">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="
        min-h-screen p-6
        bg-[#F1F3F4] text-gray-900
        dark:bg-[#0F111A] dark:text-gray-100
      "
    >
      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">View Stats</h1>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Analyze campaign traffic and detect risky clicks.
        </p>
      </div>

      {/* ================= FILTER SECTION ================= */}
      <div
        className="
          rounded-lg p-4 border
          border-gray-200 dark:border-white/10
          bg-gray-50 dark:bg-white/5
          mb-6
        "
      >
        <div className="grid md:grid-cols-4 gap-4 items-end">
          {/* Campaign */}
          <div>
            <label className="text-sm mb-1 block text-gray-600 dark:text-gray-400">
              Campaign
            </label>

            <select
              value={campId}
              onChange={(e) => setCampId(e.target.value)}
              className="
               w-full h-9 rounded-md px-3 text-sm
             bg-white dark:bg-[#1A1D2B] cursor-pointer
             text-gray-900 dark:text-white
               border border-gray-300 dark:border-white/10
               outline-none custom-scroll
               "
            >
              <option
                value=""
                className="bg-white text-black dark:bg-[#1A1D2B] dark:text-white"
              >
                Select Campaign
              </option>

              {campaignList?.map((camp) => (
                <option
                  key={camp.uid}
                  value={camp.uid}
                  className="bg-white text-black dark:bg-[#1A1D2B] dark:text-white"
                >
                  {camp?.campaign_info?.campaignName}
                </option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="text-sm mb-1 block text-gray-600 dark:text-gray-400">
              From Date
            </label>

            <input
              type="date"
              name="startdate"
              value={startdate}
              onChange={(e) => setStartdate(e.target.value)}
              className="
      w-full rounded-md px-3 py-2 text-sm
      bg-white dark:bg-[#1A1D2B]
      text-gray-900 dark:text-white
      border border-gray-300 dark:border-white/10
      outline-none
      [color-scheme:light] dark:[color-scheme:dark]
    "
            />
          </div>

          {/* To Date */}
          <div>
            <label className="text-sm mb-1 block text-gray-600 dark:text-gray-400">
              To Date
            </label>

            <input
              type="date"
              name="enddate"
              value={enddate}
              onChange={(e) => setEnddate(e.target.value)}
              className="
      w-full rounded-md px-3 py-2 text-sm
      bg-white dark:bg-[#1A1D2B]
      text-gray-900 dark:text-white
      border border-gray-300 dark:border-white/10
      outline-none
      [color-scheme:light] dark:[color-scheme:dark]
    "
            />
          </div>

          {/* Fetch Button */}
          <button
            onClick={handleFetch}
            className="
              flex items-center justify-center gap-2
              bg-green-600 hover:bg-green-700 cursor-pointer
              text-white rounded-md py-2.5 transition
            "
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Clicks"
          value={viewstatsData?.stats?.total_clicks || 0}
          icon={MousePointerClick}
        />

        <StatCard
          title="Unique Clicks"
          value={viewstatsData?.stats?.unique_clicks || 0}
          icon={BarChart3}
        />

        <StatCard
          title="VPN Clicks"
          value={viewstatsData?.stats?.vpn_clicks || 0}
          icon={Globe}
        />

        <StatCard
          title="High Risk Clicks"
          value={viewstatsData?.stats?.high_risk_clicks || 0}
          icon={ShieldAlert}
        />
      </div>

      <div className="mt-4">
        <ViewStatsChart viewstatsData={viewstatsData} />
      </div>
      <div className="mt-4">
        <ViewStatsChart2nd clickDetailsData={clickDetailsData}/>
      </div>
      <div className="mt-4">
        <ViewStatsChart3rd clickDetailsData={clickDetailsData}/>
      </div>
    </div>
  );
}
