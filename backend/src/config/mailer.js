/*
====================================================
NODEMAILER EMAIL CONFIGURATION
----------------------------------------------------
This file sets up the email transporter using
Nodemailer.

Purpose:
• Send OTP emails
• Send system notifications
• Send password reset emails (future)

Current usage:
Admin Login OTP
====================================================
*/


// Import Nodemailer library
const nodemailer = require("nodemailer");


/*
========================================
CREATE EMAIL TRANSPORTER
----------------------------------------
This transporter is responsible for
sending emails from the backend.

Using:
Gmail SMTP service
========================================
*/

const transporter = nodemailer.createTransport({

  // Email service provider
  service: "gmail",

  auth: {

    // Gmail address (stored in .env)
    user: process.env.EMAIL_USER,

    // Gmail App Password (stored in .env)
    pass: process.env.EMAIL_PASS,

  },

});


/*
========================================
EXPORT TRANSPORTER
----------------------------------------
Allows other files to send emails.

Example usage in controller:

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: "OTP Verification",
  text: "Your OTP is 123456"
});
========================================
*/

module.exports = transporter;