"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      router.replace("/auth/login");
    } else {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 p-8">
      <h1 className="text-3xl font-semibold mb-6 text-neutral-800 dark:text-white">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
          Manage Staff
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
          Manage Students
        </div>
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-800 shadow">
          System Settings
        </div>
      </div>
    </div>
  );
}