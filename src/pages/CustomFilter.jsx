import React from "react";
import { FaPlus, FaSyncAlt, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CustomFilter() {

  const navigate = useNavigate();
  // ----- STATIC DATA -----
  const filters = [
    {
      id: "CF-1021",
      name: "High Traffic Bots",
      createdOn: "12 Mar 2026",
    },
    {
      id: "CF-1022",
      name: "Country Block Filter",
      createdOn: "15 Mar 2026",
    },
    {
      id: "CF-1023",
      name: "Suspicious Requests",
      createdOn: "18 Mar 2026",
    },
  ];

  return (
    <div
      className="
        w-full min-h-screen px-6 py-10
        bg-gray-50 dark:bg-slate-900
        border border-gray-200 dark:border-slate-700
        transition-colors
      "
    >
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Custom Filters
        </h1>

        <p className="text-gray-500 dark:text-slate-400 mt-2">
          Manage your intelligent filtering rules. Create, update or remove
          custom campaign filters anytime.
        </p>
      </div>

      {/* ================= ACTION BAR ================= */}
      <div
        className="
          flex flex-wrap items-center justify-between gap-4
          bg-white dark:bg-slate-800
          border border-gray-200 dark:border-slate-700
          rounded-2xl
          p-5
          shadow-sm
          mb-8
        "
      >
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Filter Management
          </h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Create new filters or refresh your existing rules.
          </p>
        </div>

        <div className="flex gap-3">
          {/* CREATE BUTTON */}
          <button
          onClick={() => navigate("/Dashboard/create-custom-filter")}
            className="
              flex items-center gap-2
              px-4 py-2 rounded-xl cursor-pointer
              text-white font-medium
              bg-gradient-to-r from-orange-500 to-red-500
              hover:scale-[1.03]
              active:scale-[0.97]
              transition
              shadow-md
            "
          >
            <FaPlus />
            Create Filter
          </button>

          {/* REFRESH BUTTON */}
          <button
            className="
              flex items-center gap-2
              px-4 py-2 rounded-xl cursor-pointer
              border border-gray-300 dark:border-slate-600
              text-gray-700 dark:text-slate-200
              bg-gray-100 dark:bg-slate-700
              hover:bg-gray-200 dark:hover:bg-slate-600
              transition
            "
          >
            <FaSyncAlt />
            Refresh
          </button>
        </div>
      </div>

      {/* ================= TABLE CARD ================= */}
      <div
        className="
          rounded-2xl overflow-hidden
          border border-gray-200 dark:border-slate-700
          bg-white dark:bg-slate-800
          shadow-sm
        "
      >
        <table className="w-full text-sm">
          {/* TABLE HEADER */}
          <thead
            className="
              bg-gray-100 dark:bg-slate-700
              text-gray-700 dark:text-slate-200
            "
          >
            <tr className="text-left">
              <th className="px-6 py-4">Filter ID</th>
              <th className="px-6 py-4">Filter Name</th>
              <th className="px-6 py-4">Created On</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {filters.map((filter, index) => (
              <tr
                key={filter.id}
                className="
                  border-t border-gray-200 dark:border-slate-700
                  hover:bg-gray-50 dark:hover:bg-slate-700/40
                  transition
                "
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {filter.id}
                </td>

                <td className="px-6 py-4 text-gray-600 dark:text-slate-300">
                  {filter.name}
                </td>

                <td className="px-6 py-4 text-gray-600 dark:text-slate-300">
                  {filter.createdOn}
                </td>

                {/* ACTIONS */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      className="
                        p-2 rounded-lg
                        bg-blue-50 dark:bg-blue-900/30
                        text-blue-600 dark:text-blue-400
                        hover:scale-110 transition
                      "
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="
                        p-2 rounded-lg
                        bg-red-50 dark:bg-red-900/30
                        text-red-600 dark:text-red-400
                        hover:scale-110 transition
                      "
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
