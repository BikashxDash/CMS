"use client";

/*
====================================================
STAFF DASHBOARD PAGE
----------------------------------------------------
Purpose:
Teacher overview dashboard

Features:
• Greeting
• Live clock
• Quick actions
====================================================
*/

import { useEffect, useState } from "react";

export default function StaffDashboard() {

  /*
  ========================================
  STATE VARIABLES
  ========================================
  */
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");



  /*
  ========================================
  DETERMINE GREETING
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
  REAL TIME CLOCK
  ========================================
  */
  useEffect(() => {

    const updateClock = () => {

      setGreeting(getGreeting());

      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      );

    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);

  }, []);



  return (

    <div className="space-y-10">

      {/* ====================================
          GREETING HEADER
      ==================================== */}
      <div>

        <h1 className="text-3xl font-semibold">

          {greeting}, Staff

        </h1>

        <p className="text-neutral-500">

          Current Time • {time}

        </p>

      </div>



      {/* ====================================
          QUICK ACTIONS
      ==================================== */}
      <div>

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <button className="px-5 py-3 bg-black text-white rounded-lg">
            Take Attendance
          </button>

          <button className="px-5 py-3 bg-black text-white rounded-lg">
            Upload Notes
          </button>

          <button className="px-5 py-3 bg-black text-white rounded-lg">
            View Students
          </button>

        </div>

      </div>

    </div>

  );
}