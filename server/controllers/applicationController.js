const Application = require("../models/Application");
const Job = require("../models/Job");

// Candidate applies for a job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // prevent duplicate application
    const alreadyApplied = await Application.findOne({
      job: jobId,
      candidate: req.user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    const application = await Application.create({
      job: jobId,
      candidate: req.user._id,
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Candidate views their own applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.user._id })
      .populate("job")
      .populate("candidate", "name email");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Employer views applicants for their posted jobs
const getApplicantsForEmployerJobs = async (req, res) => {
  try {
    // find jobs posted by this employer
    const jobs = await Job.find({ postedBy: req.user._id });
    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("job")
      .populate("candidate", "name email role");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getApplicantsForEmployerJobs,
};