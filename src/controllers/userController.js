// controllers/userController.js
const { registerUser } = require("../models/userModel");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newUser = await registerUser(username, email, password);
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in registration:", error.message);
    return res.status(500).json({ message: "Error registering user" });
  }
};

module.exports = {
  register,
};
