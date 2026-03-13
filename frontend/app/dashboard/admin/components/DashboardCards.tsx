"use client";

/*
====================================
ADMIN DASHBOARD CARDS
------------------------------------
Sections:
• Overview
• Management
• Academic Content
====================================
*/

import StudentCard from "../cards/StudentCard";
import StaffCard from "../cards/StaffCard";
import ClassesCard from "../cards/ClassesCard";
import AttendanceCard from "../cards/AttendanceCard";
import NoticeCard from "../cards/NoticeCard";
import ActivityCard from "../cards/ActivityCard";

export default function DashboardCards() {

  return (

    <div className="space-y-12">

      {/* ====================================
          OVERVIEW SECTION
      ==================================== */}
      <section>

        <h2 className="text-xl font-semibold mb-4">
          Overview
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <StudentCard />

          <StaffCard />

          <ClassesCard />

          <AttendanceCard />

        </div>

      </section>


      {/* ====================================
          MANAGEMENT SECTION
      ==================================== */}
      <section>

        <h2 className="text-xl font-semibold mb-4">
          Management
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <StudentCard />

          <StaffCard />

        </div>

      </section>


      {/* ====================================
          ACADEMIC CONTENT
      ==================================== */}
      <section>

        <h2 className="text-xl font-semibold mb-4">
          Academic Content
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <NoticeCard />

          <ActivityCard />

        </div>

      </section>

    </div>

  );

}