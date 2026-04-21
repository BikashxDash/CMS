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

Allows:
- Local machine: http://localhost:3000, http://127.0.0.1:3000
- Team members: http://TEAM_IP:3000
- Development: http://TEAM_IP:*

For production, update this with specific URLs.
====================================================
*/
app.use(cors({

  // Allow requests from localhost and team members on internal network
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    // Allow localhost and 127.0.0.1 on any port
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }

    // Allow internal network IPs (192.168.x.x, 10.x.x.x, etc.)
    if (origin.match(/^http:\/\/(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/)) {
      return callback(null, true);
    }

    // Reject external origins
    callback(new Error('CORS not allowed'));
  },

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