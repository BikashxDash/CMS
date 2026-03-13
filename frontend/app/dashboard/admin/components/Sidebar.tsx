"use client";

/*
====================================
ADMIN SIDEBAR
------------------------------------
Features:
• Fixed sidebar height
• Navigation menu
• Settings always at bottom
• Smooth hover effect
====================================
*/

import {
  LayoutDashboard,
  Users,
  Bell,
  Settings,
  BookOpen,
  BarChart
} from "lucide-react";

export default function Sidebar() {

  /*
  ====================================
  MAIN MENU ITEMS
  ====================================
  */
  const menu = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Students", icon: Users },
    { name: "Staff", icon: Users },
    { name: "Notices", icon: Bell },
    { name: "Timetable", icon: BookOpen },
    { name: "Reports", icon: BarChart }
  ];

  return (

    /*
    ====================================
    SIDEBAR CONTAINER
    ====================================
    */
    <aside className="w-64 h-screen bg-neutral-950 text-white flex flex-col border-r border-neutral-800">

      {/* ====================================
          TOP SECTION
      ==================================== */}
      <div className="p-6">

        {/* Logo */}
        <h1 className="text-xl font-semibold mb-10">
          KMBB CMS
        </h1>

        {/* Navigation */}
        <nav className="space-y-2">

          {menu.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl
                           hover:bg-neutral-800 cursor-pointer
                           transition duration-200"
              >

                <Icon size={18} />

                <span className="text-sm">
                  {item.name}
                </span>

              </div>
            );

          })}

        </nav>

      </div>


      {/* ====================================
          BOTTOM SECTION (SETTINGS)
      ==================================== */}
      <div className="mt-auto p-6 border-t border-neutral-800">

        <div
          className="flex items-center gap-3 p-3 rounded-xl
                     hover:bg-neutral-800 cursor-pointer
                     transition duration-200"
        >

          <Settings size={18} />

          <span className="text-sm">
            Settings
          </span>

        </div>

      </div>

    </aside>

  );

}