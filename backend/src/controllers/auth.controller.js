const { registerUser, loginUser } = require("../services/auth.service");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await registerUser(name, email, password, role);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await loginUser(email, password);

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login };