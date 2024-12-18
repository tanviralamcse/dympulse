// controllers/contactController.js
const { saveFormSubmission, getAllSubmissions } = require("../models/contactModel");

// Handle form submission
const handleFormSubmission = async (req, res) => {
  console.log("Received request:", req.body); // Log incoming data
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name) return res.status(400).json({ message: "Name is required" });
  if (!email) return res.status(400).json({ message: "Email is required" });
  if (!message) return res.status(400).json({ message: "Message is required" });

  try {
    const savedData = await saveFormSubmission(name, email, subject, message);
    res.status(200).json({
      message: "Form submission successful!",
      data: savedData,
    });
  } catch (error) {
    console.error("Error saving form submission:", error);
    res.status(500).json({ message: "Failed to submit form." });
  }
};

// Handle fetching all submissions
const fetchAllSubmissions = async (req, res) => {
  try {
    const submissions = await getAllSubmissions();
    res.status(200).json({
      message: "Fetched all contact form submissions",
      data: submissions,
    });
  } catch (error) {
    console.error("Error fetching contact form data:", error);
    res.status(500).json({ message: "Failed to retrieve data." });
  }
};

module.exports = {
  handleFormSubmission,
  fetchAllSubmissions,
};
