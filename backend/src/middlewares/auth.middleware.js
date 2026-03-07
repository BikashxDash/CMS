const jwt = require("jsonwebtoken");

/*
========================================
  VERIFY JWT TOKEN
  Middleware to protect routes
========================================
*/

const protect = (req, res, next) => {

  // Authorization header example:
  // Authorization: Bearer TOKEN

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  try {

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid or expired token",
    });

  }
};


/*
========================================
  ADMIN PROTECTION
  Only allow admin access
========================================
*/

const protectAdmin = (req, res, next) => {

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};


/*
========================================
  STAFF PROTECTION
  Allow staff OR admin
========================================
*/

const protectStaff = (req, res, next) => {

  if (!req.user || (req.user.role !== "staff" && req.user.role !== "admin")) {
    return res.status(403).json({
      message: "Staff access required",
    });
  }

  next();
};


module.exports = {
  protect,
  protectAdmin,
  protectStaff
}; 