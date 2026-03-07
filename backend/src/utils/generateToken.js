/*
====================================================
JWT TOKEN GENERATOR
----------------------------------------------------
This utility function creates a JSON Web Token (JWT)
for authenticated users.

Purpose:
• Provide secure authentication token
• Store user identity inside token
• Allow protected route access

Used in:
Login
OTP verification
====================================================
*/


// Import JSON Web Token library
const jwt = require("jsonwebtoken");


/*
====================================================
GENERATE TOKEN FUNCTION
----------------------------------------------------
Creates a signed JWT token containing user data.

Parameters:
user → authenticated user object

Returns:
JWT token string
====================================================
*/
const generateToken = (user) => {

  return jwt.sign(

    /*
    ----------------------------------------
    TOKEN PAYLOAD
    ----------------------------------------
    Data stored inside the token
    */
    {
      id: user.id,
      role: user.role
    },


    /*
    ----------------------------------------
    SECRET KEY
    ----------------------------------------
    Used to sign and verify the token.

    Stored in .env file for security.
    */
    process.env.JWT_SECRET,


    /*
    ----------------------------------------
    TOKEN OPTIONS
    ----------------------------------------
    expiresIn → token validity period
    */
    {
      expiresIn: "1d" // token expires after 1 day
    }

  );

};


/*
====================================================
EXPORT FUNCTION
----------------------------------------------------
Allows controllers to generate JWT tokens.

Example usage:

const token = generateToken(user);
====================================================
*/
module.exports = generateToken;