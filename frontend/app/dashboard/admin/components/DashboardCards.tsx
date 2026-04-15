"use client";

/*
====================================
ADMIN DASHBOARD CARDS
------------------------------------
Sections:
• Stats Overview
• Attendance Status
• Recent Notices
• Department Overview
====================================
*/

import {
  Users, UserCog, ClipboardCheck, TrendingUp,
  Bell, Plus, Circle
} from "lucide-react";
import { useRouter } from "next/navigation";

/*
====================================
STATIC DATA (Replace with API later)
====================================
*/

const recentStudents = [
  { name: "Aarav Sharma",  dept: "Computer Science", status: "present" },
  { name: "Priya Patel",   dept: "Electronics",      status: "absent"  },
  { name: "Rohit Singh",   dept: "Mechanical",       status: "present" },
  { name: "Anjali Gupta",  dept: "Civil",            status: "present" },
  { name: "Vikram Das",    dept: "Computer Science", status: "late"    },
];

const notices = [
  { title: "Semester Exam Schedule Released", time: "2 hours ago",  tag: "Exam",    color: "text-red-400",    bg: "bg-red-500/10",    border: "border-l-red-400"    },
  { title: "Holiday – Holi Festival",         time: "Yesterday",    tag: "Holiday", color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-l-amber-400"  },
  { title: "New Lab Equipment in Block B",    time: "2 days ago",   tag: "General", color: "text-emerald-400",bg: "bg-emerald-500/10",border: "border-l-emerald-400"},
  { title: "Sports Day Registration Open",    time: "3 days ago",   tag: "Event",   color: "text-blue-400",   bg: "bg-blue-500/10",   border: "border-l-blue-400"   },
];

const departments = [
  { name: "Computer Sc.", count: 420, total: 420, color: "bg-blue-500"   },
  { name: "Electronics",  count: 310, total: 420, color: "bg-purple-500" },
  { name: "Mechanical",   count: 280, total: 420, color: "bg-amber-500"  },
  { name: "Civil",        count: 230, total: 420, color: "bg-emerald-500"},
];

type StatusType = "present" | "absent" | "late";

const statusStyle: Record<StatusType, { text: string; bg: string }> = {
  present: { text: "text-emerald-400", bg: "bg-emerald-500/10" },
  absent:  { text: "text-red-400",     bg: "bg-red-500/10"     },
  late:    { text: "text-amber-400",   bg: "bg-amber-500/10"   },
};

export default function DashboardCards() {

  const router = useRouter();

  return (

    <div className="space-y-8">

      {/* ====================================
          STATS OVERVIEW
      ==================================== */}
      <section>

        <h2 className="text-[13px] font-semibold text-neutral-500 uppercase tracking-wider mb-4">
          Overview
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {[
            {
              label:   "Total Students",
              value:   "1,240",
              sub:     "+12 this month",
              icon:    <Users size={17} />,
              color:   "text-blue-400",
              bg:      "bg-blue-500/10",
            },
            {
              label:   "Total Staff",
              value:   "86",
              sub:     "+2 this month",
              icon:    <UserCog size={17} />,
              color:   "text-emerald-400",
              bg:      "bg-emerald-500/10",
            },
            {
              label:   "Students Present",
              value:   "92%",
              sub:     "1,141 of 1,240",
              icon:    <ClipboardCheck size={17} />,
              color:   "text-amber-400",
              bg:      "bg-amber-500/10",
            },
            {
              label:   "Staff Present",
              value:   "79",
              sub:     "7 on leave",
              icon:    <TrendingUp size={17} />,
              color:   "text-purple-400",
              bg:      "bg-purple-500/10",
            },
          ].map((stat, i) => (

            <div
              key={i}
              className="bg-neutral-900 border border-neutral-800/60 rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >

              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  ↑ 2.4%
                </span>
              </div>

              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-[12px] text-neutral-500 mt-0.5">{stat.label}</p>
              <p className={`text-[11px] font-medium mt-2 ${stat.color}`}>{stat.sub}</p>

            </div>

          ))}

        </div>

      </section>


      {/* ====================================
          ATTENDANCE + NOTICES GRID
      ==================================== */}
      <div className="grid md:grid-cols-2 gap-6">


        {/* Attendance Card */}
        <section className="bg-neutral-900 border border-neutral-800/60 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[15px] font-semibold">Today's Attendance</h2>
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5">
              <Circle size={6} className="fill-emerald-400" /> Live
            </span>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4 mb-6">

            <div>
              <div className="flex justify-between text-[12px] mb-2">
                <span className="text-neutral-500">Students Present</span>
                <span className="font-semibold text-blue-400">1,141 / 1,240</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[12px] mb-2">
                <span className="text-neutral-500">Staff Present</span>
                <span className="font-semibold text-emerald-400">79 / 86</span>
              </div>
              <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full w-[91%] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
              </div>
            </div>

          </div>

          {/* Recent Students */}
          <p className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider mb-3">
            Recent
          </p>

          <div className="space-y-2">
            {recentStudents.map((s, i) => (

              <div key={i} className="flex items-center justify-between px-3 py-2.5 bg-neutral-950/60 rounded-xl">

                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                    style={{ background: `hsl(${i * 60}, 55%, 30%)` }}
                  >
                    {s.name[0]}
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold">{s.name}</p>
                    <p className="text-[10px] text-neutral-500">{s.dept}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg ${statusStyle[s.status as StatusType].text} ${statusStyle[s.status as StatusType].bg}`}>
                  {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                </span>

              </div>

            ))}
          </div>

          <button
            onClick={() => router.push("/dashboard/admin/attendance")}
            className="w-full mt-4 py-2.5 text-[12px] font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/15 rounded-xl transition-all duration-200"
          >
            View Full Attendance →
          </button>

        </section>


        {/* Notices + Dept Card */}
        <div className="space-y-6">

          {/* Notices */}
          <section className="bg-neutral-900 border border-neutral-800/60 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[15px] font-semibold">Recent Notices</h2>
              <button
                onClick={() => router.push("/dashboard/admin/notices/new")}
                className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 bg-blue-500/10 hover:bg-blue-500/15 px-3 py-1.5 rounded-xl transition-all duration-200"
              >
                <Plus size={12} /> New
              </button>
            </div>

            <div className="space-y-3">
              {notices.map((notice, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border-l-2 ${notice.border} ${notice.bg} cursor-pointer hover:opacity-80 transition-opacity`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[12px] font-semibold leading-snug flex-1">{notice.title}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg flex-shrink-0 ${notice.bg} ${notice.color}`}>
                      {notice.tag}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-1.5">{notice.time}</p>
                </div>
              ))}
            </div>

          </section>

          {/* Department Overview */}
          <section className="bg-neutral-900 border border-neutral-800/60 rounded-2xl p-6">

            <h2 className="text-[15px] font-semibold mb-5">Department Overview</h2>

            <div className="grid grid-cols-2 gap-3">
              {departments.map((dept, i) => (
                <div key={i} className="bg-neutral-950/60 rounded-xl p-3.5">
                  <p className="text-[11px] text-neutral-500 mb-1">{dept.name}</p>
                  <p className="text-xl font-bold">{dept.count}</p>
                  <div className="mt-2 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${dept.color} rounded-full`}
                      style={{ width: `${(dept.count / dept.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </section>

        </div>

      </div>

    </div>

  );

}