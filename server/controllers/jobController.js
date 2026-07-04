const Job = require("../models/Job");
const User = require("../models/User");

// Create Job
const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, skills, description } = req.body;

    if (!title || !company || !location || !salary || !description) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      skills,
      description,
      postedBy: req.user._id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email role");
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email role");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this job" });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this job" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "name email role"
    );

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const jobs = await Job.countDocuments();

    const candidates = await User.countDocuments({
      role: "candidate",
    });

    const employers = await User.countDocuments({
      role: "employer",
    });

    res.json({
      jobs,
      candidates,
      employers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stats",
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getEmployerJobs,
  getStats,
};

