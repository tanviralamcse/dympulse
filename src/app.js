const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const contactRoutes = require("./routes/contactRoutes"); // Import routes

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware setup
const allowedOrigins = [process.env.REACT_APP_API_URL || "http://localhost:3000"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"]
}));

app.use(bodyParser.json()); // Parse JSON request bodies
app.get("/", (req, res) => {
    res.send("API is running! Use `/api` for endpoints.");
});


// Use Routes
app.use("/api", contactRoutes); // Prefix all routes with /api

// Export app to use in server.js
module.exports = app;
