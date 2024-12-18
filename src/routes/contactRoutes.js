// routes/contactRoutes.js
const express = require("express");
const { handleFormSubmission, fetchAllSubmissions } = require("../controllers/contactController");

const router = express.Router();

// POST /api/contact - Submit form
router.post("/contact", handleFormSubmission);

// GET /api/contact - Fetch all submissions
router.get("/contact", fetchAllSubmissions);

module.exports = router;
