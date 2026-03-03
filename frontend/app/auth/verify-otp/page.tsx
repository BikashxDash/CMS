"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("tempAdminUserId");

    if (!userId) {
      router.replace("/auth/login");
      return;
    }

    if (otp.length !== 6) {
      return setMessage("Enter valid 6 digit OTP");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setMessage(data.message);
      }

      localStorage.removeItem("tempAdminUserId");
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      router.replace("/dashboard/admin");

    } catch (error) {
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
                      bg-white/80 dark:bg-neutral-900/80
                      backdrop-blur-xl
                      shadow-2xl
                      border border-neutral-200 dark:border-neutral-700">

        {/* College Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/new clg logo.png"
            alt="KMBB Logo"
            width={70}
            height={70}
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-2">
          OTP Verification
        </h1>

        <p className="text-neutral-500 text-center mb-8">
          Enter the 6 digit code sent to your email
        </p>

        <form onSubmit={handleSubmit}>
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

        {message && (
          <p className="text-sm text-red-500 mt-4 text-center">
            {message}
          </p>
        )}

        <p className="text-sm text-neutral-500 mt-6 text-center">
          Back to{" "}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </p>

      </div>
    </main>
  );
}