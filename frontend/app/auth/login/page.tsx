"use client";

import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 
                     bg-gradient-to-br 
                     from-neutral-100 via-neutral-200 to-neutral-100
                     dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">

      <div className="w-full max-w-md 
                      bg-white dark:bg-neutral-900
                      rounded-3xl p-10
                      shadow-xl dark:shadow-black/40
                      border border-neutral-200 dark:border-neutral-700">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/new clg logo.png"
            alt="KMBB Logo"
            width={70}
            height={70}
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-neutral-500 dark:text-neutral-400 text-center mb-8">
          Sign in to continue
        </p>

        {/* User Id */}
        <input
          type="text"
          placeholder="User Id"
          className="w-full mb-4 px-4 py-3 rounded-xl 
                     bg-neutral-100 dark:bg-neutral-800
                     border border-neutral-200 dark:border-neutral-700
                     focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-xl 
                     bg-neutral-100 dark:bg-neutral-800
                     border border-neutral-200 dark:border-neutral-700
                     focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500"
        />

        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6 text-center hover:underline cursor-pointer">
          Forgot password?
        </p>

        {/* Button */}
        <button className="w-full py-3 rounded-xl 
                           bg-neutral-900 text-white
                           dark:bg-white dark:text-black
                           font-semibold
                           hover:opacity-90 transition">
          Sign In
        </button>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-6 text-center">
          Don’t have an account?{" "}
          <a href="/auth/register" className="underline">
            Sign Up
          </a>
        </p>

      </div>

    </main>
  );
}