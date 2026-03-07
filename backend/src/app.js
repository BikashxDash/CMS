/*
====================================================
EXPRESS APPLICATION SETUP
----------------------------------------------------
This file configures the main Express application.

Responsibilities:
• Initialize Express
• Configure middleware
• Enable CORS
• Connect routes
• Initialize database connection

Architecture Flow:

server.js
   ↓
app.js
   ↓
routes
   ↓
controllers
   ↓
database
====================================================
*/


// Import Express framework
const express = require("express");

// Import CORS middleware
const cors = require("cors");

// Import database connection
// This automatically runs db connection when server starts
require("./config/db");

// Import authentication routes
const authRoutes = require("./routes/auth.routes");


// Create Express application
const app = express();



/*
====================================================
CORS CONFIGURATION
----------------------------------------------------
CORS (Cross-Origin Resource Sharing) allows
frontend and backend running on different ports
to communicate.

Frontend:
http://localhost:3000

Backend:
http://localhost:5000
====================================================
*/
app.use(cors({

  // Allow requests only from frontend
  origin: "http://localhost:3000",

  // Allowed HTTP methods
  methods: ["GET", "POST"],

  // Allow cookies / authentication headers
  credentials: true

}));



/*
====================================================
JSON BODY PARSER
----------------------------------------------------
Allows backend to read JSON data sent from frontend.

Example frontend request:

fetch("/api/auth/login", {
  method: "POST",
  body: JSON.stringify(data)
})

Without this middleware → req.body undefined
====================================================
*/
app.use(express.json());



/*
====================================================
AUTHENTICATION ROUTES
----------------------------------------------------
All routes starting with:

/api/auth

will be handled by auth.routes.js

Example API endpoints:

POST /api/auth/login
POST /api/auth/activate
POST /api/auth/verify-otp
====================================================
*/
app.use("/api/auth", authRoutes);



/*
====================================================
HEALTH CHECK ROUTE
----------------------------------------------------
Basic route to check if backend server is running.

Open in browser:

http://localhost:5000
====================================================
*/
app.get("/", (req, res) => {

  res.send("CMS Backend Running...");

});



/*
====================================================
EXPORT EXPRESS APP
----------------------------------------------------
This allows server.js to start the server.

Example in server.js:

const app = require("./src/app");
app.listen(PORT)
====================================================
*/
module.exports = app;