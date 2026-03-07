/*
====================================================
POSTGRESQL DATABASE CONNECTION CONFIGURATION
----------------------------------------------------
This file creates and exports a PostgreSQL
connection pool using the 'pg' library.

Purpose:
• Connect backend to PostgreSQL database
• Manage multiple DB connections efficiently
• Allow other files to execute queries

Used in:
controllers
services
routes
====================================================
*/


// Import PostgreSQL Pool class
const { Pool } = require("pg");


/*
========================================
CREATE DATABASE CONNECTION POOL
----------------------------------------
connectionString is read from .env file

Example:
DATABASE_URL=postgres://user:password@host:port/database
========================================
*/

const pool = new Pool({

  connectionString: process.env.DATABASE_URL,

});


/*
========================================
TEST DATABASE CONNECTION
----------------------------------------
Attempts to connect when server starts.

If successful:
→ "Database connected" printed in console

If failed:
→ error printed in console
========================================
*/

pool.connect()

  .then(() => console.log("Database connected"))

  .catch((err) => console.error("Connection error", err));


/*
========================================
EXPORT DATABASE POOL
----------------------------------------
Allows other files to use this connection.

Example usage in controllers:

const pool = require("../config/db");
const result = await pool.query("SELECT * FROM users");
========================================
*/

module.exports = pool;