import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  KeyIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { updatePassword } from "../api/Apis";
import { createApiFunction } from "../api/ApiFunction";
import { showErrorToast, showSuccessToast } from "../components/toast/toast";
// import {
//   LockClosedIcon,
//   EyeIcon,
//   EyeSlashIcon,
//   ArrowLeftIcon,
// } from "@heroicons/react/24/solid";

export default function UpdatePassword() {
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  // Strong Password Regex
  const strongPasswordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!email) {
      showErrorToast("Session expired. Please try again.");
      navigate("/reset-password");
    }
  }, []);

  // Submit Function
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!formData.otp.trim()) {
      showErrorToast("OTP is required");
      return;
    }

    // 🔥 OTP must be exactly 4 digits
    if (formData.otp.length !== 6) {
      showErrorToast("OTP must be 6 digits");
      return;
    }

    if (!formData.otp.trim()) {
      showErrorToast("OTP is required");
      return;
    }

    if (!formData.newPassword || !formData.confirmPassword) {
      showErrorToast("All fields are required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showErrorToast("Passwords do not match!");
      return;
    }

    if (!strongPasswordRegex.test(formData.newPassword)) {
      showErrorToast(
        "Password must be at least 8 chars, include 1 uppercase letter, 1 number & 1 special character.",
      );
      return;
    }
    try {
      setIsSubmitting(true);

      const res = await createApiFunction("post", updatePassword, null, {
        email: email,
        otp: formData.otp,
        password: formData.newPassword,
      });

      showSuccessToast(res?.data?.message || "Password updated successfully!");
      localStorage.removeItem("resetEmail");

      setTimeout(() => {
        navigate("/signin");
      }, 800);
    } catch (err) {
      showErrorToast(err.response?.data?.message || "Something went wrong!");
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
            Update your password
          </h1>
          <p className="text-gray-500 text-sm mb-8 text-center">
            Enter the OTP you received and set your new password.
          </p>

          <form onSubmit={onSubmit}>
            {/* ================= OTP ================= */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter OTP
              </label>

              <div className="relative">
                <KeyIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,6}$/.test(value)) {
                      setFormData({ ...formData, otp: value });
                    }
                  }}
                  required
                  maxLength={6}
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-gray-300 text-sm
              text-gray-800 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
            </div>

            {/* ================= NEW PASSWORD ================= */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>

              <div className="relative">
                <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  className="w-full h-11 pl-10 pr-10 rounded-lg border border-gray-300 text-sm
              text-gray-800 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />

                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </span>
              </div>
            </div>

            {/* ================= CONFIRM PASSWORD ================= */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>

              <div className="relative">
                <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full h-11 pl-10 pr-10 rounded-lg border border-gray-300 text-sm
              text-gray-800 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />

                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </span>
              </div>
            </div>

            {/* ================= SUBMIT ================= */}
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full h-11 rounded-lg text-white font-medium transition
          flex items-center justify-center
          ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
          }`}
              style={{ backgroundColor: "#EA454C" }}
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>

            {/* ================= BACK ================= */}
            <p className="text-sm text-gray-600 mt-6 text-center">
              Go back to login —{" "}
              <Link
                to="/signin"
                className="text-red-500 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
