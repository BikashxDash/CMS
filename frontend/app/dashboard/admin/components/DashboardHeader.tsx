"use client";

/*
====================================
ADMIN DASHBOARD HEADER
------------------------------------
Fixes hydration error by rendering
time only after client mount.
====================================
*/

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function DashboardHeader() {

  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {

    const updateTime = () => setTime(new Date());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);

  }, []);

  /*
  ====================================
  GREETING LOGIC
  ====================================
  */
  let greeting = "";

  if (time) {
    const hour = time.getHours();
    const minutes = time.getMinutes();
    if (hour >= 6 && hour < 12) greeting = "Good Morning";
    else if (hour === 12 && minutes === 0) greeting = "Good Noon";
    else if ((hour === 12 && minutes > 0) || (hour > 12 && hour < 18)) greeting = "Good Afternoon";
    else if (hour >= 18 && hour < 21) greeting = "Good Evening";
    else greeting = "Good Night";
  }

  return (

    <div className="flex items-center justify-between">

      {/* Left - Greeting */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {greeting}, Admin 👋
        </h1>
        {time && (
          <p className="text-sm text-neutral-500 mt-1">
            {time.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>

      {/* Right - Time & Bell */}
      <div className="flex items-center gap-3">

        {/* Live Clock */}
        {time && (
          <div className="bg-neutral-900 border border-neutral-800/60 rounded-2xl px-4 py-2.5 text-right">
            <p className="text-lg font-semibold tabular-nums tracking-tight">
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </p>
            <p className="text-[10px] text-neutral-500">Live Time</p>
          </div>
        )}

        {/* Notification Bell */}
        <button className="relative w-10 h-10 bg-neutral-900 border border-neutral-800/60 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all duration-200">
          <Bell size={17} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
        </button>

      </div>

    </div>

  );

}