"use client";

/*
====================================================
INACTIVITY AUTO LOGOUT COMPONENT
----------------------------------------------------
Purpose:
Automatically logs out a user if there is no
activity for a specified time (2 hours).

Activity includes:
• mouse movement
• keyboard input
• clicking
• scrolling

If user is inactive for 2 hours:
→ token removed
→ role removed
→ redirect to login page

Used globally inside layout.tsx
====================================================
*/

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InactivityLogout() {

  /*
  ========================================
  ROUTER
  Used to redirect user after logout
  ========================================
  */
  const router = useRouter();


  /*
  ========================================
  ACTIVITY TRACKER
  Runs once when component mounts
  ========================================
  */
  useEffect(() => {

    // timer reference
    let timeout: NodeJS.Timeout;


    /*
    ========================================
    LOGOUT FUNCTION
    Clears auth data and redirects user
    ========================================
    */
    const logout = () => {

      // remove authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // redirect to login page
      router.replace("/auth/login");

    };


    /*
    ========================================
    RESET TIMER FUNCTION
    Called whenever user performs activity
    ========================================
    */
    const resetTimer = () => {

      // clear previous timer
      clearTimeout(timeout);

      // start new inactivity timer
      timeout = setTimeout(

        logout,

        2 * 60 * 60 * 1000 // 2 hours (in milliseconds)

      );

    };


    /*
    ========================================
    ACTIVITY EVENT LISTENERS
    Tracks user interaction
    ========================================
    */

    window.addEventListener("mousemove", resetTimer); // mouse movement
    window.addEventListener("keydown", resetTimer);   // keyboard input
    window.addEventListener("click", resetTimer);     // mouse click
    window.addEventListener("scroll", resetTimer);    // page scroll


    // start timer immediately when page loads
    resetTimer();


    /*
    ========================================
    CLEANUP FUNCTION
    Runs when component unmounts
    Prevents memory leaks
    ========================================
    */
    return () => {

      clearTimeout(timeout);

      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);

    };

  }, []);


  /*
  ========================================
  COMPONENT DOES NOT RENDER UI
  Only runs background logic
  ========================================
  */
  return null;

}