"use client";

/*
========================================
STUDENT DASHBOARD
----------------------------------------
Features
• Profile image state shared
• Profile panel
• Notice feed
========================================
*/

import { useState, useEffect } from "react";
import {
  User,
  ClipboardCheck,
  BookOpen,
  CalendarDays,
  Bell
} from "lucide-react";

import ProfilePanel from "../../dashboard/student/ProfilePanel";

export default function StudentDashboard() {

  const [openProfile, setOpenProfile] = useState(false);

  /*
  ========================================
  PROFILE IMAGE GLOBAL STATE
  ========================================
  */
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");



  const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";

    return "Good Night";

  };



  useEffect(() => {

    const update = () => {

      setGreeting(getGreeting());

      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      );

    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);

  }, []);



  return (

    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 p-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="text-3xl font-semibold text-neutral-800 dark:text-white">
            Student Dashboard
          </h1>

          <p className="text-neutral-500">
            {greeting} • {time}
          </p>

        </div>

        {/* PROFILE ICON */}
        <button
          onClick={() => setOpenProfile(true)}
          className="w-10 h-10 rounded-full overflow-hidden bg-neutral-300 flex items-center justify-center shadow hover:scale-105 transition"
        >

          {profileImage ? (
            <img
              src={profileImage}
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={18} />
          )}

        </button>

      </div>



      {/* ACTION CARDS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">

          <ClipboardCheck size={28} />

          <h2 className="mt-4 font-semibold text-lg">
            View Attendance
          </h2>

        </div>


        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">

          <BookOpen size={28} />

          <h2 className="mt-4 font-semibold text-lg">
            Download Notes
          </h2>

        </div>


        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">

          <CalendarDays size={28} />

          <h2 className="mt-4 font-semibold text-lg">
            View Timetable
          </h2>

        </div>

      </div>



      {/* NOTICE FEED */}
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow p-6">

        <div className="flex items-center gap-2 mb-4">

          <Bell size={18} />

          <h2 className="font-semibold text-lg">
            Notices
          </h2>

        </div>

        <div className="space-y-3 text-sm">

          <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-700">
            Mid Semester Exam will start from 25th March.
          </div>

          <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-700">
            Data Structures notes uploaded.
          </div>

        </div>

      </div>



      {/* PROFILE PANEL */}
      <ProfilePanel
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />

    </div>

  );
}