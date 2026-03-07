"use client";

/*
====================================================
ADMIN DASHBOARD LAYOUT
----------------------------------------------------
Features:
• Collapsible sidebar
• Admin profile section
• Navigation menu
• Bottom settings button
• Smooth sidebar animation
====================================================
*/

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

import {
  Menu,
  LayoutDashboard,
  Users,
  UserCog,
  GitBranch,
  Calendar,
  Bell,
  Settings
} from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {

  /*
  ========================================
  SIDEBAR STATE
  true  → sidebar open
  false → sidebar collapsed
  ========================================
  */
  const [open, setOpen] = useState(true);

  return (

    /*
    ========================================
    MAIN DASHBOARD CONTAINER
    ========================================
    */
    <div className="flex min-h-screen">

      {/* ====================================
          SIDEBAR
      ==================================== */}
      <aside
        className={`
        bg-neutral-900 text-white
        transition-all duration-300
        flex flex-col justify-between
        ${open ? "w-64" : "w-16"}
        `}
      >

        {/* ====================================
            TOP SIDEBAR SECTION
        ==================================== */}
        <div>

          {/* Toggle Button */}
          <div className="flex items-center justify-between p-4">

            {open && (
              <h2 className="text-lg font-semibold">
                Admin
              </h2>
            )}

            <button
              onClick={() => setOpen(!open)}
              className="p-2 hover:bg-neutral-800 rounded"
            >
              <Menu size={20} />
            </button>

          </div>


          {/* ====================================
              ADMIN PROFILE SECTION
          ==================================== */}
          <div className="flex items-center gap-3 p-4 border-t border-neutral-800">

            {/* Profile Circle */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">

              <Image
                src="/new clg logo.png"
                alt="Admin"
                width={40}
                height={40}
              />

            </div>

            {/* Profile Info */}
            {open && (
              <div>
                <p className="text-sm font-medium">
                  Bikash Dash
                </p>

                <p className="text-xs text-neutral-400">
                  Admin
                </p>
              </div>
            )}

          </div>


          {/* ====================================
              NAVIGATION MENU
          ==================================== */}
          <nav className="flex flex-col gap-2 mt-6 px-2">

            <Link
              href="/dashboard/admin"
              className="flex items-center gap-3 hover:bg-neutral-800 px-3 py-2 rounded"
            >
              <LayoutDashboard size={18} />
              {open && "Dashboard"}
            </Link>

            <Link
              href="/dashboard/admin/students"
              className="flex items-center gap-3 hover:bg-neutral-800 px-3 py-2 rounded"
            >
              <Users size={18} />
              {open && "Students"}
            </Link>

            <Link
              href="/dashboard/admin/staff"
              className="flex items-center gap-3 hover:bg-neutral-800 px-3 py-2 rounded"
            >
              <UserCog size={18} />
              {open && "Staff"}
            </Link>

            <Link
              href="/dashboard/admin/branches"
              className="flex items-center gap-3 hover:bg-neutral-800 px-3 py-2 rounded"
            >
              <GitBranch size={18} />
              {open && "Branches"}
            </Link>

            <Link
              href="/dashboard/admin/timetable"
              className="flex items-center gap-3 hover:bg-neutral-800 px-3 py-2 rounded"
            >
              <Calendar size={18} />
              {open && "Timetable"}
            </Link>

            <Link
              href="/dashboard/admin/notices"
              className="flex items-center gap-3 hover:bg-neutral-800 px-3 py-2 rounded"
            >
              <Bell size={18} />
              {open && "Notices"}
            </Link>

          </nav>

        </div>



        {/* ====================================
            BOTTOM SIDEBAR SECTION
            SETTINGS BUTTON
        ==================================== */}
        <div className="p-3 border-t border-neutral-800">

          <Link
            href="/dashboard/admin/settings"
            className="flex items-center gap-3 hover:bg-neutral-800 px-3 py-2 rounded"
          >
            <Settings size={18} />

            {open && "Settings"}

          </Link>

        </div>

      </aside>



      {/* ====================================
          MAIN CONTENT AREA
      ==================================== */}
      <main className="flex-1 bg-neutral-100 dark:bg-neutral-900 p-8">

        {children}

      </main>

    </div>

  );
}