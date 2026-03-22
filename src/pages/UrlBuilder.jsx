import { useState } from "react";
import { Copy } from "lucide-react";
import FloatingInput from "./FloatingInput";

export default function UrlBuilder() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");

  const generatedUrl =
    url && source && medium && campaign
      ? `${url}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
      : "Enter required fields to generate URL";

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Campaign URL Builder
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Create optimized tracking links for marketing campaigns.
        </p>
      </div>

      {/* Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* ================= FORM CARD ================= */}
        <div
          className="
            rounded-2xl p-6
            bg-white dark:bg-[#020617]
            border border-gray-200 dark:border-white/10
            shadow-lg dark:shadow-none
          "
        >
          <h2 className="font-semibold mb-6 text-gray-800 dark:text-white">
            Campaign Details
          </h2>

          <div className="space-y-5">
            <FloatingInput
              label="Website URL"
              placeholder="https://example.com"
              value={url}
              setValue={setUrl}
            />

            <FloatingInput
              label="Campaign Source"
              placeholder="google, newsletter"
              value={source}
              setValue={setSource}
            />

            <FloatingInput
              label="Marketing Medium"
              placeholder="cpc, banner, email"
              value={medium}
              setValue={setMedium}
            />

            <FloatingInput
              label="Campaign Name"
              placeholder="spring_sale"
              value={campaign}
              setValue={setCampaign}
            />
          </div>
        </div>

        {/* ================= PREVIEW CARD ================= */}
        <div
          className="
            rounded-2xl p-6
            bg-gradient-to-br
            from-blue-50 to-indigo-50
            dark:from-[#020617] dark:to-[#020617]
            border border-blue-100 dark:border-white/10
            shadow-xl
          "
        >
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">
            Live Campaign URL
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Share this generated link in your marketing channels.
          </p>

          {/* URL BOX */}
          <div
            className="
              flex items-center justify-between
              rounded-xl p-4
              bg-white dark:bg-[#030712]
              border border-gray-200 dark:border-white/10
            "
          >
            <span className="text-sm text-gray-700 dark:text-gray-300 break-all">
              {generatedUrl}
            </span>

            <button
              className="
                ml-4 flex items-center gap-2
                px-3 py-2 rounded-lg
                bg-blue-600 hover:bg-blue-700
                text-white text-sm
                transition
              "
              onClick={() =>
                navigator.clipboard.writeText(generatedUrl)
              }
            >
              <Copy size={16} />
              Copy
            </button>
          </div>

          {/* Shorten */}
          <button
            className="
              mt-6 w-full
              rounded-xl py-3
              font-medium
              bg-gradient-to-r
              from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white
              shadow-lg hover:shadow-xl
              transition
            "
          >
            Shorten Link
          </button>
        </div>
      </div>
    </div>
  );
}