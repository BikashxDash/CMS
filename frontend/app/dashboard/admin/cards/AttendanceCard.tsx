"use client";

/*
====================================
TODAY ATTENDANCE CARD
====================================
*/

import { BarChart } from "lucide-react";

export default function AttendanceCard() {

  return (

    <div className="p-6 rounded-[24px] bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition">

      <div className="flex justify-between items-center">

        <p className="text-sm text-neutral-400">
          Today's Attendance
        </p>

        <BarChart size={18} className="text-neutral-500"/>

      </div>

      <h2 className="text-3xl font-semibold mt-4">
        92%
      </h2>

    </div>

  );

}