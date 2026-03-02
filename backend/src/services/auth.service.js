const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../models/user.model");

const registerUser = async (name, email, password, role) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser(name, email, hashedPassword, role);

  return user;
};

const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
};

module.exports = { registerUser, loginUser };