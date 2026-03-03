"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.userId || !form.password) {
      return setMessage("All fields are required");
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // ❌ Backend error
      if (!res.ok) {
        return setMessage(data.message);
      }

      // 🔐 ADMIN → OTP FLOW
      if (data.requireOtp) {
        localStorage.setItem("tempAdminUserId", form.userId);
        router.replace("/auth/verify-otp");
        return;
      }

      // 👤 STUDENT / STAFF → DIRECT LOGIN
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      router.replace(`/dashboard/${data.role}`);

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

        <div className="flex justify-center mb-6">
          <Image
            src="/new clg logo.png"
            alt="KMBB Logo"
            width={70}
            height={70}
          />
        </div>

        <h1 className="text-3xl font-semibold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-neutral-500 text-center mb-8">
          Sign in to continue
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            value={form.userId}
            onChange={handleChange}
            placeholder="User ID"
            className="w-full mb-4 px-4 py-3 rounded-xl 
                       bg-neutral-100 dark:bg-neutral-800
                       border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          />

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
                         pr-12 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

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

        {message && (
          <p className="text-sm text-red-500 mt-4 text-center">
            {message}
          </p>
        )}

        <p className="text-sm text-neutral-500 mt-6 text-center">
          Need to activate?{" "}
          <Link href="/auth/activate" className="underline">
            Activate
          </Link>
        </p>

      </div>
    </main>
  );
}