import React, { useEffect, useState } from "react";
import { FaUser, FaBell, FaEdit, FaSave } from "react-icons/fa";
import SecurityCard from "./SecurityCard";
import UsageOverviewCard from "./UsageOverViewCard";

/* ================= FORM FIELD ================= */
const InputField = ({ label, value, onChange, disabled }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
      {label}
    </label>

    <input
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className="
        w-full px-4 py-2 rounded-lg border
        bg-gray-50 dark:bg-slate-900
        border-gray-200 dark:border-slate-700
        text-gray-900 dark:text-white
        disabled:opacity-60 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2
        focus:ring-orange-500/40
        transition
      "
    />
  </div>
);

/* ================= CARD WRAPPER ================= */
const SettingsCard = ({ icon, title, children, isEditing, setIsEditing }) => (
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
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="text-orange-500 text-lg">{icon}</div>
        <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="
          flex items-center gap-2 text-sm
          px-3 py-1.5 rounded-lg
          border border-gray-200 dark:border-slate-600
          hover:bg-gray-100 dark:hover:bg-slate-700
          transition cursor-pointer
        "
      >
        {isEditing ? <FaSave /> : <FaEdit />}
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>

    {children}
  </div>
);

/* ================= MAIN COMPONENT ================= */
export function AccountDetailsForm() {
  const [user, setUser] = useState(null);

  const [editPersonal, setEditPersonal] = useState(false);
  const [editNotification, setEditNotification] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    security: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div
      className="
    w-full min-h-screen px-6 py-10
    bg-gray-50 dark:bg-slate-900

    border border-gray-200 dark:border-slate-700
    rounded-2xl

    shadow-sm dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]

    transition-all duration-300
  "
    >
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Account Settings
        </h1>
        <p className="text-gray-500 dark:text-slate-400">
          Manage your account information and preferences
        </p>
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* ================= PERSONAL INFO ================= */}
        <div className="lg:col-span-2">
          <SettingsCard
            icon={<FaUser />}
            title="Personal Information"
            isEditing={editPersonal}
            setIsEditing={setEditPersonal}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <InputField
                label="Full Name"
                value={user?.name}
                disabled={!editPersonal}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />

              <InputField
                label="Phone Number"
                value={user?.phone}
                disabled={!editPersonal}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
            </div>

            <div className="mt-5">
              <InputField label="Email Address" value={user?.email} disabled />
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Email cannot be changed directly.
              </p>
            </div>
          </SettingsCard>
        </div>

        {/* ================= NOTIFICATIONS ================= */}
        <SettingsCard
          icon={<FaBell />}
          title="Notifications"
          isEditing={editNotification}
          setIsEditing={setEditNotification}
        >
          <div className="space-y-5">
            {/* EMAIL NOTIFICATION */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-left text-gray-900 dark:text-white">
                  Email Notifications
                </p>
                <p className="text-sm text-left text-gray-500 dark:text-slate-400">
                  Receive monthly summaries
                </p>
              </div>

              <input
                type="checkbox"
                checked={notifications.email}
                disabled={!editNotification}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    email: !notifications.email,
                  })
                }
                className="w-5 h-5 accent-orange-500"
              />
            </div>

            {/* SECURITY ALERT */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-left text-gray-900 dark:text-white">
                  Security Alerts
                </p>
                <p className="text-sm text-left text-gray-500 dark:text-slate-400">
                  New login detection
                </p>
              </div>

              <input
                type="checkbox"
                checked={notifications.security}
                disabled={!editNotification}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    security: !notifications.security,
                  })
                }
                className="w-5 h-5 accent-orange-500"
              />
            </div>
          </div>
        </SettingsCard>
      </div>
      <div className="mt-5">
       <SecurityCard/>
      </div>
      <div className="mt-5">
        <UsageOverviewCard/>
      </div>
    </div>
  );
}
