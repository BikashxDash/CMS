import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 w-full z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/college logo.jpeg"
            alt="KMBB Logo"
            width={140}
            height={140}
            className="object-contain"
          />
        </div>

        {/* Right: Auth Links */}
        <div className="flex items-center gap-4 text-sm font-medium text-white">
          <Link href="/auth/login" className="hover:opacity-70 transition">
            Sign In
          </Link>

          <Link
            href="/auth/register"
            className="px-5 py-2 rounded-full bg-white text-black hover:bg-neutral-200 transition"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
}