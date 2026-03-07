import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Security component (auto logout after inactivity)
import InactivityLogout from "@/components/security/InactivityLogout";

/*
========================================
  Google Fonts Configuration
========================================
*/

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*
========================================
  Page Metadata
========================================
*/

export const metadata: Metadata = {
  title: "KMBB College CMS",
  description: "College Management System",
};

/*
========================================
  ROOT LAYOUT
  Applied to entire application
========================================
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
        `}
      >

        {/* 
          Inactivity logout system
          Auto logout after 2 hours of inactivity
          Applies to entire app
        */}
        <InactivityLogout />

        {/* All pages render here */}
        {children}

      </body>

    </html>
  );
}