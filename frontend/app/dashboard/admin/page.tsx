"use client";

/*
====================================================
ADMIN DASHBOARD PAGE
----------------------------------------------------
Features:
• Time based greeting
• Live clock
• Current date
• Stats cards
• Quick actions
====================================================
*/

import { useEffect, useState } from "react";

export default function AdminDashboard() {

  /*
  ========================================
  STATES
  ========================================
  */
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");


  /*
  ========================================
  FUNCTION: GET GREETING BASED ON TIME
  ========================================
  */
  const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";

    if (hour < 17) return "Good Afternoon";

    if (hour < 21) return "Good Evening";

    return "Good Night";

  };


  /*
  ========================================
  FUNCTION: FORMAT TIME
  ========================================
  */
  const getFormattedTime = () => {

    const now = new Date();

    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

  };


  /*
  ========================================
  FUNCTION: FORMAT DATE
  ========================================
  */
  const getFormattedDate = () => {

    const now = new Date();

    return now.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric"
    });

  };


  /*
  ========================================
  REAL-TIME CLOCK UPDATE
  ========================================
  */
  useEffect(() => {

    const updateTime = () => {

      setGreeting(getGreeting());
      setTime(getFormattedTime());
      setDate(getFormattedDate());

    };

    // run immediately
    updateTime();

    // update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);

  }, []);


  return (

    <div className="space-y-10">

      {/* ====================================
          DASHBOARD HEADER
      ==================================== */}
      <div>

        <h1 className="text-3xl font-semibold">

          {greeting}, Admin

        </h1>

        <p className="text-neutral-500 mt-1">

          {date} • {time}

        </p>

      </div>



      {/* ====================================
          STATS CARDS
      ==================================== */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow">
          <p className="text-sm text-neutral-500">
            Total Students
          </p>

          <h2 className="text-2xl font-semibold">
            0
          </h2>
        </div>


        <div className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow">
          <p className="text-sm text-neutral-500">
            Total Staff
          </p>

          <h2 className="text-2xl font-semibold">
            0
          </h2>
        </div>


        <div className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow">
          <p className="text-sm text-neutral-500">
            Branches
          </p>

          <h2 className="text-2xl font-semibold">
            0
          </h2>
        </div>


        <div className="p-6 rounded-xl bg-white dark:bg-neutral-800 shadow">
          <p className="text-sm text-neutral-500">
            Notices
          </p>

          <h2 className="text-2xl font-semibold">
            0
          </h2>
        </div>

      </div>



      {/* ====================================
          QUICK ACTIONS
      ==================================== */}
      <div>

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">

          <button className="px-5 py-3 rounded-lg bg-black text-white">
            Add Student
          </button>

          <button className="px-5 py-3 rounded-lg bg-black text-white">
            Add Staff
          </button>

          <button className="px-5 py-3 rounded-lg bg-black text-white">
            Create Notice
          </button>

        </div>

      </div>

    </div>

  );
}