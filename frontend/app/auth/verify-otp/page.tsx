"use client";

/*
====================================================
OTP VERIFICATION PAGE
----------------------------------------------------
This page is used ONLY for admin login.

Flow:

Admin enters credentials
        ↓
Backend sends OTP to admin email
        ↓
Frontend redirects to this page
        ↓
Admin enters OTP
        ↓
Backend verifies OTP
        ↓
JWT token issued
        ↓
Admin redirected to dashboard

Security purpose:
Adds second authentication layer for admin.
====================================================
*/

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function VerifyOtpPage() {

  /*
  ========================================
  ROUTER
  Used for redirecting user
  ========================================
  */
  const router = useRouter();


  /*
  ========================================
  STATE VARIABLES
  ========================================
  */

  // stores OTP input
  const [otp, setOtp] = useState("");

  // message shown to user
  const [message, setMessage] = useState("");


  /*
  ========================================
  HANDLE FORM SUBMIT
  ========================================
  */
  const handleSubmit = async (e: React.FormEvent) => {

    // prevent page reload
    e.preventDefault();


    /*
    Get temporary admin userId stored during login
    This was saved in login page before redirecting here
    */
    const userId = localStorage.getItem("tempAdminUserId");


    /*
    If userId not found → redirect to login
    Prevents direct access to OTP page
    */
    if (!userId) {
      router.replace("/auth/login");
      return;
    }


    /*
    Validate OTP length
    OTP must be exactly 6 digits
    */
    if (otp.length !== 6) {
      return setMessage("Enter valid 6 digit OTP");
    }


    try {

      /*
      ========================================
      SEND OTP TO BACKEND FOR VERIFICATION
      ========================================
      */
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(
        `${apiUrl}/api/auth/verify-otp`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId,
            otp
          }),
        }
      );


      // convert response to JSON
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
      LOGIN SUCCESS
      ========================================
      */

      // remove temporary admin userId
      localStorage.removeItem("tempAdminUserId");

      // store authentication token
      localStorage.setItem("token", data.token);

      // store role
      localStorage.setItem("role", data.role);


      /*
      Redirect admin to dashboard
      */
      router.replace("/dashboard/admin");


    }

    catch (error) {

      // server error
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

      {/* OTP CARD */}
      <div className="w-full max-w-md 
                      rounded-3xl p-10
                      bg-white/80 dark:bg-neutral-900/80
                      backdrop-blur-xl
                      shadow-2xl
                      border border-neutral-200 dark:border-neutral-700">

        {/* COLLEGE LOGO */}
        <div className="flex justify-center mb-6">

          <Image
            src="/new clg logo.png"
            alt="KMBB Logo"
            width={70}
            height={70}
          />

        </div>


        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold text-center mb-2">
          OTP Verification
        </h1>

        <p className="text-neutral-500 text-center mb-8">
          Enter the 6 digit code sent to your email
        </p>


        {/* OTP FORM */}
        <form onSubmit={handleSubmit}>

          {/* OTP INPUT */}
          <input
            type="text"

            value={otp}

            onChange={(e) => setOtp(e.target.value)}

            placeholder="Enter OTP"

            maxLength={6}

            className="w-full mb-6 px-4 py-3 text-center tracking-widest text-lg rounded-xl 
                       bg-neutral-100 dark:bg-neutral-800
                       border border-neutral-200 dark:border-neutral-700
                       focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500"
          />


          {/* VERIFY BUTTON */}
          <button
            type="submit"

            className="w-full py-3 rounded-xl 
                       bg-neutral-900 text-white
                       dark:bg-white dark:text-black
                       font-semibold
                       hover:opacity-90 transition"
          >

            Verify OTP

          </button>

        </form>


        {/* ERROR MESSAGE */}
        {message && (

          <p className="text-sm text-red-500 mt-4 text-center">

            {message}

          </p>

        )}


        {/* BACK TO LOGIN */}
        <p className="text-sm text-neutral-500 mt-6 text-center">

          Back to{" "}

          <Link
            href="/auth/login"
            className="underline"
          >

            Sign in

          </Link>

        </p>

      </div>

    </main>

  );
}