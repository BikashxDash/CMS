"use client";

/*
====================================================
STAFF DASHBOARD PAGE
----------------------------------------------------
This page is the main dashboard for staff users.

Security Flow:
1. Check JWT token from localStorage
2. Check role = "staff"
3. If unauthorized → redirect to login
4. If authorized → show staff dashboard

Only staff users can access this page.
====================================================
*/

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StaffDashboard() {

  /*
  ========================================
  ROUTER
  Used for redirecting user
  ========================================
  */
  const router = useRouter();


  /*
  ========================================
  AUTHORIZATION STATE
  Controls dashboard rendering
  ========================================
  */
  const [authorized, setAuthorized] = useState(false);


  /*
  ========================================
  AUTHENTICATION CHECK
  Runs once when page loads

  Steps:
  1. Get token from localStorage
  2. Get role from localStorage
  3. If token missing OR role not staff
     → redirect to login
  4. Otherwise allow access
  ========================================
  */
  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Unauthorized access protection
    if (!token || role !== "staff") {
      router.replace("/auth/login");
    }

    // Authorized staff
    else {
      setAuthorized(true);
    }

  }, []);


  /*
  ========================================
  LOADING PROTECTION
  Prevent dashboard flash before auth check
  ========================================
  */
  if (!authorized) return null;


  /*
  ========================================
  STAFF DASHBOARD UI
  ========================================
  */
  return (

    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 p-8">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-semibold mb-6 text-neutral-800 dark:text-white">
        Staff Dashboard
      </h1>


      {/* DASHBOARD GRID */}
      <div className="grid md:grid-cols-3 gap-6">


        {/* CLASS MANAGEMENT MODULE */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
          Manage Classes
        </div>


        {/* STUDENT LIST MODULE */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
          View Students
        </div>


        {/* ATTENDANCE MODULE */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
          Attendance Panel
        </div>

      </div>

    </div>
  );
}