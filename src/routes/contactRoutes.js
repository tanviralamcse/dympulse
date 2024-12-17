// contactRoutes.js
const express = require("express");
const { handleFormSubmission, fetchAllSubmissions } = require("../controllers/contactController");

const router = express.Router();

// Routes
router.post("/contact", handleFormSubmission);  // POST /api/contact
router.get("/contact", fetchAllSubmissions);    // GET /api/contact

module.exports = router;
