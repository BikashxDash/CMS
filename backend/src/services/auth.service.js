/*
====================================================
AUTHENTICATION SERVICE
----------------------------------------------------
This file contains the business logic for:

• User Registration
• User Login

Purpose:
Separate authentication logic from controllers.

Architecture Flow:

Route
  ↓
Controller
  ↓
Service (this file)
  ↓
Model (database queries)
====================================================
*/


// Import bcrypt for password hashing and comparison
const bcrypt = require("bcrypt");

// Import database model functions
const {
  findUserByEmail,
  createUser
} = require("../models/user.model");



/*
====================================================
REGISTER USER SERVICE
----------------------------------------------------
Creates a new user account.

Steps:
1. Check if email already exists
2. Hash password for security
3. Insert user into database
4. Return created user
====================================================
*/
const registerUser = async (name, email, password, role) => {

  /*
  ----------------------------------------
  STEP 1: CHECK IF USER ALREADY EXISTS
  ----------------------------------------
  Prevent duplicate accounts with same email
  */
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }


  /*
  ----------------------------------------
  STEP 2: HASH PASSWORD
  ----------------------------------------
  Passwords must never be stored in plain text.

  bcrypt.hash(password, saltRounds)

  saltRounds = 10 → recommended security level
  */
  const hashedPassword = await bcrypt.hash(password, 10);


  /*
  ----------------------------------------
  STEP 3: CREATE USER IN DATABASE
  ----------------------------------------
  Calls the model function which executes SQL
  */
  const user = await createUser(
    name,
    email,
    hashedPassword,
    role
  );


  /*
  ----------------------------------------
  STEP 4: RETURN CREATED USER
  ----------------------------------------
  */
  return user;
};




/*
====================================================
LOGIN USER SERVICE
----------------------------------------------------
Authenticates user credentials.

Steps:
1. Find user by email
2. Compare password with hashed password
3. Return user if authentication successful
====================================================
*/
const loginUser = async (email, password) => {

  /*
  ----------------------------------------
  STEP 1: FIND USER BY EMAIL
  ----------------------------------------
  */
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }


  /*
  ----------------------------------------
  STEP 2: VERIFY PASSWORD
  ----------------------------------------
  bcrypt.compare() compares plaintext password
  with hashed password stored in database
  */
  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }


  /*
  ----------------------------------------
  STEP 3: RETURN AUTHENTICATED USER
  ----------------------------------------
  JWT token generation usually happens
  inside controller after this step.
  */
  return user;
};



/*
====================================================
EXPORT SERVICE FUNCTIONS
----------------------------------------------------
Allows controllers to use authentication logic.

Example usage in controller:

const user = await loginUser(email, password);
====================================================
*/
module.exports = {
  registerUser,
  loginUser
};