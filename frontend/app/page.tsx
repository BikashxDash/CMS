/*
====================================================
HOME / LANDING PAGE
----------------------------------------------------
This is the public entry page of the CMS.

Purpose:
• Show college branding
• Provide entry point to Sign In / Sign Up
• Display welcome message
• Present hero section with background image

Components used:
• Navbar
• Footer
====================================================
*/

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Home() {

  return (

    /*
    ========================================
    MAIN PAGE CONTAINER
    ----------------------------------------
    min-h-screen → full viewport height
    flex-col → vertical layout
    supports light and dark mode
    ========================================
    */
    <main className="min-h-screen flex flex-col
                     bg-white dark:bg-neutral-900
                     text-neutral-900 dark:text-neutral-100">

      {/* ====================================
          TOP NAVIGATION BAR
          ==================================== */}
      <Navbar />


      {/* ====================================
          HERO SECTION
          Main welcome area
          ==================================== */}
      <section
        className="relative flex-1 flex flex-col
                   items-center justify-center
                   text-center px-6
                   pt-28 md:pt-32
                   overflow-hidden"
      >


        {/* ====================================
            BACKGROUND IMAGE
            Covers entire hero section
            ==================================== */}
        <div
          className="absolute inset-0 bg-cover bg-center"

          style={{
            backgroundImage: "url('/new college pic.jpg')"
          }}
        />


        {/* ====================================
            DARK OVERLAY
            Improves text visibility
            ==================================== */}
        <div
          className="absolute inset-0
                     bg-gradient-to-b
                     from-black/70
                     via-black/50
                     to-black/70"
        />


        {/* ====================================
            HERO CONTENT
            Main welcome text
            ==================================== */}
        <div className="relative z-10 text-white">

          {/* Welcome Title */}
          <h1
            className="text-4xl md:text-6xl
                       font-semibold
                       tracking-tight
                       leading-tight
                       mb-4"
          >
            Welcome to
          </h1>


          {/* College Name */}
          <div className="mb-6">

            <h2
              className="text-5xl md:text-7xl
                         font-bold
                         tracking-tight"
            >
              KMBB
            </h2>


            <p
              className="text-2xl md:text-3xl
                         font-semibold
                         tracking-tight
                         mt-2"
            >
              College of Engineering and Technology
            </p>

          </div>


          {/* ====================================
              OPTIONAL DESCRIPTION
              (Currently commented)
              ==================================== */}

          {/*
          <p className="max-w-lg text-base md:text-lg leading-relaxed mx-auto">
            A modern college management platform designed for students,
            staff, and administrators.
          </p>
          */}

        </div>

      </section>


      {/* ====================================
          FOOTER SECTION
          ==================================== */}
      <Footer />

    </main>
  );

}