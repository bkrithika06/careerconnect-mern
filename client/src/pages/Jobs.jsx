import { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/jobs/JobCard";



function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data);
      } catch (error) {
        setMessage("Failed to load jobs");
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    if (!user || !token) {
  setMessage("Please login as a candidate to apply for jobs.");

  setTimeout(() => {
    setMessage("");
  }, 3000);

  return;
}

    if (user.role !== "candidate") {
  setMessage("Only candidates can apply for jobs.");

  setTimeout(() => {
    setMessage("");
  }, 3000);

  return;
}

    try {
      const res = await API.post(
        "/applications/apply",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(res.data.message || "Applied successfully!");

setTimeout(() => {
  setSuccessMessage("");
}, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to apply");

setTimeout(() => {
  setMessage("");
}, 3000);
    }
  };

  return (
    <div className="page">
      <div className="jobs-header">

    <h1>
        Browse Opportunities
    </h1>

    <p>

        Discover internships and full-time roles
        from trusted employers.

    </p>

</div>

      {message && <p className="error-message">{message}</p>}

      <div className="search-container">
  <input
    type="text"
    placeholder="Search by job title or company..."
    className="search-input"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

{successMessage && (
  <div className="success-message">
    {successMessage}
  </div>
)}

      <div className="jobs-grid">
        {jobs.length > 0 ? (
          jobs
  .filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
    );
  })
  .map((job) => (
  <JobCard
    key={job._id}
    job={job}
    onApply={handleApply}
  />
))
        ) : (
          !message && <p>No jobs available right now.</p>
        )}
      </div>
    </div>
  );
}

export default Jobs;