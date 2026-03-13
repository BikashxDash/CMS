"use client";

/*
====================================================
NAVBAR COMPONENT
----------------------------------------------------
This component renders the top navigation bar
for the public pages of the CMS.

Features:
• College logo display
• Navigation links (Sign In / Activate)
• Active route highlighting
• Capsule style UI
• Glassmorphism effect
====================================================
*/

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {

  /*
  ========================================
  CURRENT ROUTE DETECTION
  ----------------------------------------
  usePathname() returns the current URL path.

  Example:
  /auth/login
  /auth/activate

  This helps highlight the active link.
  ========================================
  */
  const pathname = usePathname();


  return (

    /*
    ========================================
    HEADER CONTAINER
    ----------------------------------------
    absolute → overlays hero section
    top-0 → stick to top
    z-20 → ensures navbar appears above content
    ========================================
    */
    <header className="absolute top-0 left-0 w-full z-20">


      {/* ====================================
          NAVBAR CONTENT WRAPPER
          Centers content and controls spacing
          ==================================== */}
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">


        {/* ====================================
            COLLEGE LOGO + COLLEGE NAME
            Uses Next.js Image optimization
            ==================================== */}
        <div className="flex items-center gap-1">

          {/* College Logo */}
          <Image
            src="/new clg logo.png"
            alt="KMBB Logo"
            width={60}
            height={60}
            className="object-contain"
          />

          {/* College Name */}
          <Image
            src="/clg-name.png"
            alt="KMBB LOGO"
            width={160}
            height={30}
            className="object-contain hidden sm:block"
          />

        </div>


        {/* ====================================
            CAPSULE NAVIGATION SWITCH
            ------------------------------------
            Glassmorphism style container
            Contains Sign In and Activate links
            ==================================== */}
        <div className="relative flex items-center
                        bg-white/10 backdrop-blur-md
                        rounded-full p-1">


          {/* ====================================
              SIGN IN BUTTON
              Highlights when active
              ==================================== */}
          <Link
            href="/auth/login"

            className={`
              px-5 py-2
              rounded-full
              text-sm font-medium
              transition-all duration-300

              ${
                pathname === "/auth/login"
                  ? "bg-white text-black"       // active state
                  : "text-white hover:bg-white/20" // hover state
              }
            `}
          >

            Sign In

          </Link>


          {/* ====================================
              ACTIVATE ACCOUNT BUTTON
              Highlights when active
              ==================================== */}
          <Link
            href="/auth/activate"

            className={`
              px-5 py-2
              rounded-full
              text-sm font-medium
              transition-all duration-300

              ${
                pathname === "/auth/activate"
                  ? "bg-white text-black"        // active state
                  : "text-white hover:bg-white/20" // hover state
              }
            `}
          >

            Activate

          </Link>


        </div>

      </div>

    </header>

  );

}