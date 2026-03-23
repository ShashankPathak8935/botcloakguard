import {
  FaCheckCircle,
  FaCreditCard,
  FaCalendarAlt,
  FaRocket,
  FaDatabase,
  FaServer,
} from "react-icons/fa";

export default function SubscriptionView() {
  // STATIC DATA (replace later with API)
  const plan = {
    name: "Pro Plan",
    price: "$19/month",
    billing: "Monthly",
    status: "Active",
    startDate: "12 Feb 2026",
    nextPayment: "12 Apr 2026",
    orderDate: "12 Feb 2026",
    autoRenew: true,
  };

  return (
    <div className="space-y-6">
      {/* ================= PLAN STATUS ================= */}
      <div
        className="
        rounded-2xl border
        border-gray-200 dark:border-slate-700
        bg-white dark:bg-slate-800
        p-6 shadow-sm transition
      "
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Current Plan
            </h2>

            <div className="flex items-center gap-3 mt-2">
              <FaRocket className="text-orange-500" />
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {plan.name}
              </p>

              <span
                className="
                text-xs px-2 py-1 rounded-full
                bg-green-100 dark:bg-green-900/30
                text-green-600 dark:text-green-400
              "
              >
                {plan.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
              {plan.price} • {plan.billing} billing
            </p>
          </div>

          <button
            className="
            px-4 py-2 rounded-lg text-sm font-medium
            bg-orange-600 hover:bg-orange-700
            text-white transition
          "
          >
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* ================= USAGE ================= */}
      <div
        className="
        rounded-2xl border
        border-gray-200 dark:border-slate-700
        bg-white dark:bg-slate-800
        p-6
      "
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-5">
          Usage Summary
        </h2>

        <UsageRow
          icon={<FaServer />}
          title="API Requests"
          value="12,400 / 20,000"
          percent={62}
        />

        <UsageRow
          icon={<FaDatabase />}
          title="Storage"
          value="8 GB / 15 GB"
          percent={55}
        />
      </div>

      {/* ================= BILLING ================= */}
      <div
        className="
        rounded-2xl border
        border-gray-200 dark:border-slate-700
        bg-white dark:bg-slate-800
        p-6
      "
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Billing Details
        </h2>

        <InfoRow
          icon={<FaCreditCard />}
          label="Next Payment"
          value={plan.nextPayment}
        />
        <InfoRow
          icon={<FaCheckCircle />}
          label="Auto Renewal"
          value={plan.autoRenew ? "Enabled" : "Disabled"}
        />
      </div>

      {/* ================= TIMELINE ================= */}
      <div
        className="
        rounded-2xl border
        border-gray-200 dark:border-slate-700
        bg-white dark:bg-slate-800
        p-6
      "
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Subscription Timeline
        </h2>

        <InfoRow
          icon={<FaCalendarAlt />}
          label="Order Date"
          value={plan.orderDate}
        />
        <InfoRow
          icon={<FaCalendarAlt />}
          label="Start Date"
          value={plan.startDate}
        />
        <InfoRow
          icon={<FaCalendarAlt />}
          label="Next Renewal"
          value={plan.nextPayment}
        />
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const InfoRow = ({ icon, label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-slate-700 last:border-none">
    <div className="flex items-center gap-3 text-gray-600 dark:text-slate-300">
      {icon}
      {label}
    </div>

    <span className="font-medium text-gray-900 dark:text-white">{value}</span>
  </div>
);

const UsageRow = ({ icon, title, value, percent }) => (
  <div className="mb-5">
    <div className="flex justify-between text-sm mb-2">
      <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
        {icon}
        {title}
      </div>

      <span className="text-gray-600 dark:text-slate-400">{value}</span>
    </div>

    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
      <div
        style={{ width: `${percent}%` }}
        className="h-full bg-gradient-to-r from-orange-500 to-pink-500"
      />
    </div>
  </div>
);
