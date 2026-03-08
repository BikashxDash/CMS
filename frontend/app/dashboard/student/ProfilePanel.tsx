"use client";

/*
========================================
STUDENT PROFILE PANEL
----------------------------------------
Features:
• Pencil icon → Edit mode
• Normal mode → Label + Value view
• Edit mode → Fields
• Only phone/email/password editable
• Password eye toggle
• Profile pic preview
• Change / Remove pic only edit mode
• Logout hidden in edit mode
• Update + Cancel actions
========================================
*/

import { X, Pencil, LogOut, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function ProfilePanel({
  open,
  onClose,
  profileImage,
  setProfileImage
}: any) {

  const [preview, setPreview] = useState(false);
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


  const handleUpload = (e:any) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setProfileImage(url);
  };


  const removePhoto = () => {
    setProfileImage(null);
  };


  return (

    <div className={`fixed inset-0 z-50 ${open ? "visible" : "invisible"}`}>

      {/* Background overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />



      {/* PROFILE PANEL */}
      <div className={`absolute right-6 top-6 bottom-6 w-96 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"} `} >

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">

          <h2 className="text-lg font-semibold">
            Profile
          </h2>

          <div className="flex gap-4">

            <button onClick={() => setEditMode(true)}>
              <Pencil size={18}/>
            </button>

            <button onClick={onClose}>
              <X size={20}/>
            </button>

          </div>

        </div>



        <div className="p-6 flex-1 overflow-y-auto">

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center mb-6">

            <div
              onClick={() => profileImage && setPreview(true)}
              className="w-24 h-24 rounded-full bg-neutral-300 overflow-hidden cursor-pointer"
            >

              {profileImage && (
                <img
                  src={profileImage}
                  className="w-full h-full object-cover"
                />
              )}

            </div>

            <p className="font-semibold mt-3">
              {student.name}
            </p>

            <p className="text-sm text-neutral-500">
              Student
            </p>



            {/* IMAGE OPTIONS */}
            {editMode && (

              <div className="flex gap-4 mt-3 text-sm">

                <label className="cursor-pointer text-blue-500">

                  Change pic

                  <input
                    type="file"
                    hidden
                    onChange={handleUpload}
                  />

                </label>

                {profileImage && (
                  <button
                    onClick={removePhoto}
                    className="text-red-500"
                  >
                    Remove pic
                  </button>
                )}

              </div>

            )}

          </div>



          {/* DETAILS */}
          <div className="space-y-4 text-sm">

            {/* STUDENT ID */}
            {editMode ? (
              <input
                value={student.id}
                disabled
                className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded opacity-70"
              />
            ) : (
              <p><span className="text-neutral-400">Student ID :</span> {student.id}</p>
            )}


            {/* BRANCH */}
            {editMode ? (
              <input
                value={student.branch}
                disabled
                className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded opacity-70"
              />
            ) : (
              <p><span className="text-neutral-400">Branch :</span> {student.branch}</p>
            )}


            {/* YEAR */}
            {editMode ? (
              <input
                value={student.year}
                disabled
                className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded opacity-70"
              />
            ) : (
              <p><span className="text-neutral-400">Year :</span> {student.year}</p>
            )}


            {/* SEMESTER */}
            {editMode ? (
              <input
                value={student.semester}
                disabled
                className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded opacity-70"
              />
            ) : (
              <p><span className="text-neutral-400">Semester :</span> {student.semester}</p>
            )}


            {/* BLOOD GROUP */}
            {editMode ? (
              <input
                value={student.blood}
                disabled
                className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded opacity-70"
              />
            ) : (
              <p><span className="text-neutral-400">Blood Group :</span> {student.blood}</p>
            )}


            {/* PHONE */}
            {editMode ? (
              <input
                name="phone"
                value={student.phone}
                onChange={handleChange}
                className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded"
              />
            ) : (
              <p><span className="text-neutral-400">Phone :</span> {student.phone}</p>
            )}


            {/* EMAIL */}
            {editMode ? (
              <input
                name="email"
                value={student.email}
                onChange={handleChange}
                className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded"
              />
            ) : (
              <p><span className="text-neutral-400">Email :</span> {student.email}</p>
            )}


            {/* PASSWORD */}
            {editMode ? (

              <div className="relative bg-neutral-100 dark:bg-neutral-800 rounded p-2">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={student.password}
                  onChange={handleChange}
                  placeholder="Change password"
                  className="w-full bg-transparent outline-none pr-8"
                />

                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2"
                >
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>

              </div>

            ) : (
              <p><span className="text-neutral-400">Password :</span> ********</p>
            )}

          </div>



          {/* ACTIONS */}
          {editMode ? (

            <div className="flex gap-6 text-sm p-6 border-t border-neutral-200 dark:border-neutral-800">

              <button className="text-green-600">
                Update
              </button>

              <button
                onClick={() => setEditMode(false)}
                className="text-red-500"
              >
                Cancel
              </button>

            </div>

          ) : (

            <div className="mt-8 flex items-center gap-2 text-red-500 cursor-pointer">

              <LogOut size={18}/>
              <span>Logout</span>

            </div>

          )}

        </div>

      </div>



      {/* IMAGE PREVIEW */}
      {preview && (

        <div
          onClick={() => setPreview(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >

          <img
            src={profileImage}
            className="max-w-md rounded-lg"
          />

        </div>

      )}

    </div>

  );

}