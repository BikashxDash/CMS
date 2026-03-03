"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function ActivatePage() {
  const [form, setForm] = useState({
    userId: "",
    email: "",
    day: "",
    month: "",
    year: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formattedDOB = `${form.year}-${form.month.padStart(2, "0")}-${form.day.padStart(2, "0")}`;

    if (form.password !== form.confirmPassword) {
      return setMessage("Passwords do not match");
    }

    // Basic DOB validation
    const day = parseInt(form.day);
    const month = parseInt(form.month);
    const year = parseInt(form.year);

    if (day > 31 || day < 1) {
      return setMessage("Invalid day");
    }

    if (month > 12 || month < 1) {
      return setMessage("Invalid month");
    }

    if (year < 1900 || year > new Date().getFullYear()) {
      return setMessage("Invalid year");
    }

    // Age validation (minimum 16 years)
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 16) {
      return setMessage("Minimum age requirement is 16 years");
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/activate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: form.userId,
            email: form.email,
            dob: formattedDOB,
            password: form.password,
          }),
        }
      );

      const data = await res.json();
      setMessage(data.message);
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6
                     bg-gradient-to-br 
                     from-neutral-100 via-neutral-200 to-neutral-100
                     dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">

      <div className="w-full max-w-md 
                      rounded-3xl p-10
                      bg-white/70 dark:bg-neutral-900/80
                      backdrop-blur-xl
                      shadow-2xl
                      border border-neutral-200 dark:border-neutral-700">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/new clg logo.png"
            alt="College Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-center text-neutral-800 dark:text-white">
          Activate Account
        </h1>

        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-2 mb-8">
          Enter your registered details to activate.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <input
            name="userId"
            placeholder="User ID"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl
                       bg-neutral-100 dark:bg-neutral-800
                       border border-neutral-200 dark:border-neutral-700
                       focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"/>

          <input
            name="email"
            type="email"
            placeholder="Registered Email"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl
                       bg-neutral-100 dark:bg-neutral-800
                       border border-neutral-200 dark:border-neutral-700
                       focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"/>

          <div className="flex gap-3 mb-4">
            <input
              name="day"
              type="text"
              maxLength={2}
              placeholder="DD"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setForm({ ...form, day: value });
                if (value.length === 2) {
                  document.getElementById("month")?.focus();
                }
              }}
              className="w-1/3 px-4 py-3 rounded-xl
                        bg-neutral-100 dark:bg-neutral-800
                        border border-neutral-200 dark:border-neutral-700
                        text-center focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"/>

            <input
              id="month"
              name="month"
              type="text"
              maxLength={2}
              placeholder="MM"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setForm({ ...form, month: value });
                if (value.length === 2) {
                  document.getElementById("year")?.focus();
                }
              }}
              className="w-1/3 px-4 py-3 rounded-xl
                        bg-neutral-100 dark:bg-neutral-800
                        border border-neutral-200 dark:border-neutral-700
                        text-center focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"/>

            <input
              id="year"
              name="year"
              type="text"
              maxLength={4}
              placeholder="YYYY"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                setForm({ ...form, year: value });
              }}
              className="w-1/3 px-4 py-3 rounded-xl
                        bg-neutral-100 dark:bg-neutral-800
                        border border-neutral-200 dark:border-neutral-700
                        text-center focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"/>
          </div>

          <div className="relative mb-4">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl
                        bg-neutral-100 dark:bg-neutral-800
                        border border-neutral-200 dark:border-neutral-700
                        pr-12 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 "/>

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 transition-opacity duration-200">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
          </div>

          <div className="relative mb-6">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl
                        bg-neutral-100 dark:bg-neutral-800
                        border border-neutral-200 dark:border-neutral-700
                        pr-12 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"/>

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 transition-opacity duration-200">
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl 
                       bg-neutral-900 text-white
                       dark:bg-white dark:text-black
                       font-semibold
                       transition hover:opacity-90">Activate</button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-300">
            {message}
          </p>
        )}

        {/* Sign In Link */}
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
          Already activated?{" "}
          <Link
            href="/auth/login"
            className="underline"
          >Sign In</Link>
        </p>

      </div>
    </main>
  );
}