const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");
const { Languages } = require("lucide-react");

/*
========================================
  ACTIVATE ACCOUNT
  POST /api/auth/activate
========================================
*/
exports.activateAccount = async (req, res) => {
  try {
    const { userId, email, dob, password } = req.body;

    if (!userId || !email || !dob || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `SELECT * FROM users 
       WHERE user_id = $1 
       AND LOWER(email) = LOWER($2) 
       AND dob = $3`,
      [userId, email, dob]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    if (user.is_activated) {
      return res.status(400).json({
        message: "Account already activated",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `UPDATE users 
       SET password = $1, is_activated = true 
       WHERE user_id = $2`,
      [hashedPassword, userId]
    );

    return res.status(200).json({
      message: "Account activated successfully",
    });

  } catch (error) {
    console.error("Activation Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};


/*
========================================
  LOGIN
  POST /api/auth/login
========================================
*/
exports.login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const user = result.rows[0];

    if (!user.is_activated) {
      return res.status(400).json({
        message: "Account not activated",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    /*
    ========================================
      ADMIN LOGIN → OTP SYSTEM
    ========================================
    */
    if (user.role === "admin") {

      // delete expired OTPs
      await pool.query(
        "DELETE FROM otps WHERE expires_at < NOW()"
      );

      // rate limit (1 OTP per minute)
      const recentOtp = await pool.query(
        `SELECT * FROM otps
         WHERE user_id = $1
         AND created_at > NOW() - INTERVAL '60 seconds'`,
        [user.user_id]
      );

      if (recentOtp.rows.length > 0) {
        return res.status(429).json({
          message: "Please wait before requesting another OTP",
        });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const hashedOtp = await bcrypt.hash(otp, 10);

      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      await pool.query(
        `INSERT INTO otps (user_id, otp, expires_at)
         VALUES ($1,$2,$3)`,
        [user.user_id, hashedOtp, expiresAt]
      );

      // send response immediately
      res.status(200).json({
        message: "OTP sent to registered email",
        requireOtp: true,
      });

      // send email in background
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "KMBB Admin Login OTP",
        html: `
          <h3>Your Admin Login OTP</h3>
          <h2>${otp}</h2>
          <p>This OTP will expire in 5 minutes.</p>
        `,
      }).catch(err => {
        console.error("Email Error:", err);
      });

      // send SMS in background (Fast2SMS)
      if (user.phone) {
        fetch("https://www.fast2sms.com/dev/bulkV2", {
          method: "POST",
          headers: {
            "authorization": process.env.FAST2SMS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route: "q",
            message:`Your Login OTP is: ${otp}.Valid for 5 minutes.`,
            // variables_values: otp,
            numbers: user.phone,
            languages:"english",
            flash:0,
          }),
        })
        .then(res => res.json())
        .then(data => console.log("SMS sent:", data))
        .catch(err => console.error("SMS Error:", err));
      }

      return;
    }

    /*
    ========================================
      STUDENT / STAFF LOGIN
    ========================================
    */

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};


/*
========================================
  VERIFY OTP
  POST /api/auth/verify-otp
========================================
*/
exports.verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `SELECT * FROM otps
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const record = result.rows[0];

    if (record.attempts >= 5) {
      return res.status(403).json({
        message: "Too many wrong attempts",
      });
    }

    if (new Date() > record.expires_at) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    const isMatch = await bcrypt.compare(otp, record.otp);

    if (!isMatch) {

      await pool.query(
        "UPDATE otps SET attempts = attempts + 1 WHERE id = $1",
        [record.id]
      );

      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    const userResult = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );

    const user = userResult.rows[0];

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    await pool.query(
      "DELETE FROM otps WHERE user_id = $1",
      [userId]
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (error) {
    console.error("OTP Verify Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};