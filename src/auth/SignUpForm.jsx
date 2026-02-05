import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../components/toast/toast";
import { createApiFunction } from "../api/ApiFunction";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

import { signupApi } from "../api/Apis";

// ✅ Validation Schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/\d/, "At least one number")
    .matches(/[@$!%*?&#]/, "At least one special character"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // ✅ Submit
  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);
    const payload = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await createApiFunction(
        "post",
        signupApi,
        null,
        payload,
      );
      /**
       * EXPECTED RESPONSE:
       * {
       *   success: true,
       *   message: "Verification email sent"
       * }
       */

      if (response?.data?.success === true) {
        showSuccessToast("Enter Otp to Verify your mail!");

        localStorage.setItem(
          "signup_data",
          JSON.stringify({
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password,
          }),
        );

        reset();
        navigate("/verify-otp");
      } else {
        showErrorToast(
          response?.message || "Something went wrong. Please try again.",
        );
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed. Please try again later.";
      showErrorToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#F8F8F8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-1 text-center">
          Create your account
        </h1>
        <p className="text-gray-500 mb-2 text-center">
          Join us today. It takes only a few steps.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                {...register("firstName")}
                type="text"
                placeholder="Enter first name"
                className={`w-full h-11 pl-10 pr-3 rounded-lg text-gray-800 border text-sm focus:outline-none focus:ring-2 focus:ring-red-200 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <UserIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                {...register("lastName")}
                type="text"
                placeholder="Enter last name"
                className={`w-full h-11 pl-10 pr-3 rounded-lg text-gray-800 border text-sm focus:outline-none focus:ring-2 focus:ring-red-200 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                autoComplete="off"
                className={`w-full h-11 pl-10 pr-3 text-gray-800 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-200 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                autoComplete="new-password"
                className={`w-full h-11 pl-10 pr-10 text-gray-800 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-red-200 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                {...register("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat password"
                className={`w-full h-11 pl-10 pr-10 rounded-lg text-gray-800 border text-sm focus:outline-none focus:ring-2 focus:ring-red-200 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirm ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              {...register("terms")}
              type="checkbox"
              className="mt-1 w-4 h-4 text-red-500 border-gray-300 rounded"
            />
            <p className="text-sm text-gray-700">
              I agree to the <span className="text-red-500">Terms</span> &{" "}
              <span className="text-red-500">Privacy Policy</span>
            </p>
          </div>
          {errors.terms && (
            <p className="text-xs text-red-500">{errors.terms.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-11 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-[#EA454C] hover:opacity-90"
            }`}
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

          {/* Login */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
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
  );
}
