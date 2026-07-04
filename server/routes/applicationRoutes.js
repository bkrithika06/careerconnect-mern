const express = require("express");
const {
  applyForJob,
  getMyApplications,
  getApplicantsForEmployerJobs,
} = require("../controllers/applicationController");

const {
  protect,
  candidateOnly,
  employerOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Candidate routes
router.post("/apply", protect, candidateOnly, applyForJob);
router.get("/my-applications", protect, candidateOnly, getMyApplications);

// Employer routes
router.get("/employer-applications", protect, employerOnly, getApplicantsForEmployerJobs);

module.exports = router;