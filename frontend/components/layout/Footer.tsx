/*
====================================================
FOOTER COMPONENT
----------------------------------------------------
This component renders the footer section of the site.

Purpose:
• Display copyright information
• Maintain consistent footer across pages
• Support light and dark themes
====================================================
*/

export default function Footer() {

  return (

    /*
    ========================================
    FOOTER CONTAINER
    ----------------------------------------
    border-t → top border separator
    light mode → neutral-200
    dark mode → neutral-800
    ========================================
    */
    <footer className="border-t border-neutral-200 dark:border-neutral-800">

      {/* ====================================
          FOOTER CONTENT WRAPPER
          ==================================== */}
      <div
        className="
          max-w-6xl        /* limit content width */
          mx-auto          /* center horizontally */
          px-6             /* horizontal padding */
          py-4             /* vertical padding */
          text-sm          /* smaller text size */
          text-neutral-500 dark:text-neutral-400
          text-center      /* center text */
        "
      >

        {/* ====================================
            COPYRIGHT TEXT
            ------------------------------------
            new Date().getFullYear()
            automatically updates the year
            ==================================== */}
        © {new Date().getFullYear()} College Name. All rights reserved.

      </div>

    </footer>

  );

}