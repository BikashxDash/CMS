"use client";

/*
====================================
QUICK ACTION BUTTONS
====================================
*/

import { Users, Bell, Settings } from "lucide-react";

export default function QuickActions() {

  const actions = [
    { title: "Manage Students", icon: Users },
    { title: "Create Notice", icon: Bell },
    { title: "System Settings", icon: Settings }
  ];

  return (

    <div className="grid md:grid-cols-3 gap-6">

      {actions.map((item, index) => {

        const Icon = item.icon;

        return (

          <div
            key={index}
            className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800
                       hover:bg-neutral-800 transition cursor-pointer"
          >

            <Icon size={20} className="mb-3"/>

            <h3 className="font-semibold">
              {item.title}
            </h3>

          </div>

        );

      })}

    </div>

  );

}