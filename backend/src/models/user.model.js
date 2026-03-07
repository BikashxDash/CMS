/*
====================================================
USER MODEL (DATABASE OPERATIONS)
----------------------------------------------------
This file contains database queries related to users.

Purpose:
• Find user by email
• Create new user
• Keep database logic separate from controllers

This improves:
- code readability
- maintainability
- modular architecture
====================================================
*/


// Import PostgreSQL connection pool
const pool = require("../config/db");


/*
====================================================
FIND USER BY EMAIL
----------------------------------------------------
Purpose:
Retrieve user information using email address.

Used in:
• login
• account verification
• duplicate email checks
====================================================
*/
const findUserByEmail = async (email) => {

  // Run SQL query using parameterized input
  const result = await pool.query(

    "SELECT * FROM users WHERE email=$1",

    [email] // prevents SQL injection

  );

  // Return first matched user
  return result.rows[0];

};



/*
====================================================
CREATE NEW USER
----------------------------------------------------
Purpose:
Insert a new user into the database.

Parameters:
name     → user's full name
email    → user's email address
password → hashed password
role     → user role (admin, staff, student)

Returns:
Newly created user information
====================================================
*/
const createUser = async (name, email, password, role) => {

  const result = await pool.query(

    `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role
    `,

    [name, email, password, role]

  );

  // Return newly created user
  return result.rows[0];

};



/*
====================================================
EXPORT FUNCTIONS
----------------------------------------------------
Allows controllers to use these database methods.

Example usage:

const { findUserByEmail } = require("../models/user.model");

const user = await findUserByEmail(email);
====================================================
*/
module.exports = {
  findUserByEmail,
  createUser
};