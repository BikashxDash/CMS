"use client";

/*
====================================
ADMIN DASHBOARD PAGE
====================================
*/

import DashboardCards from "./components/DashboardCards";
import QuickActions from "./components/QuickActions";

export default function AdminDashboard() {

  return (

    <div>

      {/* Quick actions */}
      <QuickActions />

      {/* Stats cards */}
      <div className="mt-10">
        <DashboardCards />
      </div>

    </div>

  );

}