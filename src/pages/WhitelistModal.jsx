import { X, Network, Monitor } from "lucide-react";
import { useState } from "react";

/* =========================
   REUSABLE INPUT (LOCAL)
========================= */
const Input = ({ label, placeholder, ...props }) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
      {label}
    </label>

    <input
      placeholder={placeholder}
      {...props}
      className="
        w-full px-3 py-1.5 text-sm rounded-md outline-none
        bg-white dark:bg-[#020617]
        border border-gray-300 dark:border-gray-700
        text-gray-800 dark:text-gray-200
        placeholder-gray-400
        focus:ring-2 focus:ring-green-500
        transition
      "
    />
  </div>
);

/* =========================
   MODAL COMPONENT
========================= */
export const WhitelistModal = ({ close }) => {
  const [type, setType] = useState("ip");
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* MODAL */}
      <div
        className="
          w-full max-w-xl
          max-h-[90vh]
          flex flex-col
          rounded-xl
          bg-white dark:bg-[#0B1220]
          border border-gray-200 dark:border-gray-800
          shadow-2xl
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Create New Whitelist
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Allow trusted IP addresses or User Agents
            </p>
          </div>

          <button onClick={close}>
            <X className="text-gray-500 hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* BODY (SCROLLABLE) */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* ROW */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Name *"
              placeholder="e.g., Allowed Ips, Bot User Agents"
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Type *
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="
                  w-full px-3 py-1.5 text-sm rounded-md outline-none
                  bg-white dark:bg-[#020617]
                  border border-gray-300 dark:border-gray-700
                  text-gray-800 dark:text-gray-200
                  focus:ring-2 focus:ring-green-500
                  transition
                "
              >
                <option value="ip">IP Addresses</option>
                <option value="ua">User Agents</option>
              </select>
            </div>
          </div>

          <Input
            label="Description"
            placeholder="Optional: Describe what this whitelist is for"
          />

          {/* TEXTAREA */}
          <div>
            {/* Dynamic Label */}
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {type === "ip" ? <Network size={16} /> : <Monitor size={16} />}
              {type === "ip" ? "IP Addresses *" : "User Agents *"}
            </label>

            <textarea
              rows={4}
              className="
                w-full mt-1 px-3 py-1.5 text-sm font-mono rounded-md outline-none
                bg-white dark:bg-[#020617]
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-gray-200
                focus:ring-2 focus:ring-green-500
              "
              placeholder={
                type === "ip"
                  ? `one per line: single IP or CIDR range
192.168.1.6
2.1.3.44
2025:e88::99`
                  : `Enter User Agents (one per line):
Mozilla/5.0 (compatible; Googlebot/2.1)
Mozilla/5.0 (compatible; Bingbot/2.0)
AdsBot-Google-Mobile`
              }
            />

            {/* FORMAT BOX */}
            <div className="mt-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                Format:
              </p>

              <p className="text-sm text-green-700/80 dark:text-green-400/80 mt-1">
                {type === "ip"
                  ? "Enter one item per line. Single IP or CIDR range (IPv4 and IPv6). Examples: 192.168.1.1, 1.1.1.0/24, 2001:e60::/32"
                  : "Enter one item per line. User agents will be matched exactly."}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800">
            {/* LEFT */}
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  isActive
                    ? "bg-green-100 dark:bg-green-900/30"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <svg
                  className={`w-5 h-5 ${
                    isActive ? "text-green-600" : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>

              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  Active Status
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {isActive
                    ? "This whitelist is active and will bypass all filters"
                    : "This whitelist is inactive and will not bypass filters"}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                className="w-5 h-5 accent-green-600 cursor-pointer"
              />

              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={close}
            className="
              px-4 py-2 text-sm rounded-md
              bg-gray-200 dark:bg-gray-700
              text-gray-700 dark:text-gray-200
              hover:bg-gray-300 dark:hover:bg-gray-600
              transition
            "
          >
            Cancel
          </button>

          <button className="px-4 py-2 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white transition">
            Create Whitelist
          </button>
        </div>
      </div>
    </div>
  );
};
