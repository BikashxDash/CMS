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

export default function DashboardHeader() {

  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {

    const updateTime = () => {
      setTime(new Date());
    };

    updateTime();

    const interval = setInterval(updateTime, 60000);

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
    else if ((hour === 12 && minutes > 0) || (hour > 12 && hour < 18))
      greeting = "Good Afternoon";
    else if (hour >= 18 && hour < 21) greeting = "Good Evening";
    else greeting = "Good Night";

  }

  return (

    <div className="mb-10">

      {/* Greeting */}
      <h1 className="text-3xl font-semibold">
        {greeting}, Admin
      </h1>

      {/* Date & Time */}
      {time && (
        <p className="text-sm text-neutral-400 mt-2">

          {time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          })}

          {" • "}

          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })}

        </p>
      )}

    </div>

  );

}