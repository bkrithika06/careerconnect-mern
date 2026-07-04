const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect route - logged in users only
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Employer only middleware
const employerOnly = (req, res, next) => {
  if (req.user && req.user.role === "employer") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Employers only." });
  }
};

// Candidate only middleware
const candidateOnly = (req, res, next) => {
  if (req.user && req.user.role === "candidate") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Candidates only." });
  }
};

module.exports = { protect, employerOnly, candidateOnly };