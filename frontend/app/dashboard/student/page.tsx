"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "student") {
      router.replace("/auth/login");
    } else {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) {
    return null; // nothing render until check complete
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-semibold">
        Student Dashboard
      </h1>
    </div>
  );
}