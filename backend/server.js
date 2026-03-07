/*
====================================================
SERVER ENTRY POINT
----------------------------------------------------
This file starts the backend server.

Responsibilities:
• Load environment variables
• Import Express application
• Start server on specified port

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


/*
========================================
LOAD ENVIRONMENT VARIABLES
----------------------------------------
dotenv loads variables from the .env file
into process.env.

Example .env file:

PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/CMS
JWT_SECRET=mysecretkey
EMAIL_USER=example@gmail.com
EMAIL_PASS=app_password
========================================
*/
require("dotenv").config();


/*
========================================
IMPORT EXPRESS APPLICATION
----------------------------------------
The Express app is configured in src/app.js.

This includes:
• middleware
• routes
• database connection
*/
const app = require("./src/app");



/*
========================================
DEFINE SERVER PORT
----------------------------------------
If PORT exists in .env → use it
Otherwise default to 5000
*/
const PORT = process.env.PORT || 5000;



/*
========================================
START EXPRESS SERVER
----------------------------------------
app.listen() starts the backend server
and listens for incoming requests.
*/
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});