"use client";

/*
====================================================
STUDENT DASHBOARD PAGE
----------------------------------------------------
This page is the main dashboard for students.

Security Flow:
1. Check if JWT token exists in localStorage
2. Check if role = "student"
3. If not authorized → redirect to login page
4. If authorized → render student dashboard

Only students should access this page.
====================================================
*/

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {

  /*
  ========================================
  ROUTER
  Used for redirecting user if unauthorized
  ========================================
  */
  const router = useRouter();


  /*
  ========================================
  AUTHORIZATION STATE
  Controls when dashboard should render
  ========================================
  */
  const [authorized, setAuthorized] = useState(false);


  /*
  ========================================
  AUTHENTICATION CHECK
  Runs once when the page loads

  Steps:
  1. Get token from localStorage
  2. Get role from localStorage
  3. If token missing OR role not student
     → redirect to login
  4. Otherwise allow dashboard access
  ========================================
  */
  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Unauthorized access protection
    if (!token || role !== "student") {
      router.replace("/auth/login");
    }

    // Authorized student
    else {
      setAuthorized(true);
    }

  }, []);


  /*
  ========================================
  LOADING PROTECTION
  Prevents UI flash before auth check
  ========================================
  */
  if (!authorized) {
    return null;
  }


  /*
  ========================================
  STUDENT DASHBOARD UI
  ========================================
  */
  return (

    <div className="min-h-screen flex items-center justify-center
                    bg-neutral-100 dark:bg-neutral-900">

      <h1 className="text-3xl font-semibold
                     text-neutral-800 dark:text-white">

        Student Dashboard

      </h1>

    </div>

  );

}