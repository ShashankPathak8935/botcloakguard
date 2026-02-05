import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createApiFunction } from "../api/ApiFunction";
import { forgotPassword } from "../api/Apis";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "../components/toast/toast";
import { EnvelopeIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function ResetPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Function
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) {
      alert("Email is required");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await createApiFunction("post", forgotPassword, null, {
        email: formData.email,
      });
      localStorage.setItem("resetEmail", formData.email);

      showSuccessToast(res?.data?.message || "OTP Sent");
      navigate("/update-password");
    } catch (err) {
      showErrorToast(
        err.response?.data?.message ||
          "Something went wrong! Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm px-8 py-10">
          {/* ================= HEADING ================= */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Forgot password?
          </h1>
          <p className="text-gray-500 text-sm mb-8 text-center">
            No worries. Enter your email and we’ll send Otp on your registered
            email.
          </p>

          {/* ================= FORM ================= */}
          <form onSubmit={onSubmit}>
            {/* ================= EMAIL ================= */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  onInvalid={(e) =>
                    e.target.setCustomValidity("Please enter a valid email")
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-gray-300 text-sm
              text-gray-800 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>

            {/* ================= SUBMIT BUTTON ================= */}
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full h-11 rounded-lg text-white font-medium transition
          flex items-center justify-center gap-2 mb-6
          ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
          }`}
              style={{ backgroundColor: "#EA454C" }}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>

          {/* ================= BACK TO LOGIN ================= */}
          <Link
            to="/signin"
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </>
  );
}
