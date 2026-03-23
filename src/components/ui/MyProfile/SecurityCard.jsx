import React, { useState } from "react";
import { FaShieldAlt, FaEdit, FaSave, FaLock } from "react-icons/fa";

export default function SecurityCard() {
  const [isEditing, setIsEditing] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "••••••••",
    newPass: "",
    confirm: "",
  });

  const lastChanged = "2 months ago"; // dynamic later

  return (
    <div
      className="
        bg-white dark:bg-slate-800
        border border-gray-200 dark:border-slate-700
        rounded-2xl p-6
        shadow-sm dark:shadow-none
        transition-colors duration-300
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div
            className="
              p-2 rounded-lg
              bg-orange-100 dark:bg-orange-500/10
              text-orange-500
            "
          >
            <FaShieldAlt />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Account Security
            </h2>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Manage your password and protect your account
            </p>
          </div>
        </div>

        {/* EDIT BUTTON */}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`
            flex items-center gap-2 text-sm font-medium
            px-4 py-2 rounded-xl border
            transition-all duration-200 active:scale-[0.97]

            ${
              isEditing
                ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 shadow-md"
                : "bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-200 border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 shadow-sm"
            }
          `}
        >
          {isEditing ? <FaSave /> : <FaEdit />}
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* LAST CHANGED */}
      <div
        className="
          mb-6 px-4 py-3 rounded-lg
          bg-gray-50 dark:bg-slate-900
          border border-gray-200 dark:border-slate-700
          text-sm text-gray-600 dark:text-slate-300
        "
      >
        🔐 Last password changed:{" "}
        <span className="font-medium">{lastChanged}</span>
      </div>

      {/* INPUTS */}
      <div className="space-y-4">
        {/* CURRENT */}
        <PasswordInput
          label="Current Password"
          value={passwords.current}
          disabled={!isEditing}
          onChange={(e) =>
            setPasswords({ ...passwords, current: e.target.value })
          }
        />

        {/* NEW */}
        <PasswordInput
          label="New Password"
          value={passwords.newPass}
          disabled={!isEditing}
          onChange={(e) =>
            setPasswords({ ...passwords, newPass: e.target.value })
          }
        />

        {/* CONFIRM */}
        <PasswordInput
          label="Confirm New Password"
          value={passwords.confirm}
          disabled={!isEditing}
          onChange={(e) =>
            setPasswords({ ...passwords, confirm: e.target.value })
          }
        />
      </div>
    </div>
  );
}

/* ================= PASSWORD INPUT ================= */

const PasswordInput = ({ label, value, onChange, disabled }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700 dark:text-slate-300 flex items-center gap-2">
      <FaLock className="text-xs opacity-70" />
      {label}
    </label>

    <input
      type="password"
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="
        w-full px-4 py-2 rounded-lg border
        bg-gray-50 dark:bg-slate-900
        border-gray-200 dark:border-slate-700
        text-gray-900 dark:text-white

        disabled:opacity-60 disabled:cursor-not-allowed

        focus:outline-none
        focus:ring-2 focus:ring-orange-500/40
        transition
      "
    />
  </div>
);
