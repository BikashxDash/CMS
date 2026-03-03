"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="absolute top-0 left-0 w-full z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/new clg logo.png"
            alt="KMBB Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Capsule Switch */}
        <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-full p-1">

          <Link
            href="/auth/login"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              pathname === "/auth/login"
                ? "bg-white text-black"
                : "text-white hover:bg-white/20"
            }`}
          >
            Sign In
          </Link>

          <Link
            href="/auth/register"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              pathname === "/auth/register"
                ? "bg-white text-black"
                : "text-white hover:bg-white/20"
            }`}
          >
            Sign Up
          </Link>

        </div>

      </div>
    </header>
  );
}