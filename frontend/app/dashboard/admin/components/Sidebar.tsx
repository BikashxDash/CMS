"use client";

/*
====================================
ADMIN SIDEBAR
------------------------------------
Features:
• Collapsible sidebar
• Active route highlight
• Smooth transitions
• Logout button
====================================
*/

import {
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  BookOpen,
  BarChart,
  ClipboardCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  UserCog
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {

  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  /*
  ====================================
  MAIN MENU ITEMS
  ====================================
  */
  const menu = [
    { name: "Dashboard",   icon: LayoutDashboard,  href: "/dashboard/admin" },
    { name: "Students",    icon: Users,             href: "/dashboard/admin/students" },
    { name: "Staff",       icon: UserCog,           href: "/dashboard/admin/staff" },
    { name: "Attendance",  icon: ClipboardCheck,    href: "/dashboard/admin/attendance" },
    { name: "Notices",     icon: Bell,              href: "/dashboard/admin/notices" },
    { name: "Timetable",   icon: BookOpen,          href: "/dashboard/admin/timetable" },
    { name: "Reports",     icon: BarChart,          href: "/dashboard/admin/reports" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (

    <aside
      className={`
        ${collapsed ? "w-[70px]" : "w-64"}
        h-screen bg-neutral-950 text-white flex flex-col
        border-r border-neutral-800/60
        transition-all duration-300 ease-in-out
        flex-shrink-0
      `}
    >

      {/* ====================================
          TOP SECTION - LOGO
      ==================================== */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-neutral-800/60">

        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
              K
            </div>
            <div>
              <h1 className="text-[15px] font-semibold tracking-tight">KMBB CMS</h1>
              <p className="text-[10px] text-neutral-500">Admin Panel</p>
            </div>
          </div>
        )}

        {collapsed && (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold mx-auto">
            K
          </div>
        )}

        {/* Collapse Toggle */}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white transition-all duration-200"
          >
            <ChevronLeft size={14} />
          </button>
        )}

      </div>

      {/* Expand button when collapsed */}
      {collapsed && (
        <div className="flex justify-center pt-3">
          <button
            onClick={() => setCollapsed(false)}
            className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-white transition-all duration-200"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}


      {/* ====================================
          NAVIGATION
      ==================================== */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">

        {menu.map((item, index) => {

          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <button
              key={index}
              onClick={() => router.push(item.href)}
              className={`
                w-full flex items-center gap-3 px-3 py-[10px] rounded-2xl
                transition-all duration-200 text-left
                ${isActive
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                }
                ${collapsed ? "justify-center" : ""}
              `}
              title={collapsed ? item.name : ""}
            >

              <Icon size={17} className="flex-shrink-0" />

              {!collapsed && (
                <span className="text-[13px] font-medium">
                  {item.name}
                </span>
              )}

              {/* Active dot */}
              {!collapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}

            </button>
          );

        })}

      </nav>


      {/* ====================================
          BOTTOM SECTION
      ==================================== */}
      <div className={`px-3 pb-4 pt-3 border-t border-neutral-800/60 space-y-1`}>

        {/* Settings */}
        <button
          onClick={() => router.push("/dashboard/admin/settings")}
          className={`
            w-full flex items-center gap-3 px-3 py-[10px] rounded-2xl
            text-neutral-400 hover:bg-neutral-900 hover:text-white
            transition-all duration-200
            ${collapsed ? "justify-center" : ""}
          `}
          title={collapsed ? "Settings" : ""}
        >
          <Settings size={17} className="flex-shrink-0" />
          {!collapsed && <span className="text-[13px] font-medium">Settings</span>}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-3 py-[10px] rounded-2xl
            text-red-400/80 hover:bg-red-500/10 hover:text-red-400
            transition-all duration-200
            ${collapsed ? "justify-center" : ""}
          `}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut size={17} className="flex-shrink-0" />
          {!collapsed && <span className="text-[13px] font-medium">Logout</span>}
        </button>

        {/* Admin Avatar */}
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-3 mt-1 bg-neutral-900/60 rounded-2xl">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
              A
            </div>
            <div>
              <p className="text-[12px] font-semibold text-white">Admin</p>
              <p className="text-[10px] text-neutral-500">Super Admin</p>
            </div>
          </div>
        )}

      </div>

    </aside>

  );

}