"use client";

/*
====================================================
ADMIN DASHBOARD PAGE
----------------------------------------------------
This page is the main dashboard for admin users.

Security Flow:
1. Check if JWT token exists in localStorage
2. Check if role = "admin"
3. If not authorized → redirect to login page
4. If authorized → show admin dashboard

Only admins can access this page.
====================================================
*/

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {

  /*
  ========================================
  ROUTER
  Used to redirect user if unauthorized
  ========================================
  */
  const router = useRouter();


  /*
  ========================================
  AUTHORIZATION STATE
  Controls whether dashboard should render
  ========================================
  */
  const [authorized, setAuthorized] = useState(false);


  /*
  ========================================
  AUTHENTICATION CHECK
  Runs once when page loads

  Steps:
  1. Read token from localStorage
  2. Read user role
  3. If token missing OR role not admin
     → redirect to login
  4. Otherwise allow access
  ========================================
  */
  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // If not logged in OR not admin → redirect
    if (!token || role !== "admin") {
      router.replace("/auth/login");
    }

    // Authorized admin
    else {
      setAuthorized(true);
    }

  }, []);


  /*
  ========================================
  LOADING PROTECTION
  Prevents dashboard flashing before auth check
  ========================================
  */
  if (!authorized) return null;


  /*
  ========================================
  ADMIN DASHBOARD UI
  ========================================
  */
  return (

    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 p-8">


      {/* PAGE TITLE */}
      <h1 className="text-3xl font-semibold mb-6 text-neutral-800 dark:text-white">
        Admin Dashboard
      </h1>


      {/* DASHBOARD GRID */}
      <div className="grid md:grid-cols-3 gap-6">


        {/* STAFF MANAGEMENT MODULE */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
          Manage Staff
        </div>


        {/* STUDENT MANAGEMENT MODULE */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
          Manage Students
        </div>


        {/* SYSTEM SETTINGS MODULE */}
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
          System Settings
        </div>

      </div>

    </div>

  );
}