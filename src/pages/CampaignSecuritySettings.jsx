import { useState } from "react";

export default function CampaignSecuritySettings() {
  const [fingerprint, setFingerprint] = useState(false);
  const [spoofReferrer, setSpoofReferrer] = useState(false);
  const [pageGuard, setPageGuard] = useState(false);

  return (
    <div
      className="
        w-full max-w-3xl mx-auto p-6 rounded-xl
        bg-white dark:bg-[#141824]
        border border-gray-200 dark:border-[#2a2f3a]
        shadow-sm space-y-6
      "
    >
      {/* Heading */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Campaign Security Settings
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Configure protection and tracking options for your campaign.
        </p>
      </div>

      {/* ---------- OPTION 1 ---------- */}
      <SettingRow
        title="Do you want to enable device fingerprint for your campaign?"
        value={fingerprint}
        onChange={setFingerprint}
      />

      {/* ---------- OPTION 2 ---------- */}
      <SettingRow
        title="Do you want a spoof referrer for your campaign?"
        value={spoofReferrer}
        onChange={setSpoofReferrer}
      />

      {/* CONDITIONAL FIELD */}
      {spoofReferrer && (
        <div
          className="
            ml-2 p-4 rounded-lg
            bg-gray-50 dark:bg-[#1b2130]
            border border-gray-200 dark:border-[#2a2f3a]
          "
        >
          <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
            Show safe page as referrer
          </label>

          <input
            type="text"
            placeholder="https://example.com"
            className="
              w-full px-4 py-2 rounded-lg border
              bg-white dark:bg-[#141824]
              border-gray-300 dark:border-[#2a2f3a]
              text-gray-800 dark:text-gray-100
              focus:ring-2 focus:ring-indigo-500 outline-none
            "
          />
        </div>
      )}

      {/* ---------- OPTION 3 ---------- */}
      <SettingRow
        title="Do you want a page guard for your campaign?"
        value={pageGuard}
        onChange={setPageGuard}
      />
    </div>
  );
}

/* ============================= */
/* Reusable Yes / No Toggle Row  */
/* ============================= */

function SettingRow({ title, value, onChange }) {
  return (
    <div
      className="
        flex items-center justify-between
        p-4 rounded-lg
        bg-gray-50 dark:bg-[#1b2130]
        border border-gray-200 dark:border-[#2a2f3a]
      "
    >
      <p className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-lg">
        {title}
      </p>

      {/* YES / NO BUTTONS */}
      <div className="flex gap-2">
        <button
          onClick={() => onChange(true)}
          className={`px-4 py-1.5 rounded-md text-sm transition
            ${
              value
                ? "bg-green-500 text-white"
                : "bg-gray-200 dark:bg-[#2a2f3a] text-gray-700 dark:text-gray-300"
            }
          `}
        >
          Yes
        </button>

        <button
          onClick={() => onChange(false)}
          className={`px-4 py-1.5 rounded-md text-sm transition
            ${
              !value
                ? "bg-red-500 text-white"
                : "bg-gray-200 dark:bg-[#2a2f3a] text-gray-700 dark:text-gray-300"
            }
          `}
        >
          No
        </button>
      </div>
    </div>
  );
}