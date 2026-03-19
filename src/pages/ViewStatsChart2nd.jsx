import { Monitor, Smartphone, Bot } from "lucide-react";

/* ================= SAMPLE DATA ================= */
/* Replace with API response */

const topIps = [
  { ip: "5.9.120.8", clicks: 21 },
  { ip: "40.77.167.11", clicks: 2 },
  { ip: "2a03:2880:f80e:48::", clicks: 2 },
  { ip: "47.82.11.36", clicks: 2 },
  { ip: "40.77.167.11", clicks: 2 },
  { ip: "2a03:2880:f80e:48::", clicks: 2 },
  { ip: "47.82.11.36", clicks: 2 },
  { ip: "47.82.11.36", clicks: 2 },
  { ip: "40.77.167.11", clicks: 2 },
  { ip: "2a03:2880:f80e:48::", clicks: 2 },
  { ip: "47.82.11.36", clicks: 2 },
];

const topOS = [
  { name: "Unknown", clicks: 164 },
  { name: "OS X", clicks: 11 },
  { name: "Windows", clicks: 6 },
  { name: "iOS", clicks: 5 },
  { name: "OS X", clicks: 11 },
  { name: "Windows", clicks: 6 },
  { name: "iOS", clicks: 5 },
  { name: "OS X", clicks: 11 },
  { name: "Windows", clicks: 6 },
  { name: "iOS", clicks: 5 },
];

const devices = [
  { name: "Robot", clicks: 166 },
  { name: "Desktop", clicks: 15 },
  { name: "Phone", clicks: 5 },
  { name: "Robot", clicks: 166 },
  { name: "Desktop", clicks: 15 },
  { name: "Phone", clicks: 5 },
  { name: "Robot", clicks: 166 },
  { name: "Desktop", clicks: 15 },
  { name: "Phone", clicks: 5 },
];

/* ================= REUSABLE ROW ================= */

const ProgressRow = ({ label, value, max, index, icon }) => {
  const percent = (value / max) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-green-600">
            #{index + 1}
          </span>

          {icon && icon}

          <span className="truncate">{label}</span>
        </div>

        <span className="font-semibold">{value}</span>
      </div>

      {/* progress bar */}
      <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

/* ================= CARD ================= */

const AnalyticsCard = ({ title, data, iconMap }) => {
  const max = Math.max(...data.map((d) => d?.ip_click_count), 1);

  return (
    <div
      className="
        h-[320px]
        flex flex-col
        rounded-lg p-5
        border border-gray-200 dark:border-white/10
        bg-gray-50 dark:bg-white/5
      "
    >
      {/* HEADER (fixed) */}
      <h3 className="font-semibold text-lg mb-4 shrink-0">{title}</h3>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-500">
            No data found
          </div>
        ) : (
          data.map((item, i) => {
            const percent = (item?.ip_click_count / max) * 100;

            return (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-green-600">
                      #{i + 1}
                    </span>

                    {iconMap?.(item.name)}

                    <span className="truncate">{item?.ip || item.name}</span>
                  </div>

                  <span className="font-semibold">{item?.ip_click_count}</span>
                </div>

                {/* Progress */}
                <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};


// os cards
const OsCard = ({ title, data, iconMap }) => {
  const max = Math.max(...data.map((d) => d?.os_click_count), 1);

  return (
    <div
      className="
        h-[320px]
        flex flex-col
        rounded-lg p-5
        border border-gray-200 dark:border-white/10
        bg-gray-50 dark:bg-white/5
      "
    >
      {/* HEADER (fixed) */}
      <h3 className="font-semibold text-lg mb-4 shrink-0">{title}</h3>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-500">
            No data found
          </div>
        ) : (
          data.map((item, i) => {
            const percent = (item?.os_click_count / max) * 100;

            return (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-green-600">
                      #{i + 1}
                    </span>

                    {iconMap?.(item.name)}

                    <span className="truncate">{item?.os || "N/A"}</span>
                  </div>

                  <span className="font-semibold">{item?.os_click_count}</span>
                </div>

                {/* Progress */}
                <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// device destribution 
const DeviceDestribution = ({ title, data, iconMap }) => {
  const max = Math.max(...data.map((d) => d?.device_click_count), 1);

  return (
    <div
      className="
        h-[320px]
        flex flex-col
        rounded-lg p-5
        border border-gray-200 dark:border-white/10
        bg-gray-50 dark:bg-white/5
      "
    >
      {/* HEADER (fixed) */}
      <h3 className="font-semibold text-lg mb-4 shrink-0">{title}</h3>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-500">
            No data found
          </div>
        ) : (
          data.map((item, i) => {
            const percent = (item?.device_click_count / max) * 100;

            return (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-green-600">
                      #{i + 1}
                    </span>

                    {iconMap?.(item.device)}

                    <span className="truncate">{item?.device || "N/A"}</span>
                  </div>

                  <span className="font-semibold">
                    {item?.device_click_count}
                  </span>
                </div>

                {/* Progress */}
                <div className="h-2 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};


/* ================= MAIN COMPONENT ================= */

export default function ViewStatsChart2nd({ clickDetailsData }) {

  const deviceIcon = (name) => {
    const value = name?.toLowerCase();

    if (value === "phone") return <Smartphone size={16} />;
    if (value === "desktop") return <Monitor size={16} />;
    if (value === "robot") return <Bot size={16} />;

    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* TOP IPS */}
      <AnalyticsCard title="Top IP Activity" data={clickDetailsData?.data?.ipClicks || []} />

      {/* TOP OS */}
      <OsCard title="Operating Systems" data={clickDetailsData?.data?.clickOs || []} />

      {/* DEVICES */}
      <DeviceDestribution
        title="Device Distribution"
        data={clickDetailsData?.data?.deviceClicks || []}
        iconMap={deviceIcon}
      />
    </div>
  );
}
