// all campaign creation page
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFunction } from "../api/ApiFunction";
import { createCampaignApi } from "../api/Apis";
import { BROWSER_LIST, COUNTRY_LIST, DEVICE_LIST } from "../data/dataList";
import { showErrorToast, showSuccessToast } from "../components/toast/toast";
import {
  CheckCircle,
  Ban,
  Briefcase,
  Building2,
  Wifi,
  Shield,
  Database,
  Server,
  Users,
  Globe,
  Clock,
  Network,
  Layers,
} from "lucide-react";
import TrafficSourceSelect from "./TrafficSourceSelect";

/* ===========================
   Icon components (inline SVG)
   (kept from original parts)
   =========================== */
const ListChecks = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m3 17 2 2 4-4" />
    <path d="m3 7 2 2 4-4" />
    <path d="M13 6h8" />
    <path d="M13 12h8" />
    <path d="M13 18h8" />
  </svg>
);
const DollarSign = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" x2="12" y1="2" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);
const ShieldCheck = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const GitMerge = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M6 21V9a9 9 0 0 1 9 9" />
  </svg>
);
const Filter = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const Bot = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);
const Info = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);
// const Play = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <polygon points="5 3 19 12 5 21 5 3" />
//   </svg>
// );
// const Zap = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
//   </svg>
// );
// const CircleSlash = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <line x1="9" x2="15" y1="15" y2="9" />
//     <circle cx="12" cy="12" r="10" />
//   </svg>
// );
// const CalendarDays = ({ className }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
//     <line x1="16" x2="16" y1="2" y2="6" />
//     <line x1="8" x2="8" y1="2" y2="6" />
//     <line x1="3" x2="21" y1="10" y2="10" />
//     <path d="M8 14h.01" />
//     <path d="M12 14h.01" />
//     <path d="M16 14h.01" />
//     <path d="M8 18h.01" />
//     <path d="M12 18h.01" />
//     <path d="M16 18h.01" />
//   </svg>
// );
const ChevronDown = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const MessageCircle = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const Plus = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);
const XIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

/* InputField - styled */
const InputField = ({
  label,
  name,
  register,
  error,
  required,
  placeholder,
  type = "text",
  icon,
  defaultValue,
  tooltip,
  pattern,
  step,
}) => (
  <div>
    <label className="flex items-center text-xs font-semibold text-gray-600 dark:text-slate-400 tracking-wider mb-2">
      {label} {required && <span className="text-red-500 ml-1">*</span>}
      {tooltip && (
        <Tooltip title={tooltip} placement="top">
          <span className="ml-2 cursor-pointer">
            <Info className="w-4 h-4 text-gray-500 dark:text-slate-500" />
          </span>
        </Tooltip>
      )}
    </label>

    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-slate-400">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        step={step}
        className={` w-full
          bg-white dark:bg-slate-800
          border
          text-gray-900 dark:text-white
          placeholder-gray-400 dark:placeholder-slate-500
          text-sm rounded-lg py-2
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors duration-200 ${
            icon ? "pl-10" : "px-4"
          } ${error ? "border-red-500" : "border-gray-300 dark:border-slate-700"}`}
        {...register(name, {
          required: required ? `${label} is required.` : false,
          pattern: pattern || undefined,
          valueAsNumber: type === "number" ? true : undefined,
        })}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-400">{error.message}</p>}
  </div>
);

/* SelectField - styled */
// const SelectField = ({
//   label,
//   name,
//   register,
//   error,
//   required,
//   tooltip,
//   options = [],
// }) => (
//   <div>
//     <label
//       className=" flex items-center text-xs font-semibold tracking-wider mb-2
//         text-gray-700 dark:text-slate-300"
//     >
//       {label} {required && <span className="text-red-500 ml-1">*</span>}
//       {tooltip && (
//         <Tooltip title={tooltip}>
//           <span className="ml-2 cursor-pointer">
//             <Info className="w-4 h-4 text-gray-500 dark:text-slate-400" />
//           </span>
//         </Tooltip>
//       )}
//     </label>
//     <div className="relative">
//       <select
//         className={`
//           w-full appearance-none border rounded-lg py-2 px-4 text-sm
//           focus:outline-none focus:ring-2 focus:ring-blue-500
//           transition-colors duration-300

//           bg-white dark:bg-slate-900
//           text-gray-900 dark:text-white
//           border-gray-300 dark:border-slate-700

//           ${error ? "border-red-500 dark:border-red-500" : ""}
//         `}
//         {...register(name, { required: required && `${label} is required.` })}
//       >
//         {options.map((opt, i) => (
//           <option key={i} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//       <ChevronDown
//         className="
//           absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none
//           text-gray-500 dark:text-slate-400
//         "
//       />
//     </div>
//     {error && (
//       <p className="mt-1 text-xs text-red-500 dark:text-red-400">
//         {error.message}
//       </p>
//     )}
//   </div>
// );

/* StatusButton - styled card button */
const StatusButton = ({ label, Icon, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      w-full min-h-[64px] px-5 py-3 rounded-xl border
      flex items-center gap-3
      transition-all duration-300 cursor-pointer
      hover:scale-[1.02]

      ${
        isActive
          ? `
            border-blue-500
            ring-2 ring-blue-500/30
            bg-blue-50 dark:bg-blue-500/10
            shadow-lg shadow-blue-500/10
          `
          : `
            border-gray-300 dark:border-slate-700
            bg-white dark:bg-slate-900
            hover:bg-gray-100 dark:hover:bg-slate-800
            shadow-sm
          `
      }
    `}
  >
    <Icon
      className={`w-5 h-5 shrink-0 ${
        isActive
          ? "text-blue-600 dark:text-blue-400"
          : "text-gray-600 dark:text-slate-400"
      }`}
    />

    {/* LABEL */}
    <span
      className={`
        text-sm font-semibold break-words
        ${
          isActive
            ? "text-blue-700 dark:text-white"
            : "text-gray-800 dark:text-slate-300"
        }
      `}
    >
      {label}
    </span>
  </button>
);

/* Dashboard Layout wrapper */
const DashboardLayout = ({ children }) => (
  <div
    style={{ fontFamily: "Outfit, sans-serif", fontWeight: 400 }}
    className="
      min-h-screen
      bg-[#F1F3F4] dark:bg-[#0F172A]
      text-gray-900 dark:text-white
      transition-colors duration-300
    "
  >
    <div className="max-w-7xl mx-auto p-6">{children}</div>

    <div className="fixed bottom-6 right-6">{/* floating content */}</div>
  </div>
);

/* ===========================
   Main Combined Component
   =========================== */

export default function CampaignBuilder() {
  const [trafficSource, setTrafficSource] = useState("");
  // Shared state across steps
  const [step, setStep] = useState(1);
  const [moneyPages, setMoneyPages] = useState([
    { description: "", url: "", weight: 100 },
  ]);
  const [dynamicVariables, setDynamicVariables] = useState([]);
  // const [appendUrl, setAppendUrl] = useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showInputs, setShowInputs] = useState({
    activateAfterX: false,
    frequencyCap: false,
    zeroRedirect: false,
    pageGuard: false,
  });
  const [editCampaignId, setEditCampaignId] = useState(null);

  const [activeStatus, setActiveStatus] = useState("Active");

  const navigate = useNavigate();
  const location = useLocation();

  const fetchCampaignById = async (id) => {
    try {
      const res = await apiFunction(
        "get",
        `${createCampaignApi}/${id}`,
        null,
        null,
      );

      const c = res.data.data;

      reset({
        campaignName: c?.campaign_info?.campaignName,
        comment: c?.campaign_info?.comment,
        epc: c?.campaign_info?.epc,
        cpc: c?.campaign_info?.cpc,
        trafficSource: c?.campaign_info?.trafficSource,
        money_page: c?.money_page,
        safe_page: c?.safe_page,
        conditions: c?.conditions,
        filters: c?.filters,
        afterX: c?.afterX,
        automate: c?.automate,
        page_guard: c?.page_guard,
        http_code: c?.http_code,
      });

      setMoneyPages(
        c?.money_page || [{ description: "", url: "", weight: 100 }],
      );

      setDynamicVariables(c?.dynamicVariables || []);
      setActiveStatus(c?.status);
    } catch (err) {
      // console.error("Failed to fetch campaign", err);
    }
  };

  useEffect(() => {
    if (location?.state?.mode === "edit" && location.state.id) {
      setEditCampaignId(location.state.id);
    }
  }, [location.state]);
  useEffect(() => {
    if (editCampaignId) {
      fetchCampaignById(editCampaignId);
    }
  }, [editCampaignId]);

  // options copied from parts
  const adPlatforms = [
    "Google Adwords",
    "Bing Ads",
    "Yahoo Advertising",
    "Taboola",
    "Facebook Adverts",
    "TikTok Ads",
    "50onRed",
    "ADAMO",
    "AdRoll",
    "AdSupply",
    "Adblade",
    "Adcash",
    "Admob",
    "Adnium",
    "Adsterra",
    "Advertise.com",
    "Airpush",
    "Amazon Ads",
    "Bidvertiser",
    "Blindclick",
    "CNET",
    "CPMOZ",
    "DNTX",
    "Dianomi",
    "DoublePimp",
    "Earnify",
    "EPOM Market",
    "Etrag.ru",
    "Exoclicks",
    "Flix Media",
    "Go2Mobi",
    "Gravity",
    "Gunggo Ads",
    "InMobi",
    "Instagram",
    "Juicy Ads",
    "Lead Impact",
    "LeadBolt",
    "LeadSense",
    "Ligatus",
    "Linkedin",
    "MGID",
    "MarketGid",
    "Media Traffic",
    "Millennial Media",
    "MoPub",
    "MobiAds",
    "NTENT",
    "Native Ads",
    "NewsCred",
    "Octobird",
    "OpenX",
    "Others",
    "Outbrain",
    "Pinterest Ads",
    "Plista",
    "Plugrush",
    "PocketMath",
    "PopAds",
    "PopCash",
    "PopMyAds",
    "Popwin",
    "Popunder.net",
    "PropelMedia",
    "Propeller Ads",
    "Qwaya Ads",
    "Rapsio",
    "RealGravity",
    "Redirect.com",
    "Recontent",
    "Revenue Hits",
    "Simple Reach",
    "Skyword",
    "SiteScout (Basis)",
    "StackAdapt",
    "StartApp",
    "SynupMedia",
    "TapSense",
    "Traffic Broker",
    "Target.my.com",
    "Traffic Factory",
    "Traffic Force",
    "Traffic Holder",
    "Traffic Junky",
    "Traffic Hunt",
    "Traflow",
    "Trellian",
    "Twitter",
    "Unity Ads",
    "Vk.com",
    "WebCollage",
    "Widget Media",
    "Yandex",
    "Zemanta",
    "ZeroPark",
    "MaxVisits",
    "Revisitors",
    "Snapchat Ads",
    "Organic Traffic",
    "Galaksion",
    "Traffic Stars",
    "Snackvideo",
  ];

  const fixedOptions = [
    { id: 1, label: "BUSINESS" },
    { id: 2, label: "GOVERNMENT" },
    { id: 3, label: "Wireless" },
    { id: 4, label: "ASN TS" },
    { id: 5, label: "BIPS" },
    { id: 6, label: "BOT" },
    { id: 7, label: "DATA CENTER" },
    { id: 8, label: "HRIP" },
    { id: 9, label: "ISP TS" },
    { id: 10, label: "LRIP" },
    { id: 11, label: "PROXY/VPN" },
    { id: 12, label: "TIME ZONE" },
    { id: 13, label: "TSIF" },
  ];

  const filterIcons = {
    BUSINESS: Briefcase,
    GOVERNMENT: Building2,
    Wireless: Wifi,
    "ASN TS": Network,
    BIPS: Layers,
    BOT: Bot,
    "DATA CENTER": Server,
    HRIP: Users,
    "ISP TS": Globe,
    LRIP: Shield,
    "PROXY/VPN": Shield,
    "TIME ZONE": Clock,
    TSIF: Database,
  };

  const OPTIONS = [
    { value: "country", label: "Country" },
    { value: "state", label: "State" },
    { value: "zip", label: "Zip Code" },
    { value: "browser", label: "Browser" },
    { value: "Device", label: "Device" },
    { value: "ASN", label: "ASN" },
    { value: "referrer", label: "Referrer" },
    { value: "IP", label: "IP" },
    { value: "userAgent", label: "User Agent" },
    { value: "isp", label: "ISP" },
  ];

  const steps = [
    { id: 1, name: "Campaign info", icon: ListChecks },
    { id: 2, name: "Money Pages", icon: DollarSign },
    { id: 3, name: "White Page", icon: ShieldCheck },
    { id: 4, name: "Conditions", icon: GitMerge },
    { id: 5, name: "Campaign Filters", icon: Filter },
    { id: 6, name: "Automate", icon: Bot },
  ];

  const statusOptions = [
    { name: "Active", icon: CheckCircle },
    { name: "Allow", icon: ShieldCheck },
    { name: "Block", icon: Ban },
  ];

  const notRecommended = [1, 2, 3];

  /* ---------------------------
     Form (react-hook-form)
     --------------------------- */
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    trigger,
    clearErrors,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      campaignName: null,
      comment: null,
      epc: null,
      cpc: null,
      trafficSource: adPlatforms[0],
      money_page: [{ description: "", url: "", weight: 100 }],
      safe_page: null,
      conditions: [],
      filters: [],
      afterX: null,
      automate: {
        frequencyCap: { value: "" },
        zeroRedirect: { curl: false, iframe: false },
        gclid: false,
        ipCap: false,
      },
      page_guard: { key: "", url: "", second: "" },
      http_code: "301",
    },
  });

  const afterXValue = watch("afterX");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "conditions",
  });
  const selectedTypes = watch("conditions").map((c) => c.type);

  useEffect(() => {
    if (Number(afterXValue) > 0) {
      setShowInputs((p) => ({ ...p, afterX: true }));
    }
  }, [afterXValue]);

  /* ---------------------------
     helper handlers
     --------------------------- */
  // const showCustomAlert = (message) => {
  //   setAlertMessage(message);
  //   setShowAlert(true);
  // };
  // const hideCustomAlert = () => {
  //   setShowAlert(false);
  //   setAlertMessage("");
  // };

  const addMoneyPage = () => {
    setMoneyPages((p) => {
      const next = [...p, { description: "", url: "", weight: 100 }];

      return next;
    });
  };

  const removeMoneyPage = (index) => {
    setMoneyPages((prev) => {
      const next = prev.filter((_, i) => i !== index);
      setValue("money_page", next);
      return next;
    });
  };

  const addDynamicVariable = () => {
    setDynamicVariables((p) => [...p, { name: "", value: "" }]);
  };

  const removeDynamicVariable = (index) => {
    setDynamicVariables((p) => p.filter((_, i) => i !== index));
  };

  const handleAddCondition = (type) => {
    append({ type, mode: "allow", values: [] });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleNext = async () => {
    // validate relevant fields before next
    if (step === 1) {
      const fieldsToValidate = ["campaignName", "trafficSource"];
      const valid = await trigger(fieldsToValidate);
      if (!valid) return;
    }
    if (step === 2) {
      // validate money page urls
      const moneyFields = moneyPages.map((_, i) => `money_page.${i}.url`);
      const valid = await trigger(moneyFields);
      if (!valid) return;
    }
    if (step == 3) {
      const safePageField = "safe_page";
      const valid = await trigger(safePageField);
      if (!valid) return;
    }
    nextStep();
  };

  const handleStepClick = async (targetStep) => {
    // 🔙 Backward movement → always allowed
    if (targetStep <= step) {
      setStep(targetStep);
      return;
    }

    // 👉 Forward movement → validate CURRENT step only
    if (step === 1) {
      const fieldsToValidate = ["campaignName", "trafficSource"];
      const valid = await trigger(fieldsToValidate);
      if (!valid) return;
    }

    if (step === 2) {
      const moneyFields = moneyPages.map((_, i) => `money_page.${i}.url`);
      const valid = await trigger(moneyFields);
      if (!valid) return;
    }

    if (step === 3) {
      const valid = await trigger("safe_page");
      if (!valid) return;
    }

    // ✅ validation passed → go to clicked step
    setStep(targetStep);
  };

  const onSubmit = async (data) => {
    try {
      // merge moneyPages from local state into data (to ensure latest)
      // data.money_page = moneyPages;
      data.status = activeStatus;

      if (location?.state?.mode === "edit") {
        const uid = location?.state?.id;

        const payload = {
          ...data,
          campaign_info: {
            campaignName: data?.campaignName,
            trafficSource: data?.trafficSource,
            epc: data?.epc,
            cpc: data?.cpc,
            comment: data?.comment,
          },
        };

        const res = await apiFunction(
          "patch",
          `${createCampaignApi}/${uid}`,
          null,
          payload,
        );

        showSuccessToast("Campaign updated successfully!");
        navigate("/Dashboard/campaign-integration", {
          state: {
            mode: "edit",
            id: uid,
            data: location.state.data,
          },
        });
      } else {
        const response = await apiFunction(
          "post",
          createCampaignApi,
          null,
          data,
        );

        // use response to show success
        showSuccessToast(
          "Campaign created successfully! you are going to route to Integration page",
        );
        navigate("/Dashboard/campaign-integration", {
          state: {
            mode: "edit",
            data: response?.data?.data || response,
          },
        });
      }
    } catch (err) {
      if (err?.response?.status === 403) {
        showErrorToast("Campaign limit reached. Upgrade your plan 🚀");
        navigate("/Dashboard/pricing");
      } else {
        showErrorToast(err?.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="
         flex items-left justify-between
       bg-white dark:bg-slate-900
       text-gray-900 dark:text-white
         p-4 rounded-lg
         transition-colors duration-300
         "
        >
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-left text-gray-900 dark:text-white">
              {location?.state?.mode === "edit" ? "Update" : "Create"} Campaign
            </h1>

            <p className="text-gray-600 dark:text-slate-400 mt-1 text-left max-w-xl">
              Create high-performance campaigns with smart tracking and
              cloaking.
            </p>
          </div>
        </div>

        {/* Stepper */}
        <nav
          aria-label="Progress"
          className="mb-8 transition-colors duration-300"
        >
          <ol role="list" className="flex items-center gap-6">
            {steps.map((s, idx) => {
              const active = idx + 1 <= step;

              return (
                <li key={s.name} className="flex items-center">
                  {/* STEP ITEM */}
                  <div className="flex flex-col items-center">
                    {/* CIRCLE WITH NUMBER */}
                    <div
                      onClick={() => handleStepClick(idx + 1)}
                      className={`
                flex items-center justify-center
                h-10 w-10 rounded-full cursor-pointer
                text-sm font-semibold
                transition-colors duration-300
                ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-400"
                }
              `}
                    >
                      {idx + 1}
                    </div>

                    {/* STEP NAME BELOW */}
                    <div
                      className={`mt-2 text-sm transition-colors duration-300 ${
                        active
                          ? "text-gray-900 dark:text-white font-medium"
                          : "text-gray-500 dark:text-slate-500"
                      }`}
                    >
                      {s.name}
                    </div>
                  </div>

                  {/* CONNECTOR LINE */}
                  {idx !== steps.length - 1 && (
                    <div
                      className={`mx-4 h-[2px] w-14 transition-colors duration-300 ${
                        idx + 1 < step
                          ? "bg-blue-600"
                          : "bg-gray-300 dark:bg-slate-800"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Form container */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Campaign Info */}
          {step === 1 && (
            <div
              className="
    bg-white dark:bg-slate-900
    border border-gray-200 dark:border-slate-800
    rounded-2xl p-6 shadow-xl
    text-gray-900 dark:text-white
    transition-colors duration-300
  "
            >
              <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-8">
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Campaign Details
                  </h2>
                  <InputField
                    label="Campaign Name"
                    name="campaignName"
                    register={register}
                    error={errors.campaignName}
                    required
                    placeholder="Enter campaign name"
                    tooltip="Enter Desired Campaign Name to identify it"
                  />
                  <InputField
                    label="Comment"
                    name="comment"
                    register={register}
                    error={errors.comment}
                    placeholder="Add a brief description"
                    tooltip="Comment for this campaign"
                  />
                  <div className="p-3 rounded-lg border transition-colors duration-300 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700">
                    <label className="flex items-center text-sm font-medium mb-2 text-gray-900 dark:text-gray-300">
                      Campaign Status{" "}
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {statusOptions.map((opt) => (
                        <StatusButton
                          key={opt.name}
                          label={opt.name}
                          Icon={opt.icon}
                          isActive={activeStatus === opt.name}
                          onClick={() => setActiveStatus(opt.name)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Choose a traffic source
                  </h2>

                  <TrafficSourceSelect
                    label={"Traffic Source"}
                    options={adPlatforms}
                    value={trafficSource}
                    onChange={setTrafficSource}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <div></div>
                {location?.state?.mode === "edit" ? (
                  <button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md cursor-pointer"
                  >
                    <svg
                      class="svg-inline--fa fa-floppy-disk me-2"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="floppy-disk"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      data-fa-i2svg=""
                    >
                      <path
                        fill="currentColor"
                        d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"
                      ></path>
                    </svg>
                    <span>Save Changes</span>
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition cursor-pointer"
                >
                  Proceed <span className="ml-2">&rarr;</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Money Pages */}
          {step === 2 && (
            <div
              className="
    relative overflow-hidden
    bg-gradient-to-br from-gray-50 via-white to-gray-100
    dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
    border border-gray-200 dark:border-slate-800
    rounded-3xl p-8 shadow-xl
    transition-all duration-300
  "
            >
              {/* HEADER */}
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Money Pages Setup
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                    Configure where legit visitors should land
                  </p>
                </div>

                <div className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                  Step 2
                </div>
              </div>

              {/* FORM AREA */}
              <div className="space-y-5">
                {Array.isArray(moneyPages) && moneyPages.length > 0 ? (
                  moneyPages.map((page, index) => (
                    <div
                      key={index}
                      className="
              relative
              grid grid-cols-1 md:grid-cols-3 gap-5
              p-6 rounded-2xl

              bg-white/70 dark:bg-slate-900/70
              backdrop-blur-md

              border border-gray-200 dark:border-slate-700
              shadow-sm hover:shadow-md
              transition-all duration-300
            "
                    >
                      <InputField
                        label="Description"
                        name={`money_page.${index}.description`}
                        register={register}
                        placeholder="Enter description"
                        defaultValue={page.description || ""}
                        tooltip="Short name visible in reports"
                      />

                      <InputField
                        label="Money Page Url"
                        name={`money_page.${index}.url`}
                        register={register}
                        error={errors.money_page?.[index]?.url}
                        required
                        placeholder="https://www.example.com"
                        pattern={{
                          value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                          message: "Enter a valid URL",
                        }}
                        tooltip="Money page for legit visitors"
                      />

                      <InputField
                        label="Weight"
                        name={`money_page.${index}.weight`}
                        register={register}
                        error={errors.money_page?.[index]?.weight}
                        placeholder="100"
                        type="number"
                        tooltip="Priority weight for money pages"
                      />
                    </div>
                  ))
                ) : (
                  <div
                    className="
          text-center py-10 rounded-xl
          border border-dashed border-gray-300 dark:border-slate-700
          text-gray-400 dark:text-slate-500
        "
                  >
                    No money pages added yet.
                  </div>
                )}
              </div>

              {/* BUTTON AREA */}
              <div className="flex justify-between mt-10 items-center">
                {/* Previous */}
                <button
                  type="button"
                  onClick={prevStep}
                  className="
        px-5 py-2.5 rounded-xl cursor-pointer
        bg-gray-200 hover:bg-gray-300
        dark:bg-slate-800 dark:hover:bg-slate-700
        text-gray-700 dark:text-white
        transition-all
      "
                >
                  ← Previous
                </button>

                <div className="flex gap-3">
                  {/* Save */}
                  {location?.state?.mode === "edit" && (
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className="
            flex items-center gap-2
            px-5 py-2.5 rounded-xl cursor-pointer

            bg-gradient-to-r from-blue-600 to-indigo-600
            hover:from-blue-700 hover:to-indigo-700

            text-white shadow-md hover:shadow-lg
            transition-all
          "
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 448 512"
                        fill="currentColor"
                      >
                        <path d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z" />
                      </svg>
                      Save Changes
                    </button>
                  )}

                  {/* Next */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="
          px-6 py-2.5 rounded-xl cursor-pointer
          bg-gradient-to-r from-blue-600 to-indigo-600
          hover:from-blue-700 hover:to-indigo-700
          text-white shadow-md hover:shadow-lg
          transition-all
        "
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: white Page */}
          {step === 3 && (
            <div
              className="
      relative overflow-hidden
      bg-gradient-to-br from-gray-50 via-white to-gray-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950

      border border-gray-200 dark:border-slate-800
      rounded-3xl p-8 shadow-xl
      transition-all duration-300
    "
            >
              <div className="space-y-8">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      White Page
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                      Where should automated visitors (bots and crawlers) be
                      sent?
                    </p>
                  </div>

                  <div className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                    Step 3
                  </div>
                </div>

                {/* INPUT CARD */}
                <div
                  className="
          bg-white/70 dark:bg-slate-900/70
          backdrop-blur-md

          p-6 rounded-2xl
          border border-gray-200 dark:border-slate-700
          shadow-sm hover:shadow-md
          transition-all duration-300
        "
                >
                  <InputField
                    label="White Page Url"
                    name="safe_page"
                    register={register}
                    error={errors.safe_page}
                    required
                    placeholder="https://www.youtube.com"
                    defaultValue="https://www.youtube.com"
                    pattern={{
                      value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                      message: "Enter a valid URL",
                    }}
                    tooltip="White page where bots/reviewers go"
                  />
                </div>

                {/* BUTTON AREA */}
                <div className="flex justify-between mt-10 items-center">
                  {/* Previous */}
                  <button
                    type="button"
                    onClick={prevStep}
                    className="
            px-5 py-2.5 rounded-xl cursor-pointer
            bg-gray-200 hover:bg-gray-300
            dark:bg-slate-800 dark:hover:bg-slate-700
            text-gray-700 dark:text-white
            transition-all
          "
                  >
                    ← Previous
                  </button>

                  <div className="flex gap-3">
                    {/* Save */}
                    {location?.state?.mode === "edit" ? (
                      <button
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="
                flex items-center gap-2
                px-5 py-2.5 rounded-xl cursor-pointer

                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700

                text-white shadow-md hover:shadow-lg
                transition-all
              "
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 448 512"
                          fill="currentColor"
                        >
                          <path d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z" />
                        </svg>
                        Save Changes
                      </button>
                    ) : null}

                    {/* Next */}
                    <button
                      type="button"
                      onClick={handleNext}
                      className="
              px-6 py-2.5 rounded-xl cursor-pointer
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white shadow-md hover:shadow-lg
              transition-all
            "
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Conditions */}
          {step === 4 && (
            <div
              className="
      relative overflow-hidden
      bg-gradient-to-br from-gray-50 via-white to-gray-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950

      border border-gray-200 dark:border-slate-800
      rounded-3xl p-8 shadow-xl
      transition-all duration-300
    "
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      Traffic Conditions
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                      Define rules for visitors based on country, browser, or
                      device
                    </p>
                  </div>

                  <div className="text-xs px-3 py-1 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                    Step 4
                  </div>
                </div>
                {/* <div>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddCondition(e.target.value);
                        e.target.value = "";
                      }
                    }}
                    className="
            w-60 text-sm px-4 py-2.5 rounded-xl

            bg-white dark:bg-slate-900
            text-gray-700 dark:text-white

            border border-gray-300 dark:border-slate-700
            shadow-sm hover:shadow-md
            transition-all
          "
                  >
                    <option value="">+ Add condition</option>

                    {OPTIONS.filter(
                      (o) => !selectedTypes.includes(o.value),
                    ).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-5">
                  {fields.map((fieldItem, idx) => {
                    const currentType = fieldItem.type;

                    let dataList = [];
                    if (currentType === "country") dataList = COUNTRY_LIST;

                    if (currentType === "browser") dataList = BROWSER_LIST;
                    if (currentType === "Device") dataList = DEVICE_LIST;

                    const isDropdown = [
                      "country",
                      "browser",
                      "Device",
                    ].includes(currentType);

                    return (
                      <div
                        key={fieldItem.id}
                        className="
                p-6 rounded-2xl

                bg-white/70 dark:bg-slate-900/70
                backdrop-blur-md

                border border-gray-200 dark:border-slate-700
                shadow-sm hover:shadow-md
                transition-all duration-300
              "
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                            {currentType.toUpperCase()}
                          </h4>
                          <button
                            type="button"
                            onClick={() => remove(idx)}
                            className="text-sm text-gray-400 hover:text-red-500 cursor-pointer transition"
                          >
                            Remove
                          </button>
                        </div>

                        <Controller
                          control={control}
                          name={`conditions.${idx}.mode`}
                          render={({ field }) => (
                            <div className="flex gap-2 mb-4">
                              {["allow", "block"].map((mode) => (
                                <button
                                  key={mode}
                                  type="button"
                                  onClick={() => field.onChange(mode)}
                                  className={`px-4 py-2 text-sm rounded-xl border transition-all cursor-pointer ${
                                    field.value === mode
                                      ? mode === "allow"
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-red-600 text-white border-red-600"
                                      : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700"
                                  }`}
                                >
                                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                </button>
                              ))}
                            </div>
                          )}
                        />

                        <Controller
                          control={control}
                          name={`conditions.${idx}.values`}
                          render={({ field }) => (
                            <div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {field.value?.map((val, i) => (
                                  <span
                                    key={i}
                                    className="
                            inline-flex items-center
                            bg-gray-200 dark:bg-slate-800
                            text-gray-700 dark:text-slate-100
                            px-3 py-1 text-xs rounded-full
                            border border-gray-300 dark:border-slate-600
                          "
                                  >
                                    {val}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        field.onChange(
                                          field.value.filter(
                                            (_, id) => id !== i,
                                          ),
                                        )
                                      }
                                      className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>

                              {isDropdown ? (
                                <select
                                  className="
                          w-full text-sm px-4 py-2.5 rounded-xl

                          bg-white dark:bg-slate-900
                          text-gray-700 dark:text-white

                          border border-gray-300 dark:border-slate-700
                          shadow-sm
                        "
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (val && !field.value.includes(val)) {
                                      field.onChange([...field.value, val]);
                                    }
                                    e.target.value = "";
                                  }}
                                >
                                  <option value="">Select {currentType}</option>

                                  {dataList.map((item) => (
                                    <option
                                      key={item.id}
                                      value={
                                        item.country ||
                                        item.state ||
                                        item.name ||
                                        item.browser ||
                                        item.device
                                      }
                                    >
                                      {item.country ||
                                        item.state ||
                                        item.name ||
                                        item.browser ||
                                        item.device}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  placeholder={`Enter ${currentType}...`}
                                  className="
                          w-full text-sm px-4 py-2.5 rounded-xl

                          bg-white dark:bg-slate-900
                          text-gray-700 dark:text-white

                          border border-gray-300 dark:border-slate-700
                          shadow-sm
                        "
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === "Enter" &&
                                      e.target.value.trim()
                                    ) {
                                      e.preventDefault();
                                      field.onChange([
                                        ...field.value,
                                        e.target.value.trim(),
                                      ]);
                                      e.target.value = "";
                                    }
                                  }}
                                />
                              )}
                            </div>
                          )}
                        />
                      </div>
                    );
                  })}
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {OPTIONS.map((option, idx) => {
                    const currentType = option.value;

                    let dataList = [];
                    if (currentType === "country") dataList = COUNTRY_LIST;
                    if (currentType === "browser") dataList = BROWSER_LIST;
                    if (currentType === "Device") dataList = DEVICE_LIST;

                    const isDropdown = [
                      "country",
                      "browser",
                      "Device",
                    ].includes(currentType);

                    return (
                      <div
                        key={currentType}
                        className="
          p-6 rounded-2xl
          bg-white dark:bg-slate-900
          border border-gray-200 dark:border-slate-700
          shadow-sm hover:shadow-md
          transition-all
        "
                      >
                        {/* TITLE */}
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                          {option.label} Targeting
                        </h3>

                        {/* RULE TYPE */}
                        <Controller
                          control={control}
                          name={`conditions.${idx}.mode`}
                          defaultValue="allow"
                          render={({ field }) => (
                            <div className="flex gap-3 mb-4">
                              {["allow", "block"].map((mode) => (
                                <label
                                  key={mode}
                                  className="flex items-center gap-2 cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    value={mode}
                                    checked={field.value === mode}
                                    onChange={() => field.onChange(mode)}
                                    className="cursor-pointer"
                                  />
                                  <span className="text-sm text-gray-700 dark:text-slate-300">
                                    {mode.charAt(0).toUpperCase() +
                                      mode.slice(1)}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}
                        />

                        {/* VALUE SELECT */}
                        <Controller
                          control={control}
                          name={`conditions.${idx}.values`}
                          defaultValue={[]}
                          render={({ field }) => (
                            <>
                              {isDropdown ? (
                                <select
                                  className="
                    w-full text-sm px-4 py-2.5 rounded-xl cursor-pointer
                    bg-white dark:bg-slate-800
                    text-gray-700 dark:text-white
                    border border-gray-300 dark:border-slate-700
                  "
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    if (val && !field.value.includes(val)) {
                                      field.onChange([...field.value, val]);
                                    }
                                  }}
                                >
                                  <option value="">
                                    Select {option.label.toLowerCase()}...
                                  </option>

                                  {dataList.map((item) => (
                                    <option
                                      key={item.id}
                                      value={
                                        item.country ||
                                        item.state ||
                                        item.name ||
                                        item.browser ||
                                        item.device
                                      }
                                    >
                                      {item.country ||
                                        item.state ||
                                        item.name ||
                                        item.browser ||
                                        item.device}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type="text"
                                  placeholder={`Enter ${option.label}...`}
                                  className="
                    w-full text-sm px-4 py-2.5 rounded-xl
                    bg-white dark:bg-slate-800
                    text-gray-700 dark:text-white
                    border border-gray-300 dark:border-slate-700
                  "
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === "Enter" &&
                                      e.target.value.trim()
                                    ) {
                                      e.preventDefault();
                                      field.onChange([
                                        ...field.value,
                                        e.target.value.trim(),
                                      ]);
                                      e.target.value = "";
                                    }
                                  }}
                                />
                              )}

                              {/* Selected Values */}
                              <div className="flex flex-wrap gap-2 mt-3">
                                {field.value?.map((val, i) => (
                                  <span
                                    key={i}
                                    className="
                              flex items-center gap-2 
                              px-3 py-1 text-xs rounded-full
                          bg-gray-200 dark:bg-slate-700
                            text-gray-700 dark:text-white
      "
                                  >
                                    {val}

                                    {/* REMOVE BUTTON */}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        field.onChange(
                                          field.value.filter(
                                            (_, index) => index !== i,
                                          ),
                                        )
                                      }
                                      className="text-red-500 hover:text-red-600 font-bold cursor-pointer"
                                    >
                                      ✕
                                    </button>
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between pt-6 items-center">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="
            px-5 py-2.5 rounded-xl cursor-pointer
            bg-gray-200 hover:bg-gray-300
            dark:bg-slate-800 dark:hover:bg-slate-700
            text-gray-700 dark:text-white
            transition-all
          "
                  >
                    ← Previous
                  </button>
                  {location?.state?.mode === "edit" ? (
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className="
                flex items-center gap-2
                px-5 py-2.5 rounded-xl cursor-pointer

                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700

                text-white shadow-md hover:shadow-lg
                transition-all
              "
                    >
                      <svg
                        class="svg-inline--fa fa-floppy-disk me-2"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="floppy-disk"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"
                        ></path>
                      </svg>
                      <span>Save Changes</span>
                    </button>
                  ) : null}
                  <div className="flex gap-3">
                    {watch("conditions")?.some(
                      (c) => c?.values?.length > 0,
                    ) && (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="
                px-6 py-2.5 rounded-xl cursor-pointer
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-700 hover:to-indigo-700
                text-white shadow-md hover:shadow-lg
                transition-all
              "
                      >
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Filters */}
          {/* {step === 5 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl w-full">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Controller
                    name="filters"
                    control={control}
                    render={({ field }) => {
                      const [availableOptions, setAvailableOptions] = useState(
                        fixedOptions.filter(
                          (opt) =>
                            !(field.value || []).some(
                              (sel) => sel.id === opt.id,
                            ),
                        ),
                      );
                      const [selectedOptions, setSelectedOptions] = useState(
                        field.value || [],
                      );
                      const [selectedLeft, setSelectedLeft] = useState([]);
                      const [selectedRight, setSelectedRight] = useState([]);

                      const moveRight = () => {
                        const moved = availableOptions.filter((o) =>
                          selectedLeft.includes(o.id.toString()),
                        );
                        const updatedSelected = [...selectedOptions, ...moved];
                        setSelectedOptions(updatedSelected);
                        setAvailableOptions(
                          availableOptions.filter(
                            (o) => !selectedLeft.includes(o.id.toString()),
                          ),
                        );
                        setSelectedLeft([]);
                        setValue("filters", updatedSelected);
                      };
                      const moveLeft = () => {
                        const moved = selectedOptions.filter((o) =>
                          selectedRight.includes(o.id.toString()),
                        );
                        const updatedAvailable = [
                          ...availableOptions,
                          ...moved,
                        ];
                        const updatedSelected = selectedOptions.filter(
                          (o) => !selectedRight.includes(o.id.toString()),
                        );
                        setAvailableOptions(updatedAvailable);
                        setSelectedOptions(updatedSelected);
                        setSelectedRight([]);
                        setValue("filters", updatedSelected);
                      };
                      const moveAllRight = () => {
                        const updatedSelected = [
                          ...selectedOptions,
                          ...availableOptions,
                        ];
                        setSelectedOptions(updatedSelected);
                        setAvailableOptions([]);
                        setSelectedLeft([]);
                        setValue("filters", updatedSelected);
                      };
                      const moveAllLeft = () => {
                        const updatedAvailable = [
                          ...availableOptions,
                          ...selectedOptions,
                        ];
                        setAvailableOptions(updatedAvailable);
                        setSelectedOptions([]);
                        setSelectedRight([]);
                        setValue("filters", []);
                      };

                      return (
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-10">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <label className="text-white font-semibold mb-2">
                              Available Filters
                            </label>

                            <select
                              className="w-72 md:w-80"
                              multiple
                              size="8"
                              style={{
                                border: "2px solid #272d3e",
                                borderRadius: "6px",
                                padding: "4px",
                                background: "#0f172a",
                                color: "white",
                              }}
                              value={selectedLeft}
                              onChange={(e) =>
                                setSelectedLeft(
                                  Array.from(
                                    e.target.selectedOptions,
                                    (opt) => opt.value,
                                  ),
                                )
                              }
                            >
                              {availableOptions.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.id}
                                  style={{ color: "#6c788b" }}
                                >
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div
                            className="
              flex flex-row md:flex-col
              items-center justify-center
              gap-3
              mt-4 md:mt-10
            "
                          >
                            <button
                              type="button"
                              onClick={moveRight}
                              className="
                w-7     h-7 flex items-center justify-center text-lg
                rounded-md border border-slate-600
                bg-slate-800 hover:bg-slate-700
                hover:border-slate-500 hover:scale-105
                active:scale-95 transition-all duration-200
                text-slate-200  cursor-pointer
              "
                              title="Move selected to right"
                            >
                              ›
                            </button>

                            <button
                              type="button"
                              onClick={moveLeft}
                              className="
                w-7 h-7 flex items-center justify-center text-lg
                rounded-md border border-slate-600
                bg-slate-800 hover:bg-slate-700
                hover:border-slate-500 hover:scale-105
                active:scale-95 transition-all duration-200
                text-slate-200  cursor-pointer
              "
                              title="Move selected to left"
                            >
                              ‹
                            </button>

                            <button
                              type="button"
                              onClick={moveAllRight}
                              className="
                w-7 h-7 flex items-center justify-center text-lg
                rounded-md border border-slate-600
                bg-slate-800 hover:bg-slate-700
                hover:border-slate-500 hover:scale-105
                active:scale-95 transition-all duration-200
                text-slate-200  cursor-pointer
              "
                              title="Move all right"
                            >
                              »
                            </button>

                            <button
                              type="button"
                              onClick={moveAllLeft}
                              className="
                w-7 h-7 flex items-center justify-center text-lg
                rounded-md border border-slate-600
                bg-slate-800 hover:bg-slate-700
                hover:border-slate-500 hover:scale-105
                active:scale-95 transition-all duration-200
                text-slate-200  cursor-pointer
              "
                              title="Move all left"
                            >
                              «
                            </button>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <label className="text-white font-semibold mb-2">
                              Enabled Filters
                            </label>

                            <select
                              multiple
                              size="8"
                              className="w-72 md:w-80"
                              style={{
                                border: "2px solid  #272d3e",
                                borderRadius: "6px",
                                padding: "4px",
                                background: "#0f172a",
                                color: "white",
                              }}
                              value={selectedRight}
                              onChange={(e) =>
                                setSelectedRight(
                                  Array.from(
                                    e.target.selectedOptions,
                                    (opt) => opt.value,
                                  ),
                                )
                              }
                            >
                              {selectedOptions.map((item) => (
                                <option
                                  key={item.id}
                                  value={item.id}
                                  style={{ color: "#6c788b" }}
                                >
                                  {item.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      );
                    }}
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md cursor-pointer "
                  >
                    ‹ Previous
                  </button>
                  {location?.state?.mode === "edit" ? (
                    <button
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md  cursor-pointer"
                    >
                      <svg
                        class="svg-inline--fa fa-floppy-disk me-2"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="floppy-disk"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"
                        ></path>
                      </svg>
                      <span>Save Changes</span>
                    </button>
                  ) : null}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
                    >
                      Next ›
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {step === 5 && (
            <div
              className="w-full rounded-2xl p-6 border shadow-xl
  bg-white border-gray-200
  dark:bg-slate-900 dark:border-slate-800"
            >
              <Controller
                name="filters"
                control={control}
                defaultValue={[]}
                render={({ field }) => {
                  const selected = field.value || [];

                  const toggleFilter = (item) => {
                    const exists = selected.some((f) => f.id === item.id);

                    if (exists) {
                      field.onChange(selected.filter((f) => f.id !== item.id));
                    } else {
                      field.onChange([...selected, item]);
                    }
                  };

                  const removeFilter = (id) => {
                    field.onChange(selected.filter((f) => f.id !== id));
                  };

                  return (
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* AVAILABLE FILTERS */}
                      <div>
                        <h3
                          className="font-semibold mb-3
              text-gray-700 dark:text-white"
                        >
                          Available Filters
                        </h3>

                        <div
                          className="
              max-h-[300px] overflow-y-auto
              rounded-xl border p-3 space-y-2
              bg-gray-50 border-gray-200
              dark:bg-slate-800 dark:border-slate-700"
                        >
                          {fixedOptions.map((item) => {
                            const isSelected = selected.some(
                              (f) => f.id === item.id,
                            );
                            const isNotRecommended = notRecommended.includes(
                              item.id,
                            );

                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => toggleFilter(item)}
                                className={`
                      w-full flex justify-between items-center cursor-pointer
                      px-3 py-2 rounded-lg text-sm transition

                      ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200"
                      }
                      `}
                              >
                                <div className="flex items-center gap-6">
                                  {filterIcons[item.label] &&
                                    React.createElement(
                                      filterIcons[item.label],
                                      {
                                        className: `
                                     w-4 h-4
                                    ${isSelected ? "text-white" : "text-gray-500 dark:text-slate-400"}
                                     `,
                                      },
                                    )}
                                  <span>{item.label}</span>

                                  {isNotRecommended && (
                                    <span
                                      className={`
                           text-[10px] font-medium px-2.5 py-[3px] rounded-full tracking-wide
                         ${
                           isSelected
                             ? "border border-white text-white"
                             : "bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800"
                         }
      `}
                                    >
                                      Not Recommended
                                    </span>
                                  )}
                                </div>
                                {isSelected && "✓"}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* ENABLED FILTERS */}
                      <div>
                        <h3
                          className="font-semibold mb-3
              text-gray-700 dark:text-white"
                        >
                          Enabled Filters
                        </h3>

                        <div
                          className="
              min-h-[150px]
              rounded-xl border p-3
              bg-gray-50 border-gray-200
              dark:bg-slate-800 dark:border-slate-700"
                        >
                          {selected.length === 0 && (
                            <p className="text-sm text-gray-400">
                              No filters enabled
                            </p>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {selected.map((item) => (
                              <div
                                key={item.id}
                                className="
                      flex items-center gap-2
                      px-3 py-1 rounded-full text-sm

                      bg-blue-100 text-blue-700
                      dark:bg-blue-900 dark:text-blue-200
                      "
                              >
                                {filterIcons[item.label] &&
                                  React.createElement(filterIcons[item.label], {
                                    className: "w-3.5 h-3.5",
                                  })}
                                {item.label}

                                <button
                                  type="button"
                                  onClick={() => removeFilter(item.id)}
                                  className="text-xs hover:opacity-70 cursor-pointer"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }}
              />

              {/* NAV BUTTONS */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="
        px-4 py-2 rounded-md cursor-pointer
        bg-gray-200 hover:bg-gray-300 text-gray-700
        dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="
        px-4 py-2 rounded-md cursor-pointer
        bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 6: Automate */}
          {step === 6 && (
            <div
              className="
      w-full rounded-2xl p-6 shadow-xl border
      bg-white border-gray-200
      dark:bg-slate-900 dark:border-slate-800
      transition-all
    "
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div
                    className="
            p-5 rounded-xl border shadow-sm
            bg-gray-50 border-gray-200
            hover:shadow-md transition-all

            dark:bg-slate-800 dark:border-slate-700
          "
                  >
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showInputs.afterX > 0 ? true : false}
                        className="cursor-pointer"
                        onChange={() =>
                          setShowInputs((p) => ({
                            ...p,
                            afterX: !p.afterX,
                          }))
                        }
                      />
                      <span className="text-gray-800 dark:text-white font-medium">
                        Activate after X unique real visitors
                      </span>
                    </label>

                    {showInputs.afterX && (
                      <div className="mt-3">
                        <InputField
                          label="Enter value"
                          name="afterX"
                          register={register}
                          type="number"
                          placeholder="number of visitors"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-5 rounded-xl border shadow-sm bg-gray-50 border-gray-200 hover:shadow-md transition-all dark:bg-slate-800 dark:border-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showInputs.frequencyCap}
                        className="cursor-pointer"
                        onChange={() =>
                          setShowInputs((p) => ({
                            ...p,
                            frequencyCap: !p.frequencyCap,
                          }))
                        }
                      />
                      <span className="text-gray-800 dark:text-white font-medium">
                        Frequency Cap
                      </span>
                    </label>
                    {showInputs.frequencyCap && (
                      <div className="mt-3">
                        <InputField
                          label="Enter value"
                          name="automate.frequencyCap.value"
                          register={register}
                          type="number"
                          placeholder="frequency value"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-5 rounded-xl border shadow-sm bg-gray-50 border-gray-200 hover:shadow-md transition-all dark:bg-slate-800 dark:border-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showInputs.zeroRedirect}
                        className="cursor-pointer"
                        onChange={() =>
                          setShowInputs((p) => ({
                            ...p,
                            zeroRedirect: !p.zeroRedirect,
                          }))
                        }
                      />
                      <span className="text-gray-800 dark:text-white font-medium">
                        Zero Redirect Cloaking
                      </span>
                    </label>
                    {showInputs.zeroRedirect && (
                      <div className="flex gap-6 mt-3">
                        <label className="flex items-center gap-2 text-gray-600 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={watch("automate.zeroRedirect.curl")}
                            className="cursor-pointer"
                            onChange={(e) => {
                              setValue(
                                "automate.zeroRedirect.curl",
                                e.target.checked,
                              );
                              if (e.target.checked)
                                setValue("automate.zeroRedirect.iframe", false);
                            }}
                          />{" "}
                          CURL
                        </label>
                        <label className="flex items-center gap-2 text-gray-600 dark:text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            className="cursor-pointer"
                            checked={watch("automate.zeroRedirect.iframe")}
                            onChange={(e) => {
                              setValue(
                                "automate.zeroRedirect.iframe",
                                e.target.checked,
                              );
                              if (e.target.checked)
                                setValue("automate.zeroRedirect.curl", false);
                            }}
                          />{" "}
                          IFRAME
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="p-5 rounded-xl border cursor-pointer shadow-sm bg-gray-50 border-gray-200 hover:shadow-md transition-all dark:bg-slate-800 dark:border-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("automate.gclid")}
                        className="cursor-pointer"
                      />
                      <span className="text-gray-800 dark:text-white font-medium">
                        GCLID (Google Click ID)
                      </span>
                    </label>
                  </div>

                  <div className="p-5 rounded-xl border shadow-sm bg-gray-50 border-gray-200 hover:shadow-md transition-all dark:bg-slate-800 dark:border-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        {...register("automate.ipCap")}
                      />
                      <span className="text-gray-800 dark:text-white font-medium">
                        IP Cap
                      </span>
                    </label>
                  </div>

                  <div className="p-5 rounded-xl border shadow-sm bg-gray-50 border-gray-200 hover:shadow-md transition-all dark:bg-slate-800 dark:border-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showInputs.pageGuard}
                        className="cursor-pointer"
                        onChange={() =>
                          setShowInputs((p) => ({
                            ...p,
                            pageGuard: !p.pageGuard,
                          }))
                        }
                      />
                      <span className="text-gray-800 dark:text-white font-medium">
                        Page Guard Key
                      </span>
                    </label>
                    {showInputs.pageGuard && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                        <InputField
                          label="Key"
                          name="page_guard.key"
                          register={register}
                          placeholder="Enter key"
                        />
                        <InputField
                          label="URL"
                          name="page_guard.url"
                          register={register}
                          error={errors.page_guard?.url}
                          placeholder="Enter URL"
                          pattern={{
                            value: /^(https?:\/\/[^\s$.?#].[^\s]*)$/i,
                            message: "Enter a valid URL ",
                          }}
                        />
                        <InputField
                          label="Second"
                          name="page_guard.second"
                          register={register}
                          placeholder="Enter second field"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 rounded-xl border shadow-sm bg-gray-50 border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                  <label className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-gray-800 dark:text-white font-medium cursor-pointer">
                      <input
                        type="radio"
                        value="301"
                        {...register("http_code")}
                        className="cursor-pointer"
                      />
                      301
                    </label>

                    <label className="flex items-center cursor-pointer gap-2 text-gray-800 dark:text-white font-medium">
                      <input
                        type="radio"
                        value="302"
                        {...register("http_code")}
                        className="cursor-pointer"
                      />
                      302
                    </label>
                  </label>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="
            px-5 py-2.5 rounded-xl cursor-pointer
            bg-gray-200 hover:bg-gray-300 text-gray-700
            dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white
            transition-all
          "
                  >
                    ‹ Previous
                  </button>

                  <button
                    type="submit"
                    className="
            px-6 py-2.5 rounded-xl cursor-pointer
            bg-gradient-to-r from-emerald-500 to-teal-500
            hover:from-emerald-600 hover:to-teal-600
            text-white shadow-md hover:shadow-lg
            transition-all
          "
                  >
                    {location?.state?.mode === "edit" ? "Update" : "Create"}{" "}
                    Campaign
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* small footer note */}
        <div className="text-xs text-slate-500">
          Pro-tip: Use the Preview or validation to verify money pages &
          conditions before creating.
        </div>

        {/* {showAlert && (
          <CustomAlertModal message={alertMessage} onClose={hideCustomAlert} />
        )} */}
      </div>
    </DashboardLayout>
  );
}
