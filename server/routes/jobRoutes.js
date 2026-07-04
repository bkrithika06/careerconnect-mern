const express = require("express");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getEmployerJobs,
  getStats,
} = require("../controllers/jobController");

const { protect, employerOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAllJobs);
router.get("/stats", getStats);
router.get("/my-jobs", protect, employerOnly, getEmployerJobs);
router.get("/:id", getJobById);

// Employer-only routes
router.post("/", protect, employerOnly, createJob);
router.put("/:id", protect, employerOnly, updateJob);
router.delete("/:id", protect, employerOnly, deleteJob);

module.exports = router;