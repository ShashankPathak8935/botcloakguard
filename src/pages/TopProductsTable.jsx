import React from "react";

const products = [
  {
    id: 1,
    name: "Shanty Cotton Seat",
    margin: "$981.00",
    sold: "29,536",
    stock: "In Stock",
  },
  {
    id: 2,
    name: "Practical Soft Couch",
    margin: "$199.00",
    sold: "27,700",
    stock: "In Stock",
  },
  {
    id: 3,
    name: "Rustic Rubber Chair",
    margin: "$609.00",
    sold: "21,778",
    stock: "Low Stock",
  },
  {
    id: 4,
    name: "Ergonomic Frozen Bacon",
    margin: "$923.00",
    sold: "20,272",
    stock: "In Stock",
  },
  {
    id: 5,
    name: "Unbranded Metal Sofa",
    margin: "$119.00",
    sold: "17,374",
    stock: "In Stock",
  },
  {
    id: 6,
    name: "Intelligent Soft Sofa",
    margin: "$595.00",
    sold: "14,374",
    stock: "Low Stock",
  },
];

export default function TopProductsTable() {
  return (
    <div
      className="
      rounded-2xl p-6 transition
      bg-white border border-gray-200 text-gray-900
      dark:bg-[#0F111A] dark:border-white/10 dark:text-gray-100
    "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Top products</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Detailed information about the products
          </p>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="
              text-sm px-4 py-2 rounded-lg border transition
              bg-gray-100 border-gray-300 text-gray-900
              dark:bg-[#1A1D29] dark:border-white/10 dark:text-gray-200
              focus:outline-none focus:ring-1 focus:ring-emerald-500
            "
          />
          <div className="text-gray-500 dark:text-gray-400 text-xl cursor-pointer">
            •••
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="
        overflow-hidden rounded-xl border transition
        border-gray-200
        dark:border-white/10
      "
      >
        <table className="w-full text-sm">
          <thead
            className="
            bg-gray-100 text-gray-600
            dark:bg-[#131620] dark:text-gray-400
          "
          >
            <tr className="text-left">
              <th className="p-4">
                <input type="checkbox" className="accent-emerald-500" />
              </th>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Vendors</th>
              <th className="p-4 font-medium">Margin</th>
              <th className="p-4 font-medium">Sold</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4"></th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr
                key={item.id}
                className="
                border-t transition
                border-gray-200 hover:bg-gray-50
                dark:border-white/10 dark:hover:bg-[#161A24]
              "
              >
                <td className="p-4">
                  <input type="checkbox" className="accent-emerald-500" />
                </td>

                <td className="p-4 font-medium">{item.name}</td>

                {/* Vendors */}
                <td className="p-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0F111A]" />
                    <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white dark:border-[#0F111A]" />
                    <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white dark:border-[#0F111A]" />
                  </div>
                </td>

                <td className="p-4 text-gray-700 dark:text-gray-300">
                  {item.margin}
                </td>

                <td className="p-4 text-gray-700 dark:text-gray-300">
                  {item.sold}
                </td>

                {/* STOCK BADGE */}
                <td className="p-4">
                  {item.stock === "In Stock" ? (
                    <span className="px-3 py-1 text-xs rounded-full border bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-600">
                      In Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs rounded-full border bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/40 dark:text-orange-400 dark:border-orange-600">
                      Low Stock
                    </span>
                  )}
                </td>

                <td className="p-4 text-gray-500 dark:text-gray-400 cursor-pointer">
                  •••
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600 dark:text-gray-400">
        <p>
          Showing <span className="font-semibold">1–6</span> out of{" "}
          <span className="font-semibold">12</span> items
        </p>

        <div className="flex gap-4">
          <button className="hover:text-black dark:hover:text-white transition">
            Previous
          </button>
          <button className="text-emerald-600 dark:text-emerald-400">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
