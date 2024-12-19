const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/userController"); // Import the function

// CORS configuration for user routes
const cors = require("cors");

// Allow specific origin and method only for the /login route
const userRoutesCorsOptions = {
  origin: ["https://specific-origin.com"], // Replace with your allowed frontend URL
  methods: ["POST"], // Only allow POST requests for login
};

// Example route for user login (with CORS)
router.post("/login", cors(userRoutesCorsOptions), (req, res) => {
  const { username, password } = req.body;

  // Login logic: You should replace this with actual authentication logic
  if (username === "testuser" && password === "password123") {
    // Success: Respond with a success message or a token
    return res.json({ message: "User logged in successfully!" });
  } else {
    // Failure: Respond with an error message
    return res.status(401).json({ error: "Invalid username or password" });
  }
});

// Example route for user registration (no specific CORS restrictions, global CORS from app.js)
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Registration logic: Validate inputs and save the user to the database
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields" });
  }

  // Ideally, you should hash the password and save user to your database
  // This is just a simple simulation
  return res.status(201).json({ message: "User registered successfully!" });
});

// Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await getAllUsers(); // Call the function from the controller
    return res.status(200).json({ message: "Users retrieved", data: users });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({ message: "Error retrieving users" });
  }
});

module.exports = router;
