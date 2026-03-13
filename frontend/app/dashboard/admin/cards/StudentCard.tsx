"use client";

/*
====================================
TOTAL STUDENTS CARD
====================================
*/

import { Users } from "lucide-react";

export default function StudentCard() {

  return (

    <div className="p-6 rounded-[24px] bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition">

      <div className="flex justify-between items-center">

        <p className="text-sm text-neutral-400">
          Total Students
        </p>

        <Users size={18} className="text-neutral-500"/>

      </div>

      <h2 className="text-3xl font-semibold mt-4">
        1240
      </h2>

    </div>

  );

}