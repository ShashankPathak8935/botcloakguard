import { useState } from "react";
import { Search, Link2, CheckCircle2, Loader2 } from "lucide-react";
import axios from "axios";

export default function RedirectChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

const handleCheck = async () => {
  if (!url) return;

  setLoading(true);

  // simulate API delay
  setTimeout(() => {
    const dummyResponse = {
      finalUrl: "https://final-destination.com/home",
      redirects: [
        {
          url: "http://example.com",
          status: 301,
          httpVersion: "HTTP/1.1",
          type: "Permanent",
        },
        {
          url: "https://example.com",
          status: 302,
          httpVersion: "HTTP/2",
          type: "Temporary",
        },
        {
          url: "https://www.example.com/home",
          status: 200,
          httpVersion: "HTTP/2",
          type: "Permanent",
        },
      ],
    };

    setResult(dummyResponse);
    setLoading(false);
  }, 1200); // fake loading time
};

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-6">

      {/* ===== HEADER ===== */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-md p-6 border border-gray-200 dark:border-white/10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Redirect Inspector
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Analyze how your link behaves across redirects and verify the
          destination path, response codes, and redirect performance.
        </p>

        {/* ===== INPUT ===== */}
        <div className="flex gap-3 mt-5">
          <div className="relative flex-1">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL (https://example.com)"
              className="
                w-full pl-9 pr-3 py-2.5 rounded-lg
                border border-gray-300
                dark:border-white/10
                bg-gray-50 dark:bg-[#0f172a]
                text-gray-800 dark:text-white
                focus:ring-2 focus:ring-blue-500 outline-none
              "
            />
          </div>

          <button
            onClick={handleCheck}
            className="
              flex items-center gap-2 px-5
              bg-blue-600 hover:bg-blue-700
              text-white rounded-lg cursor-pointer
              transition
            "
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            Check
          </button>
        </div>
      </div>

      {/* ===== RESULTS ===== */}
      {result && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-md p-6 border border-gray-200 dark:border-white/10">

          {/* FINAL STATUS */}
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="text-green-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Final Destination:
            </span>

            <a
              href={result.finalUrl}
              target="_blank"
              className="text-blue-600 dark:text-blue-400 font-medium break-all"
            >
              {result.finalUrl}
            </a>
          </div>

          {/* REDIRECT FLOW (Different UI from image) */}
          <div className="space-y-4">

            {result.redirects.map((item, index) => (
              <div
                key={index}
                className="
                  flex items-start gap-4 p-4 rounded-xl
                  bg-gray-50 dark:bg-[#0f172a]
                  border border-gray-200 dark:border-white/10
                "
              >
                {/* Step circle */}
                <div className="
                  w-8 h-8 flex items-center justify-center
                  rounded-full bg-blue-600 text-white text-xs font-bold
                ">
                  {index + 1}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white break-all">
                    {item.url}
                  </p>

                  <div className="flex gap-4 mt-2 text-xs text-gray-600 dark:text-gray-400">
                    <span>
                      Status:
                      <span className="ml-1 font-semibold text-blue-600">
                        {item.status}
                      </span>
                    </span>

                    <span>{item.httpVersion}</span>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px]
                        ${
                          item.type === "Permanent"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      )}
      {/* ===== WHAT WE OFFER (CLASSY VERSION) ===== */}
<div className="grid gap-6 md:grid-cols-3 mt-8">

  {/* CARD 1 */}
  <div
    className="
      group relative overflow-hidden rounded-2xl p-6
      bg-white dark:bg-[#0f172a]
      border border-gray-200 dark:border-white/10
      shadow-sm hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-1
    "
  >
    {/* glow effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-500/10 to-transparent"></div>

    <div className="relative z-10 space-y-4">
      <div className="w-11 h-11 flex items-center justify-center rounded-xl
          bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
        🔗
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Smart Redirect Analysis
      </h3>

      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        Visualize how links travel across redirect chains and understand
        response behavior with detailed request insights and timing flow.
      </p>
    </div>
  </div>

  {/* CARD 2 */}
  <div
    className="
      group relative overflow-hidden rounded-2xl p-6
      bg-white dark:bg-[#0f172a]
      border border-gray-200 dark:border-white/10
      shadow-sm hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-1
    "
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-purple-500/10 to-transparent"></div>

    <div className="relative z-10 space-y-4">
      <div className="w-11 h-11 flex items-center justify-center rounded-xl
          bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
        ⚙️
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Intelligent Filtering
      </h3>

      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        Quickly isolate redirect types, status responses, and individual
        requests to focus only on the traffic behavior that matters.
      </p>
    </div>
  </div>

  {/* CARD 3 */}
  <div
    className="
      group relative overflow-hidden rounded-2xl p-6
      bg-white dark:bg-[#0f172a]
      border border-gray-200 dark:border-white/10
      shadow-sm hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-1
    "
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-emerald-500/10 to-transparent"></div>

    <div className="relative z-10 space-y-4">
      <div className="w-11 h-11 flex items-center justify-center rounded-xl
          bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        ⏱️
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Redirect Performance
      </h3>

      <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        Measure redirect delays and understand how latency impacts loading
        speed and user experience across different networks.
      </p>
    </div>
  </div>

</div>
    </div>
  );
}