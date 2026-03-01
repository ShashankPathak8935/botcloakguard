import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

/* --- LOGO MAPPING --- */
const platformLogos = {
  "Google Adwords": "https://cdn.simpleicons.org/googleads",
  "Bing Ads": "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/bing.svg",
  "Yahoo Advertising": "/campaignImages/yahoo.jpg",
  Taboola: "/campaignImages/taboola.svg",
  "Facebook Adverts": "https://cdn.simpleicons.org/facebook",
  "TikTok Ads": "https://cdn.simpleicons.org/tiktok",
  "50onRed": "/campaignImages/50onred.jpg",
  ADAMO: "/campaignImages/adamo.png",
  AdRoll: "/campaignImages/addRoll.png",
  AdSupply: "/campaignImages/addSupply.png",
  Adblade: "/campaignImages/addBlade.png",
  Adcash: "/campaignImages/adCash.png",
  AdMob: "/campaignImages/adMob.png",
  Adnium: "/campaignImages/adnium.png",
  Adsterra: "/campaignImages/Adsterra.png",
  Advertise: "/campaignImages/advertise.png",
  Airpush: "/campaignImages/airpush.png",
  Bidvertiser: "/campaignImages/bidvertiser.png",
  Blindclick: "",
  CNET: "/campaignImages/cnet.png",
  CPMOZ: "",
  DNTX: "",
  Dianomi: "/campaignImages/dianomi.png",
  DoublePimp: "",
  Earnify: "/campaignImages/earnify.png",
  "EPOM Market": "/campaignImages/epom.png",
  "Etrag.ru": "",
  Exoclicks: "/campaignImages/exoclicks.png",
  "Flix Media": "/campaignImages/flixmedia.png",
  Go2Mobi: "/campaignImages/go2mobi.png",
  Gravity: "/campaignImages/gravity.png",
  "Gunggo Ads": "/campaignImages/gungo.png",
  InMobi: "/campaignImages/inmobi.png",
  "Juicy Ads": "/campaignImages/juicyads.png",
  "Lead Impact": "/campaignImages/leadimpact.png",
  LeadBolt: "/campaignImages/leadbolt.png",
  LeadSense: "/campaignImages/leadsense.png",
  Ligatus: "/campaignImages/ligatus.png",
  Linkedin: "/campaignImages/LinkedIn.png",
  MGID: "/campaignImages/magid.png",
  MarketGid: "",
  "Media Traffic": "/campaignImages/mediatraffic.png",
  "Millennial Media": "/campaignImages/millennialmedia.png",
  MoPub: "/campaignImages/mopub.png",
  MobiAds: "/campaignImages/mobiads.png",
  NTENT: "",
  "Native Ads": "/campaignImages/nativeads.png",
  NewsCred: "/campaignImages/newscred.png",
  Octobird: "",
  OpenX: "/campaignImages/openx.png",
  Others: "/campaignImages/others.png",
  Outbrain: "/campaignImages/outbrain.png",
  Plista: "/campaignImages/plista.png",
  Plugrush: "/campaignImages/pluhrush.png",
  PocketMath: "/campaignImages/pocketmath.png",
  PopAds: "/campaignImages/popads.png",
  PopCash: "/campaignImages/popcash.png",
  PopMyAds: "/campaignImages/popmyads.png",
  Popwin: "/campaignImages/popwin.png",
  "Popunder.net": "",
  PropelMedia: "/campaignImages/propelmedia.png",
  "Propeller Ads": "/campaignImages/propellerads.png",
  "Qwaya Ads": "/campaignImages/qways.png",
  Rapsio: "/campaignImages/rapsio.png",
  RealGravity: "/campaignImages/realgravity.png",
  "Redirect.com": "",
  Recontent: "/campaignImages/reconnect.png",
  "Revenue Hits": "/campaignImages/revenuehits.png",
  "Simple Reach": "/campaignImages/simplereach.png",
  Skyword: "/campaignImages/skyward.png",
  "SiteScout (Basis)": "/campaignImages/sitescout.png",
  StackAdapt: "/campaignImages/stackadapt.png",
  StartApp: "/campaignImages/startapp.png",
  SynupMedia: "/campaignImages/synupmedia.png",
  TapSense: "/campaignImages/tapsense.png",
  "Traffic Broker": "/campaignImages/trafficbroker.png",
  "Target.my.com": "",
  "Traffic Factory": "/campaignImages/trafficfactory.png",
  "Traffic Force": "/campaignImages/trafficforce.png",
  "Traffic Holder": "/campaignImages/trafficholder.png",
  "Traffic Junky": "/campaignImages/trafficjunky.png",
  "Traffic Hunt": "/campaignImages/traffichunt.png",
  Traflow: "/campaignImages/traflow.png",
  Trellian: "/campaignImages/trilliant.png",
  "Vk.com": "",
  WebCollage: "/campaignImages/webcollage.png",
  "Widget Media": "/campaignImages/widgets.png",
  Yandex: "/campaignImages/yandex.png",
  Zemanta: "/campaignImages/zemanta.png",
  ZeroPark: "/campaignImages/zeropark.png",
  MaxVisits: "/campaignImages/max.png",
  Revisitors: "",
  "Organic Traffic": "/campaignImages/organictraffic.png",
  Galaksion: "/campaignImages/galaksion.png",
  "Traffic Stars": "/campaignImages/trafficstars.png",
  Snackvideo: "/campaignImages/snackvideo.png",
  Instagram: "https://cdn.simpleicons.org/instagram",
  Twitter: "https://cdn.simpleicons.org/x",
  "Amazon Ads":
    "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazon.svg",
  "Snapchat Ads": "https://cdn.simpleicons.org/snapchat",
  "Pinterest Ads": "https://cdn.simpleicons.org/pinterest",
};

const getLogo = (name) => {
  const trimmed = name?.trim();

  // 1️⃣ If exists in mapping → return it
  if (platformLogos[trimmed]) {
    return platformLogos[trimmed];
  }

  // 2️⃣ Otherwise generate dynamic avatar logo
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    trimmed,
  )}&background=0D8ABC&color=fff&bold=true`;
};

const TrafficSourceSelect = ({ label, options = [], value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  /* close outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* filter options */
  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  /* first 8 cards */
  const quickOptions = filteredOptions.slice(0, 8);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      {/* LABEL */}
      {label && (
        <label className="text-sm font-medium mb-2 block text-gray-900 dark:text-white">
          {label}
        </label>
      )}

      {/* SELECT BOX */}
      <div
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-between px-4 py-2 rounded-lg border cursor-pointer
          bg-white dark:bg-slate-900
          border-gray-300 dark:border-slate-700
        "
      >
        <div className="flex items-center gap-2">
          {value && <img src={getLogo(value)} className="w-5 h-5" />}
          <span className="text-gray-900 dark:text-white">
            {value || "Select traffic source"}
          </span>
        </div>

        <ChevronDown className="w-4 h-4 text-gray-500 dark:text-slate-400" />
      </div>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute w-full mt-2 rounded-lg border shadow-xl z-50
            bg-white dark:bg-slate-900
            border-gray-300 dark:border-slate-700
            max-h-72 overflow-auto
          "
        >
          {/* SEARCH */}
          <div className="p-3 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700">
              <Search className="w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm text-gray-900 dark:text-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* OPTIONS */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                  setSearch("");
                }}
                className="
        flex items-center gap-3 px-4 py-3 cursor-pointer
        hover:bg-gray-100 dark:hover:bg-slate-800
      "
              >
                <img
                  src={getLogo(opt)}
                  alt={opt}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      opt,
                    )}&background=6B7280&color=fff&bold=true`;
                  }}
                />
                <span className="text-gray-900 dark:text-white">{opt}</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-sm text-gray-500 dark:text-slate-400 text-center">
              No results found
            </div>
          )}
        </div>
      )}

      {/* ---------- QUICK SELECT CARDS ---------- */}
      <div className="mt-5">
        <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">
          Choose from the most popular traffic sources below.
        </p>

        <div className="flex flex-wrap gap-4">
          {quickOptions.map((opt) => (
            <div
              key={opt}
              onClick={() => onChange(opt)}
              className={`
                relative cursor-pointer rounded-xl border p-4
                flex flex-col items-center justify-center gap-2
                transition-all duration-300
                w-[90px]
                h-[80px]
                shrink-0

                ${
                  value === opt
                    ? `
                      border-blue-500 bg-blue-50 dark:bg-blue-500/10
                      ring-2 ring-blue-500/20
                    `
                    : `
                      border-gray-200 dark:border-slate-700
                      bg-white dark:bg-slate-900
                      hover:bg-gray-50 dark:hover:bg-slate-800
                    `
                }
              `}
            >
              {/* selected tick */}
              {value === opt && (
                <Check className="absolute top-2 right-2 w-4 h-4 text-blue-600" />
              )}

              <img src={getLogo(opt)} className="w-8 h-8" />
              <span className="text-sm text-gray-900 dark:text-white">
                {opt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficSourceSelect;
