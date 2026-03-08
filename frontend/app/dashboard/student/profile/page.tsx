"use client";

/*
========================================
STUDENT PROFILE PAGE (MOBILE VERSION)
----------------------------------------
This page opens only on mobile screens.
Desktop still uses ProfilePanel drawer.
========================================
*/

import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentProfilePage() {

  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [student, setStudent] = useState({
    name: "Aditya Sharma",
    id: "STU1001",
    branch: "CSE",
    year: "3rd",
    semester: "6",
    blood: "O+",
    phone: "9876543210",
    email: "student@mail.com",
    password: ""
  });

  const handleChange = (e:any) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

  };

  return (

    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900">

      {/* HEADER */}

      <div className="flex items-center gap-4 p-4 border-b border-neutral-200 dark:border-neutral-800">

        <button onClick={() => router.back()}>
          <ArrowLeft size={22}/>
        </button>

        <h1 className="text-lg font-semibold">
          Profile
        </h1>

      </div>



      <div className="p-6">

        {/* PROFILE IMAGE */}

        <div className="flex flex-col items-center mb-8">

          <div className="w-24 h-24 rounded-full bg-neutral-300"/>

          <p className="font-semibold mt-3">
            {student.name}
          </p>

          <p className="text-sm text-neutral-500">
            Student
          </p>

        </div>



        {/* PROFILE DETAILS */}

        <div className="space-y-4 text-sm">

          <p><span className="text-neutral-400">Student ID :</span> {student.id}</p>

          <p><span className="text-neutral-400">Branch :</span> {student.branch}</p>

          <p><span className="text-neutral-400">Year :</span> {student.year}</p>

          <p><span className="text-neutral-400">Semester :</span> {student.semester}</p>

          <p><span className="text-neutral-400">Blood Group :</span> {student.blood}</p>



          {/* PHONE */}

          {editMode ? (

            <input
              name="phone"
              value={student.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800"
            />

          ) : (

            <p>
              <span className="text-neutral-400">Phone :</span> {student.phone}
            </p>

          )}



          {/* EMAIL */}

          {editMode ? (

            <input
              name="email"
              value={student.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800"
            />

          ) : (

            <p>
              <span className="text-neutral-400">Email :</span> {student.email}
            </p>

          )}



          {/* PASSWORD */}

          {editMode ? (

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={student.password}
                onChange={handleChange}
                placeholder="Change password"
                className="w-full p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 pr-10"
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>

            </div>

          ) : (

            <p>
              <span className="text-neutral-400">Password :</span> ********
            </p>

          )}

        </div>



        {/* ACTIONS */}

        <div className="flex gap-6 mt-8">

          {editMode ? (

            <>
              <button className="text-green-600">
                Update
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="text-red-500"
              >
                Cancel
              </button>
            </>

          ) : (

            <button
              onClick={() => setEditMode(true)}
              className="text-blue-500"
            >
              Edit Profile
            </button>

          )}

        </div>

      </div>

    </div>

  );

}