"use client";

import Image from "next/image";

export default function RegisterPage() {
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

        <div className="flex justify-center mb-6">
          <Image src="/new clg logo.png" alt="KMBB Logo" width={70} height={70} className="object-contain"/>
        </div>

        <h1 className="text-3xl font-semibold text-center mb-2">Create Your Account</h1>

        <p className="text-neutral-500 dark:text-neutral-400 text-center mb-8">It only takes a minute.</p>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-3 rounded-xl 
                     bg-neutral-100 dark:bg-neutral-800
                     border border-neutral-200 dark:border-neutral-700"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-xl 
                     bg-neutral-100 dark:bg-neutral-800
                     border border-neutral-200 dark:border-neutral-700"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-xl 
                     bg-neutral-100 dark:bg-neutral-800
                     border border-neutral-200 dark:border-neutral-700"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-6 px-4 py-3 rounded-xl 
                     bg-neutral-100 dark:bg-neutral-800
                     border border-neutral-200 dark:border-neutral-700"
        />

        <button className="w-full py-3 rounded-xl 
                           bg-neutral-900 text-white
                           dark:bg-white dark:text-black
                           font-semibold
                           hover:opacity-90 transition">Create Account</button>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-6 text-center">Already have an account?{" "}<a href="/auth/login" className="underline">Sign In</a></p>

      </div>
    </main>
  );
}