import { useState } from "react";
import { Search, Globe, ShieldCheck, Server } from "lucide-react";
import {getIpLookup} from "../api/Apis";
import {apiFunction} from "../api/ApiFunction";
import { showErrorToast } from "../components/toast/toast";

export default function IpLookup() {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

const isValidIP = (ip) => {
  const ipv4 =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

  const ipv6 =
    /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::1)$/;

  return ipv4.test(ip) || ipv6.test(ip);
};

  const handleLookup = async () => {
    if (!ip?.trim()) {
    showErrorToast("Please enter IP address");
    return;
  }

  // ip is valid or not
  if (!isValidIP(ip.trim())) {
    showErrorToast("Invalid IP address format");
    return;
  }
    try {
      setLoading(true);
      const ipLookupData = await apiFunction("get", getIpLookup, ip.trim(), null);
      setResult(ipLookupData?.data?.data?.data)
    } catch (error) {
      console.error("error", error);
    }finally {
      setLoading(false);
    }
  };
  const Spinner = () => (
  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">

      {/* ===== HEADER ===== */}
      <div className="rounded-2xl border border-gray-200 dark:border-white/10
        bg-white dark:bg-[#0f172a] p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          IP Intelligence Lookup
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-40 max-w-2xl">
          Discover geographic, network, and security insights linked to an IP
          address. Analyze ISP details, proxy detection, fraud indicators,
          and connection metadata instantly.
        </p>

        {/* INPUT */}
        <div className="flex gap-3 mt-5">
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Enter valid IP address (e.g. 8.8.8.8)"
            className="
              flex-1 px-4 py-2.5 rounded-lg
              border border-gray-300 dark:border-white/10
              bg-gray-50 dark:bg-[#020617]
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-blue-500 outline-none
            "
          />

          <button
  onClick={handleLookup}
  disabled={loading}
  className={`
    flex items-center gap-2 px-5 py-2 cursor-pointer
    bg-blue-600 hover:bg-blue-700
    text-white rounded-lg
    transition-all duration-200
    shadow hover:shadow-lg
    ${loading ? "opacity-70 cursor-not-allowed" : ""}
  `}
>
  {loading ? (
    <>
      <Spinner />
      Looking up...
    </>
  ) : (
    <>
      <Search className="w-4 h-4" />
      Lookup
    </>
  )}
</button>
        </div>
      </div>

      {/* ===== RESULT SECTION ===== */}
      {result && (
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE (DATA GRID) */}
          <div className="lg:col-span-2 rounded-2xl
            bg-white dark:bg-[#0f172a]
            border border-gray-200 dark:border-white/10
            p-6 shadow-sm">

            <div className="flex items-center gap-2 mb-6">
              <Globe className="text-blue-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">
                IP Details
              </h3>
            </div>

            {/* GRID INFO (NOT TABLE) */}
            <div className="grid sm:grid-cols-2 gap-4">

              {[
                ["IP Address", result?.ip],
                ["Fraud Score", result?.detections?.risk ? result?.detections?.risk : 0],
                ["Country", result?.location?.country_name],
                ["Country Code", result?.location?.country_code],
                ["Region", result?.location?.region_name],
                ["City", result?.location?.city_name],
                ["ISP", result?.network?.provider],
                ["ASN", result?.network?.asn],
                ["Organization", result?.network?.organisation],
                ["Timezone", result?.location?.timezone],
                ["IS Crawler", result.crawler ? "YES" : "NO"],
                ["Mobile", result.mobile ? "YES" : "NO"],
                ["HOST", result?.network?.hostname ? result?.network?.hostname : "N/A"],
                ["Proxy", result?.detections?.proxy ? "YES" : "NO"],  
                ["VPN", result?.detections?.vpn ? "YES" : "NO"],
                ["TOR", result?.detections?.tor ? "YES" : "NO"],
                ["Scraper", result?.detections?.scraper ? "Yes" : "No"],
                ["Compromised", result?.detections?.compromised ? "Yes" : "No"],
                ["ACTIVE VPN", result?.proxy ? "YES" : "NO"],
                ["ACTIVE TOR", result?.tor ? "YES" : "NO"],
                ["RECENT ABUSE", result?.recent ? "YES": "NO"],
                ["BOT STATUS", result?.bot ? "YES" : "NO"],
                ["ZIP CODE", result?.location?.Zip],
                ["Provider Range", result?.location?.range],
                ["Request ID", result?.id],
                ["Last Updated", result?.last_updated],
                ["LATITUDE", result?.location?.latitude],
                ["LONGITUDE", result?.location?.longitude],
                ["REQUEST ID", result?.id],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="
                    rounded-xl p-4
                    bg-gray-50 dark:bg-[#020617]
                    border border-gray-200 dark:border-white/10
                    hover:shadow-md transition
                  "
                >
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {label}
                  </p>

                  <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1 break-all">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div className="rounded-2xl
            bg-gradient-to-br from-blue-600 to-indigo-600
            text-white p-6 shadow-lg relative overflow-hidden">

            {/* glow */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent)]"></div>

            <div className="relative space-y-4">
              <ShieldCheck className="w-8 h-8" />

              <h3 className="text-lg font-semibold">
                Security Insight
              </h3>

              <p className="text-sm text-blue-100 leading-relaxed">
                This panel can display future intelligence such as threat
                analysis, blacklist detection, behavioral scoring, or live
                risk monitoring once backend integration is enabled.
              </p>

              <div className="mt-6 p-4 rounded-xl bg-white/10 backdrop-blur">
                <p className="text-xs opacity-80">
                  Risk Level
                </p>
                <p className="text-2xl font-bold mt-1">
                  Low Risk
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">

  {/* ================= LEFT CARD ================= */}
  <div
    className="
      relative rounded-3xl p-[1px]
      bg-gradient-to-b from-gray-200 via-gray-100 to-transparent
      dark:from-white/15 dark:via-white/5 dark:to-transparent
    "
  >
    <div
      className="
        rounded-3xl p-8 h-full
        bg-white/80 dark:bg-[#0b1220]/80
        backdrop-blur-xl
        border border-gray-200/60 dark:border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]
        transition-all duration-500
        hover:translate-y-[-4px]
      "
    >
      {/* top accent */}
      <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mb-6"></div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        IP Lookup
      </h3>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
        Discover essential network intelligence and geographic insights
        associated with any public IP address.
      </p>

      <div className="mt-7 space-y-4">
        {[
          "ISP and organization information",
          "IP hostname identification",
          "Country detection",
          "Region or state details",
          "City-level estimation",
          "Latitude & longitude approximation",
          "Regional area code",
          "Detected services on the IP",
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 group"
          >
            <div className="
              w-6 h-6 rounded-lg
              bg-gray-100 dark:bg-white/5
              flex items-center justify-center
              text-xs font-semibold
              text-gray-500 dark:text-gray-400
              group-hover:bg-blue-500/10
              transition
            ">
              ✓
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ================= RIGHT CARD ================= */}
  <div
    className="
      relative rounded-3xl p-[1px]
      bg-gradient-to-b from-gray-200 via-gray-100 to-transparent
      dark:from-white/15 dark:via-white/5 dark:to-transparent
    "
  >
    <div
      className="
        rounded-3xl p-8 h-full
        bg-white/80 dark:bg-[#0b1220]/80
        backdrop-blur-xl
        border border-gray-200/60 dark:border-white/10
        shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]
        transition-all duration-500
        hover:translate-y-[-4px]
      "
    >
      {/* accent */}
      <div className="w-10 h-[3px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-6"></div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        Privacy Protected Information
      </h3>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
        Personal identity data is never exposed. Internet privacy standards
        ensure users remain secure and anonymous.
      </p>

      <div className="mt-7 space-y-4">
        {[
          "Personal name or identity",
          "Exact street address",
          "Phone number",
          "Private email address",
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 group">
            <div className="
              w-6 h-6 rounded-lg
              bg-gray-100 dark:bg-white/5
              flex items-center justify-center
              text-xs font-semibold
              text-gray-500 dark:text-gray-400
              group-hover:bg-purple-500/10
              transition
            ">
              ✕
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              {item}
            </p>
          </div>
        ))}
      </div>

      {/* privacy note */}
      <div className="
        mt-8 rounded-xl p-4
        bg-gradient-to-br
        from-gray-50 to-transparent
        dark:from-white/5 dark:to-transparent
        border border-gray-200 dark:border-white/10
        text-xs text-gray-500 dark:text-gray-400
        leading-relaxed
      ">
        These restrictions exist to protect global internet users and
        maintain responsible data transparency.
      </div>
    </div>
  </div>

</div>
    </div>
  );
}