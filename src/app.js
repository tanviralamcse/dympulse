const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware setup for CORS
const allowedOrigins = [
  process.env.REACT_APP_API_URL,
  "http://localhost:3000", // For local development
];

// Enable CORS for all incoming requests
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests from the origins in allowedOrigins or no origin (for local testing)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"], // Allow methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true, // Allow cookies with requests if needed
  })
);

// Parse JSON request bodies
app.use(bodyParser.json());

// Log incoming requests (for debugging purposes)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Handle preflight requests (OPTIONS)
app.options("*", cors());  // Respond to preflight requests

// Define routes
app.use("/api", contactRoutes);
app.use("/api/users", userRoutes);

// Test route
app.get("/debug-env", (req, res) => {
  res.json({ databaseUrl: process.env.DATABASE_URL || "Not Set" });
});

app.get("/", (req, res) => {
  res.send(<h1>API is working great!!</h1>);
});

// Export app to use in server.js
module.exports = app;
