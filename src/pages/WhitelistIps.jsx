import { useState } from "react";
import { ShieldCheck, CheckCircle, AlertTriangle, Plus, X } from "lucide-react";
import { WhitelistCards } from "../pages/WhitelistCards";
import { WhitelistModal } from "../pages/WhitelistModal";

export default function WhitelistIps() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-[#020617] transition-colors">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
            <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Whitelists
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Allow specific IP addresses and User Agents
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-green-600 hover:bg-green-700 text-white shadow-md transition"
        >
          <Plus size={18} />
          Create Whitelist
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <WhitelistCards
          title="Total Whitelists"
          value="0"
          icon={<ShieldCheck />}
          color="green"
        />

        <WhitelistCards
          title="Active Whitelists"
          value="0"
          icon={<CheckCircle />}
          color="emerald"
        />

        <WhitelistCards
          title="Total Items"
          value="0"
          icon={<AlertTriangle />}
          color="purple"
        />
      </div>

      {/* EMPTY STATE */}
      <div
        className="flex flex-col items-center justify-center text-center py-20
        border border-gray-200 dark:border-gray-800
        rounded-xl bg-white dark:bg-[#020617]"
      >
        <ShieldCheck className="w-12 h-12 text-gray-400 mb-4" />

        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          No whitelists yet
        </h3>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Create your first whitelist to start allowing traffic
        </p>

        <button
          onClick={() => setOpenModal(true)}
          className="mt-6 flex items-center gap-2 px-5 py-2 rounded-lg
          bg-green-600 hover:bg-green-700 text-white transition"
        >
          <Plus size={18} />
          Create Whitelist
        </button>
      </div>

      {/* MODAL */}
      {openModal && <WhitelistModal close={() => setOpenModal(false)} />}
    </div>
  );
}
