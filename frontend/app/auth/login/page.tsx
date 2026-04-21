"use client";

/*
====================================================
LOGIN PAGE
----------------------------------------------------
This page allows users to log into the CMS system.

Supported users:
- Admin
- Staff
- Student

Flow:

User enters credentials
        ↓
Frontend sends login request
        ↓
Backend verifies credentials

If ADMIN:
    → OTP sent to email
    → redirect to verify OTP page

If STAFF/STUDENT:
    → JWT token returned
    → redirect to role dashboard

====================================================
*/

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {

  /*
  ========================================
  ROUTER
  Used for redirecting user after login
  ========================================
  */
  const router = useRouter();


  /*
  ========================================
  FORM STATE
  Stores user login inputs
  ========================================
  */
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });


  /*
  ========================================
  UI STATES
  ========================================
  */

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Message displayed to user (error / info)
  const [message, setMessage] = useState("");


  /*
  ========================================
  HANDLE INPUT CHANGE
  Updates form state when user types
  ========================================
  */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };


  /*
  ========================================
  HANDLE FORM SUBMIT
  Runs when user clicks Sign In
  ========================================
  */
  const handleSubmit = async (e: React.FormEvent) => {

    // Prevent page reload
    e.preventDefault();


    /*
    ========================================
    BASIC VALIDATION
    ========================================
    */
    if (!form.userId || !form.password) {
      return setMessage("All fields are required");
    }


    try {

      /*
      ========================================
      SEND LOGIN REQUEST TO BACKEND
      ========================================
      */
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(
        `${apiUrl}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );


      // Convert response to JSON
      const data = await res.json();


      /*
      ========================================
      BACKEND ERROR HANDLING
      ========================================
      */
      if (!res.ok) {
        return setMessage(data.message);
      }


      /*
      ========================================
      ADMIN LOGIN FLOW (OTP REQUIRED)
      ========================================
      */
      if (data.requireOtp) {

        // Temporarily store admin userId
        localStorage.setItem("tempAdminUserId", form.userId);

        // Redirect to OTP verification page
        router.replace("/auth/verify-otp");

        return;
      }


      /*
      ========================================
      STAFF / STUDENT LOGIN FLOW
      ========================================
      */

      // Store JWT token
      localStorage.setItem("token", data.token);

      // Store role
      localStorage.setItem("role", data.role);


      /*
      Redirect user to role based dashboard
      Example:
      /dashboard/admin
      /dashboard/staff
      /dashboard/student
      */
      router.replace(`/dashboard/${data.role}`);

    }

    catch (error) {

      // If server not reachable
      setMessage("Something went wrong");

    }

  };


  /*
  ========================================
  UI SECTION
  ========================================
  */

  return (

    <main
      className="min-h-screen flex items-center justify-center px-6 
                 bg-gradient-to-br 
                 from-neutral-100 via-neutral-200 to-neutral-100
                 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
    >

      {/* LOGIN CARD */}
      <div
        className="w-full max-w-md 
                   rounded-3xl p-10
                   bg-white/80 dark:bg-neutral-900/80
                   backdrop-blur-xl
                   shadow-2xl
                   border border-neutral-200 dark:border-neutral-700"
      >

        {/* COLLEGE LOGO */}
        <div className="flex justify-center mb-6">

          <Image
            src="/new clg logo.png"
            alt="KMBB Logo"
            width={70}
            height={70}
          />

        </div>


        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-neutral-500 text-center mb-8">
          Sign in to continue
        </p>


        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit}>

          {/* USER ID FIELD */}
          <input
            type="text"
            name="userId"
            value={form.userId}
            onChange={handleChange}
            placeholder="User ID"

            className="w-full mb-4 px-4 py-3 rounded-xl 
                       bg-neutral-100 dark:bg-neutral-800
                       border border-neutral-200 dark:border-neutral-700
                       focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          />


          {/* PASSWORD FIELD */}
          <div className="relative mb-6">

            <input
              name="password"
              value={form.password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"

              onChange={handleChange}

              className="w-full px-4 py-3 rounded-xl
                         bg-neutral-100 dark:bg-neutral-800
                         border border-neutral-200 dark:border-neutral-700
                         pr-12
                         focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            />


            {/* PASSWORD VISIBILITY BUTTON */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}

              className="absolute right-4 top-1/2 -translate-y-1/2"
            >

              {showPassword
                ? <EyeOff size={18} />
                : <Eye size={18} />
              }

            </button>

          </div>


          {/* LOGIN BUTTON */}
          <button
            type="submit"

            className="w-full py-3 rounded-xl 
                       bg-neutral-900 text-white
                       dark:bg-white dark:text-black
                       font-semibold"
          >
            Sign In
          </button>

        </form>


        {/* ERROR / INFO MESSAGE */}
        {message && (
          <p className="text-sm text-red-500 mt-4 text-center">
            {message}
          </p>
        )}


        {/* ACTIVATE ACCOUNT LINK */}
        <p className="text-sm text-neutral-500 mt-6 text-center">

          Need to activate?{" "}

          <Link
            href="/auth/activate"
            className="underline"
          >
            Activate
          </Link>

        </p>

      </div>

    </main>
  );

}