import { X } from "lucide-react";

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
        w-full px-3 py-2 rounded-md outline-none
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
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="
        w-full max-w-2xl rounded-xl
        bg-white dark:bg-[#0B1220]
        border border-gray-200 dark:border-gray-800
        shadow-2xl
      "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-800">
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

        {/* BODY */}
        <div className="p-5 space-y-4">
          {/* ROW */}
          <div className="grid grid-cols-2 gap-4">
            <Input label="Name *" placeholder="Allowed IPs" />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Type *
              </label>

              <select className="input-style">
                <option>IP Addresses</option>
                <option>User Agents</option>
              </select>
            </div>
          </div>

          <Input label="Description" placeholder="Optional description..." />

          {/* TEXTAREA */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              IP Addresses *
            </label>

            <textarea
              rows={5}
              className="
                w-full mt-1 px-3 py-2 rounded-md font-mono outline-none
                bg-white dark:bg-[#020617]
                border border-gray-300 dark:border-gray-700
                text-gray-800 dark:text-gray-200
                focus:ring-2 focus:ring-green-500
              "
              placeholder={`192.168.1.1
1.1.1.0/24
2001:e60::/32`}
            />
          </div>

          {/* STATUS */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-[#020617] border border-gray-200 dark:border-gray-800">
            <span className="text-gray-700 dark:text-gray-300">
              Active Status
            </span>

            <input type="checkbox" defaultChecked />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-5 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={close}
            className="
              px-4 py-2 rounded-md
              bg-gray-200 dark:bg-gray-700
              text-gray-700 dark:text-gray-200
              hover:bg-gray-300 dark:hover:bg-gray-600
              transition
            "
          >
            Cancel
          </button>

          <button className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition">
            Create Whitelist
          </button>
        </div>
      </div>
    </div>
  );
};
