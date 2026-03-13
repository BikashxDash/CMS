/*
========================================
CMS FOOTER
----------------------------------------
Sections:
• About Platform
• Platform Links
• College Website
• Contact + Social
========================================
*/

import Link from "next/link";

export default function Footer() {

  return (

    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        {/* ABOUT PLATFORM */}

        <div>

          <h3 className="font-semibold mb-3">
            About Platform
          </h3>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            This college management system helps students,
            teachers and administrators manage attendance,
            notices, timetable and academic activities
            efficiently.
          </p>

        </div>



        {/* PLATFORM LINKS */}

        <div>

          <h3 className="font-semibold mb-3">
            Platform
          </h3>

          <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">

            <li className="hover:text-black dark:hover:text-white cursor-pointer">
              <Link href="/auth/login" className="hover:text-black dark:hover:text-white">
                Sign In
              </Link>
            </li>

            <li className="hover:text-black dark:hover:text-white cursor-pointer">
              <Link href="/auth/activate" className="hover:text-black dark:hover:text-white">
                Activate Account
              </Link>
            </li>

            <li className="hover:text-black dark:hover:text-white cursor-pointer">
              Notices
            </li>

          </ul>

        </div>



        {/* MAIN COLLEGE WEBSITE */}

        <div>

          <h3 className="font-semibold mb-3">
            College
          </h3>

          <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">

            <li className="hover:text-black dark:hover:text-white cursor-pointer">
              <a
                href="https://kmbb.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black dark:hover:text-white"
              >
                Website
              </a>
            </li>

            <li className="hover:text-black dark:hover:text-white cursor-pointer">
              <a
                href="https://youtube.com/@kmbb"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black dark:hover:text-white"
              >
                YouTube Channel
              </a>
            </li>

          </ul>

        </div>



        {/* CONTACT */}

        <div>

          <h3 className="font-semibold mb-3">
            Contact
          </h3>

          <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">

            <li>📍 Bhubaneswar, Odisha</li>

            <li>📞 +91 XXXXX XXXXX</li>

            <li>📧 info@kmbb.in</li>

          </ul>

        </div>

      </div>



      {/* BOTTOM BAR */}

      <div className="border-t border-neutral-200 dark:border-neutral-800">

        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Social Links */}

          <div className="flex gap-5 text-sm text-neutral-600 dark:text-neutral-400">

            <span className="cursor-pointer hover:text-black dark:hover:text-white">
              Facebook
            </span>

            <span className="cursor-pointer hover:text-black dark:hover:text-white">
              Instagram
            </span>

            <span className="cursor-pointer hover:text-black dark:hover:text-white">
              LinkedIn
            </span>

            <span className="cursor-pointer hover:text-black dark:hover:text-white">
              YouTube
            </span>

          </div>



          {/* Copyright */}

          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">

            © {new Date().getFullYear()} KMBB College of Engineering and Technology 
              |  All Rights Reserved    

          </p>

        </div>

      </div>

    </footer>

  );

}