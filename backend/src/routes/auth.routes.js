/*
====================================================
AUTHENTICATION ROUTES
----------------------------------------------------
This file defines all authentication related API
routes for the CMS backend.

These routes connect:

Frontend Request
        ↓
Express Route
        ↓
Controller Function
        ↓
Database Logic
====================================================
*/


// Import Express framework
const express = require("express");

/*
Create Express Router instance
Router helps organize routes separately
instead of putting everything in server.js
*/
const router = express.Router();


/*
Import authentication controller functions
These functions contain the actual logic
for each route.
*/
const {
  activateAccount,
  login,
  verifyOtp
} = require("../controllers/auth.controller");



/*
====================================================
ACCOUNT ACTIVATION ROUTE
----------------------------------------------------
POST /api/auth/activate

Purpose:
Allows students/staff to activate their account.

Frontend sends:
{
  userId,
  email,
  dob,
  password
}

Controller verifies details and activates account.
====================================================
*/
router.post("/activate", activateAccount);



/*
====================================================
LOGIN ROUTE
----------------------------------------------------
POST /api/auth/login

Purpose:
Authenticate user credentials.

Frontend sends:
{
  userId,
  password
}

Flow:
1. Check user exists
2. Verify password
3. If admin → send OTP
4. If staff/student → return JWT token
====================================================
*/
router.post("/login", login);



/*
====================================================
OTP VERIFICATION ROUTE
----------------------------------------------------
POST /api/auth/verify-otp

Purpose:
Verify OTP sent to admin email.

Frontend sends:
{
  userId,
  otp
}

Flow:
1. Verify OTP from database
2. Check expiry
3. Generate JWT token
4. Return admin access
====================================================
*/
router.post("/verify-otp", verifyOtp);



/*
====================================================
EXPORT ROUTER
----------------------------------------------------
Allows app.js to use these routes.

Example in app.js:

app.use("/api/auth", authRoutes)

Final API endpoints become:

POST /api/auth/activate
POST /api/auth/login
POST /api/auth/verify-otp
====================================================
*/
module.exports = router;