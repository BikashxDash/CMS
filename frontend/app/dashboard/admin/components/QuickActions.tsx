"use client";

/*
====================================
QUICK ACTION BUTTONS
====================================
*/

import { UserPlus, Bell, ClipboardCheck, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuickActions() {

  const router = useRouter();

  const actions = [
    {
      title: "Add Student",
      icon: UserPlus,
      href: "/dashboard/admin/students/add",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      hover: "hover:bg-blue-500/15",
    },
    {
      title: "Add Staff",
      icon: UserCog,
      href: "/dashboard/admin/staff/add",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      hover: "hover:bg-emerald-500/15",
    },
    {
      title: "Post Notice",
      icon: Bell,
      href: "/dashboard/admin/notices/new",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      hover: "hover:bg-amber-500/15",
    },
    {
      title: "Mark Attendance",
      icon: ClipboardCheck,
      href: "/dashboard/admin/attendance",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      hover: "hover:bg-purple-500/15",
    },
  ];

  return (

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      {actions.map((item, index) => {

        const Icon = item.icon;

        return (
          <button
            key={index}
            onClick={() => router.push(item.href)}
            className={`
              flex items-center gap-3 p-4 rounded-2xl border
              ${item.bg} ${item.border} ${item.hover}
              transition-all duration-200 cursor-pointer text-left
              hover:-translate-y-0.5 active:scale-[0.98]
            `}
          >
            <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
              <Icon size={17} />
            </div>
            <span className={`text-[13px] font-semibold ${item.color}`}>
              {item.title}
            </span>
          </button>
        );

      })}

    </div>

  );

}