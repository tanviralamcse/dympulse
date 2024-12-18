// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables
const pool = require("../config/db");


const contactRoutes = require("./routes/contactRoutes"); // Import routes

const app = express();

// Middleware setup
const allowedOrigins = [
  process.env.REACT_APP_API_URL,
  "http://localhost:3000", // For local development
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(bodyParser.json()); // Parse JSON request bodies

app.get("/debug-env", (req, res) => {
    res.json({ databaseUrl: process.env.DATABASE_URL || "Not Set" });
});

app.get("/", (req, res) => {
  res.send("API is running! Please use `/api` for endpoints.");
});

// // Route to test database connection
// app.get("/test", async (req, res) => {
//     try {
//       const result = await pool.query('SELECT NOW()'); // Simple query to test connection
//       res.status(200).json({
//         message: "Database connection is successful",
//         time: result.rows[0].now // Show current time from database to verify connection
//       });
//     } catch (error) {
//       console.error("Database connection error:", error);
//       res.status(500).json({
//         message: "Failed to connect to the database",
//         error: error.message
//       });
//     }
//   });

// Use Routes
//app.use("/api", contactRoutes); // Prefix all routes with /api

// Export app to use in server.js
module.exports = app;
