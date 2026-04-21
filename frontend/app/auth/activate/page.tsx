"use client";

/*
========================================
ACTIVATE ACCOUNT PAGE
----------------------------------------
This page allows a user (student/staff)
to activate their account by providing:

- User ID
- Registered Email
- Date of Birth
- New Password

Flow:
User fills form → Frontend validates data
→ API request sent to backend
→ Backend verifies user
→ Password stored → Account activated
========================================
*/

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function ActivatePage() {

  /*
  ========================================
  FORM STATE
  Stores all input values from form
  ========================================
  */
  const [form, setForm] = useState({
    userId: "",
    email: "",
    day: "",
    month: "",
    year: "",
    password: "",
    confirmPassword: ""
  });

  // message shown to user (error / success)
  const [message, setMessage] = useState("");

  // password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  /*
  ========================================
  HANDLE INPUT CHANGE
  Updates form state when user types
  ========================================
  */
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  /*
  ========================================
  FORM SUBMIT HANDLER
  Runs when user clicks Activate button
  ========================================
  */
  const handleSubmit = async (e: any) => {

    e.preventDefault(); // prevent page refresh

    /*
    Convert DOB into backend format
    Backend expects: YYYY-MM-DD
    */
    const formattedDOB =
      `${form.year}-${form.month.padStart(2, "0")}-${form.day.padStart(2, "0")}`;


    /*
    ========================================
    PASSWORD MATCH VALIDATION
    ========================================
    */
    if (form.password !== form.confirmPassword) {
      return setMessage("Passwords do not match");
    }


    /*
    ========================================
    BASIC DOB VALIDATION
    ========================================
    */
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


    /*
    ========================================
    AGE VALIDATION
    Minimum age = 16 years
    ========================================
    */
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


    /*
    ========================================
    API CALL → ACTIVATE ACCOUNT
    ========================================
    */
    try {

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(
        `${apiUrl}/api/auth/activate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: form.userId,
            email: form.email,
            dob: formattedDOB,
            password: form.password,
          }),
        }
      );

      const data = await res.json();

      // Show backend response message
      setMessage(data.message);

    } catch {

      // If server fails
      setMessage("Something went wrong");

    }
  };


  /*
  ========================================
  UI SECTION
  ========================================
  */
  return (

    <main className="min-h-screen flex items-center justify-center px-6
                     bg-gradient-to-br 
                     from-neutral-100 via-neutral-200 to-neutral-100
                     dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">

      {/* Activation Card */}
      <div className="w-full max-w-md 
                      rounded-3xl p-10
                      bg-white/70 dark:bg-neutral-900/80
                      backdrop-blur-xl
                      shadow-2xl
                      border border-neutral-200 dark:border-neutral-700">


        {/* College Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/new clg logo.png"
            alt="College Logo"
            className="h-12 w-auto"
          />
        </div>


        {/* Page Title */}
        <h1 className="text-3xl font-semibold text-center text-neutral-800 dark:text-white">
          Activate Account
        </h1>

        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-2 mb-8">
          Enter your registered details to activate.
        </p>


        {/* ============================= */}
        {/* Activation Form */}
        {/* ============================= */}
        <form onSubmit={handleSubmit}>


          {/* USER ID INPUT */}
          <input
            name="userId"
            placeholder="User ID"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl
                       bg-neutral-100 dark:bg-neutral-800
                       border border-neutral-200 dark:border-neutral-700
                       focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"/>


          {/* EMAIL INPUT */}
          <input
            name="email"
            type="email"
            placeholder="Registered Email"
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-xl
                       bg-neutral-100 dark:bg-neutral-800
                       border border-neutral-200 dark:border-neutral-700
                       focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"/>


          {/* DATE OF BIRTH INPUT */}
          <div className="flex gap-3 mb-4">

            {/* DAY */}
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


            {/* MONTH */}
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


            {/* YEAR */}
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


          {/* PASSWORD FIELD */}
          <div className="relative mb-4">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl
                bg-neutral-100 dark:bg-neutral-800
                border border-neutral-200 dark:border-neutral-700
                text-neutral-900 dark:text-white
                placeholder-neutral-400
                pr-12 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"/>

            {/* PASSWORD VISIBILITY TOGGLE */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2">

              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}

            </button>
          </div>


          {/* CONFIRM PASSWORD */}
          <div className="relative mb-6">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl
              bg-neutral-100 dark:bg-neutral-800
              border border-neutral-200 dark:border-neutral-700
              text-neutral-900 dark:text-white
              placeholder-neutral-400
              pr-12 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"/>

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2">

              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}

            </button>
          </div>


          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl 
                       bg-neutral-900 text-white
                       dark:bg-white dark:text-black
                       font-semibold">

            Activate

          </button>

        </form>


        {/* RESPONSE MESSAGE */}
        {message && (
          <p className="mt-4 text-center text-sm">
            {message}
          </p>
        )}


        {/* SIGN IN LINK */}
        <p className="text-center text-sm mt-6">
          Already activated?{" "}
          <Link href="/auth/login" className="underline">
            Sign In
          </Link>
        </p>

      </div>
    </main>
  );
}