const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Connection error", err));

module.exports = pool;