// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const contactRoutes = require("./routes/contactRoutes"); // Import routes

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST", "OPTIONS"] }));
app.use(bodyParser.json()); // Parse JSON request bodies

// Use Routes
app.use("/api", contactRoutes); // Prefix all routes with /api

// Export app to use in server.js
module.exports = app;
