"use client";

/*
====================================================
ADMIN DASHBOARD LAYOUT
----------------------------------------------------
Structure:
• Sidebar → fixed
• Header → sticky
• Content → scrollable
====================================================
*/

import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";

export default function AdminLayout({ children }: { children: ReactNode }) {

  return (

    <div className="flex h-screen bg-neutral-950 text-white">

      {/* ====================================
          FIXED SIDEBAR
      ==================================== */}
      <aside className="w-64 flex-shrink-0">

        <Sidebar />

      </aside>


      {/* ====================================
          MAIN DASHBOARD AREA
      ==================================== */}
      <div className="flex-1 flex flex-col">

        {/* ====================================
            STICKY HEADER
        ==================================== */}
        <div className="sticky top-0 z-10 bg-neutral-950 border-b border-neutral-800 px-10 py-6">

          <DashboardHeader />

        </div>


        {/* ====================================
            SCROLLABLE CONTENT
        ==================================== */}
        <main className="flex-1 overflow-y-auto p-10">

          {children}

        </main>

      </div>

    </div>

  );

}