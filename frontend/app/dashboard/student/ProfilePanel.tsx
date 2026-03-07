"use client";

/*
========================================
STUDENT PROFILE PANEL
----------------------------------------
Features:
• Pencil icon → Edit mode
• Edit mode me sab data field me dikhega
• Sirf phone, email, password editable
• Password eye toggle
• Profile pic preview
• Change / Remove pic only edit mode
• Logout hide in edit mode
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

  /*
  ========================================
  STATES
  ========================================
  */

  // image preview modal
  const [preview, setPreview] = useState(false);

  // edit mode toggle
  const [editMode, setEditMode] = useState(false);

  // password visibility
  const [showPassword, setShowPassword] = useState(false);


  /*
  ========================================
  STUDENT DATA STATE
  (later database se load hoga)
  ========================================
  */

  const [student, setStudent] = useState({
    name: "Aditya Sharma",
    id: "STU1001",
    branch: "CSE",
    semester: "3",
    blood: "O+",
    phone: "9876543210",
    email: "student@mail.com",
    password: ""
  });



  /*
  ========================================
  HANDLE INPUT CHANGE
  ========================================
  */

  const handleChange = (e:any) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });

  };



  /*
  ========================================
  HANDLE IMAGE UPLOAD
  ========================================
  */

  const handleUpload = (e:any) => {

    const file = e.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setProfileImage(url);

  };



  /*
  ========================================
  REMOVE PROFILE PHOTO
  ========================================
  */

  const removePhoto = () => {

    setProfileImage(null);

  };



  return (

    <div className={`fixed inset-0 z-50 ${open ? "visible" : "invisible"}`}>

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />


      {/* PROFILE PANEL */}
      <div
        className={`
        absolute right-6 top-6 bottom-6
        w-96
        bg-white dark:bg-neutral-900
        rounded-3xl
        shadow-2xl
        transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">

          <h2 className="font-semibold text-lg">
            Profile
          </h2>

          <div className="flex gap-4">

            {/* EDIT BUTTON */}
            <button onClick={() => setEditMode(true)}>
              <Pencil size={18}/>
            </button>

            {/* CLOSE BUTTON */}
            <button onClick={onClose}>
              <X size={20}/>
            </button>

          </div>

        </div>



        <div className="p-6">

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

            {/* NAME BELOW IMAGE */}
            <p className="font-semibold mt-3">
              {student.name}
            </p>

            <p className="text-sm text-neutral-500">
              Student
            </p>



            {/* IMAGE EDIT OPTIONS */}
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
          <div className="space-y-3 text-sm">

            {/* ID */}
            <input
              value={student.id}
              disabled
              className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded outline-none opacity-70"
            />


            {/* BRANCH */}
            <input
              value={student.branch}
              disabled
              className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded outline-none opacity-70"
            />


            {/* SEMESTER */}
            <input
              value={student.semester}
              disabled
              className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded outline-none opacity-70"
            />


            {/* BLOOD GROUP */}
            <input
              value={student.blood}
              disabled
              className="w-full bg-neutral-100 dark:bg-neutral-800 p-2 rounded outline-none opacity-70"
            />


            {/* PHONE */}
            <input
              name="phone"
              value={student.phone}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full p-2 rounded outline-none ${
                editMode
                  ? "bg-neutral-100 dark:bg-neutral-800"
                  : "bg-transparent opacity-80"
              }`}
            />


            {/* EMAIL */}
            <input
              name="email"
              value={student.email}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full p-2 rounded outline-none ${
                editMode
                  ? "bg-neutral-100 dark:bg-neutral-800"
                  : "bg-transparent opacity-80"
              }`}
            />


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

              <input
                value="********"
                disabled
                className="w-full bg-transparent opacity-80 p-2 outline-none"
              />

            )}

          </div>



          {/* ACTIONS */}
          {editMode ? (

            <div className="flex gap-6 mt-8 text-sm">

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



      {/* IMAGE PREVIEW MODAL */}
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