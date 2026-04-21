/*
====================================================
DATABASE CONNECTION (PostgreSQL + Neon)
----------------------------------------------------
• Uses pg Pool for connection management
• Reads DATABASE_URL from .env
• SSL enabled (required for Neon cloud DB)
• Exports pool for queries across project
====================================================
*/

const { Pool } = require("pg");

/*
====================================================
CREATE DATABASE POOL
----------------------------------------------------
• connectionString → full DB URL from .env
• ssl → required for Neon (secure connection)
====================================================
*/
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/*
====================================================
TEST CONNECTION (on server start)
----------------------------------------------------
• Checks if DB is connected successfully
• Logs status in terminal
====================================================
*/
pool.connect()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err.message);
  });

/*
====================================================
EXPORT POOL
----------------------------------------------------
• Use this pool in controllers/models
• Example:
    pool.query("SELECT * FROM users")
====================================================
*/
module.exports = pool;