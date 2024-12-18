// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables


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
    res.send(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f7fc;
              color: #333;
              margin: 0;
              padding: 20px;
            }
            h1 {
              color: #5c6bc0;
            }
            .container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
            }
            .info {
              margin-bottom: 20px;
              font-size: 18px;
            }
            .links {
              margin-top: 20px;
              list-style-type: none;
              padding: 0;
            }
            .links li {
              padding: 8px;
              font-size: 16px;
            }
            .links a {
              text-decoration: none;
              color: #5c6bc0;
            }
            .links a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to the Dympulse API!</h1>
            <div class="info">
              <p>This is the API that powers the Dympulse platform.</p>
              <p><strong>API is running!</strong> Please explore the endpoints below to interact with the system.</p>
            </div>
            
            <ul class="links">
              <li><strong>Get Started:</strong> Use the <code>/api</code> endpoint for all your requests.</li>
              <li><strong>Documentation:</strong> Check out the API documentation <a href="https://example.com/docs" target="_blank">here</a>.</li>
              <li><strong>Status:</strong> <a href="/status">View the current status of the API</a></li>
            </ul>
          </div>
        </body>
      </html>
    `);
  });
  
  app.get("/status", (req, res) => {
    res.json({
      status: "OK",
      message: "API is running smoothly."
    });
  });

//Use Routes
app.use("/api", contactRoutes); // Prefix all routes with /api

// user registration route
app.use("/api/users", userRoutes);

// Export app to use in server.js
module.exports = app;
