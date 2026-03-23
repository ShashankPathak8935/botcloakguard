import React, { useState } from "react";
import { FaHeadset, FaBolt, FaClock, FaCheckCircle } from "react-icons/fa";


  const labelClass =
    "block mb-2 text-sm font-medium text-gray-700 dark:text-slate-300";

  const inputClass = `
  w-full
  px-4 py-2.5
  rounded-xl
  text-sm
  border
  border-gray-300 dark:border-slate-600
  bg-white dark:bg-slate-900
  text-gray-900 dark:text-white
  placeholder-gray-400 dark:placeholder-gray-500
  outline-none
  focus:border-orange-500
  focus:ring-2 focus:ring-orange-500/30
  transition-all duration-200
`;

export function SupportTicketsView() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    priority: "Medium",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("https://formsubmit.co/ffedefd76b08c830449f6c87dba9206a", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: "New Support Ticket",
          _template: "table",
          _captcha: "false",
        }),
      });

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        subject: "",
        category: "",
        priority: "Medium",
        message: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert("Failed to submit ticket.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div
      className="
    w-full min-h-screen
    px-6 py-10

    bg-gray-50 dark:bg-slate-900

    border
    border-gray-200 dark:border-slate-700

    rounded-2xl
    shadow-sm dark:shadow-none

    transition-all duration-300
  "
    >
      {/* PAGE HEADER */}
      <div className="mb-10">
        <h1
          className="
    text-3xl font-semibold
    text-gray-900 dark:text-white
    flex items-center justify-center gap-3
    text-center
  "
        >
          <FaHeadset className="text-orange-500" />
          Support Center
        </h1>
        <p className="text-gray-500 dark:text-slate-400 mt-2">
          Need help? Submit a ticket and our team will respond quickly.
        </p>
      </div>

      {/* SUCCESS MESSAGE */}
      {success && (
        <div className="mb-6 rounded-xl border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4">
          ✅ Ticket submitted successfully. Our support team will contact you
          soon.
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* LEFT INFO PANEL */}
        <div
          className="
          lg:col-span-4
          rounded-2xl
          p-7
          bg-gradient-to-br
          from-orange-500 via-pink-500 to-red-500
          text-white
          shadow-xl
        "
        >
          <h2 className="text-xl font-semibold mb-6">Why contact support?</h2>

          <InfoItem
            icon={<FaBolt />}
            title="Fast Response"
            desc="Average response time under 24 hours."
          />

          <InfoItem
            icon={<FaClock />}
            title="24/7 Monitoring"
            desc="We monitor issues around the clock."
          />

          <InfoItem
            icon={<FaCheckCircle />}
            title="Expert Assistance"
            desc="Our engineers help resolve problems quickly."
          />
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="
            lg:col-span-8
            rounded-2xl
            border border-gray-200 dark:border-slate-700
            bg-white dark:bg-slate-800
            p-8
            shadow-sm
            space-y-6
          "
        >
          {/* GRID INPUTS */}
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />

          {/* CATEGORY + PRIORITY */}
          <div className="grid md:grid-cols-2 gap-6">
            <Select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              options={[
                "Billing",
                "Subscription",
                "Technical Issue",
                "Account",
                "Other",
              ]}
            />

            <Select
              label="Priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              options={["Low", "Medium", "High"]}
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className={labelClass}>Message</label>

            <textarea
              rows={5}
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="
              w-full md:w-auto
              px-8 py-3
              rounded-xl
              font-semibold
              text-white
              bg-gradient-to-r from-orange-500 to-red-500
              hover:scale-[1.02]
              active:scale-[0.98]
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className={labelClass}>{label}</label>

    <input
      type={type}
      name={name}
      required
      value={value}
      onChange={onChange}
      className={inputClass}
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className={labelClass}>{label}</label>

    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className={`${inputClass} cursor-pointer`}
    >
      <option value="">Select</option>

      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const InfoItem = ({ icon, title, desc }) => (
  <div className="flex gap-4 mb-6 items-start">
    <div className="text-xl mt-1 opacity-90">{icon}</div>

    <div>
      <p className="font-semibold text-left text-white">{title}</p>
      <p className="text-sm text-white/80">{desc}</p>
    </div>
  </div>
);
