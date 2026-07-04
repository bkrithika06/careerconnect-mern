import { useEffect, useState } from "react";
import API from "../services/api";
import formatSalary from "../utils/formatSalary";
import { FaLocationDot } from "react-icons/fa6";

function EmployerDashboard() {
  const [myJobs, setMyJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEmployerData = async () => {
      if (!user || user.role !== "employer") {
        setMessage("Only employers can view this dashboard.");
        return;
      }

      if (!token) {
        setMessage("Please login first.");
        return;
      }

      try {
        const jobsRes = await API.get("/jobs/my-jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const appsRes = await API.get("/applications/employer-applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMyJobs(jobsRes.data);
        setApplications(appsRes.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to load employer dashboard");
      }
    };

    fetchEmployerData();
  }, [token, user]);

 return (
  <div className="page">

    <div className="page-header">
      <h1>Employer Dashboard</h1>
      <p>
        Manage your job postings and review applications from candidates.
      </p>
    </div>


      {message && <p className="error-message">{message}</p>}


      <div className="stats-grid">
  <div className="stat-card">
    <h2>{myJobs.length}</h2>
    <p>Jobs Posted</p>
  </div>

  <div className="stat-card">
    <h2>{applications.length}</h2>
    <p>Applications</p>
  </div>
</div>
      <section className="dashboard-section">
        <h2>My Posted Jobs</h2>
        <div className="jobs-grid">
          {myJobs.length > 0 ? (
            myJobs.map((job) => (
              <div className="job-card" key={job._id}>
  <div className="job-top">
    <div>
      <h2>{job.title}</h2>
      <p className="company">{job.company}</p>
    </div>

    <span className="salary">
      {formatSalary(job.salary)}
    </span>
  </div>

  <div className="job-info">
  <FaLocationDot
    style={{ marginRight: "6px", color: "#2563EB" }}
  />
  {job.location}
</div>

  <p className="description">
    {job.description}
  </p>

  <div className="skills">
    {job.skills?.map((skill, index) => (
      <span className="skill" key={index}>
        {skill}
      </span>
    ))}
  </div>
</div>
            ))
          ) : (
            !message && (
  <div className="page-header">
    <h2>No Jobs Posted Yet</h2>
    <p>
      Create your first job posting to start receiving applications.
    </p>
  </div>
)
          )}
        </div>
      </section>

      <section className="dashboard-section">
        <h2>Applicants for My Jobs</h2>
        <div className="jobs-grid">
          {applications.length > 0 ? (
            applications.map((app) => (
              <div className="job-card" key={app._id}>
  <div className="job-top">
    <div>
      <h2>{app.job?.title}</h2>
      <p className="company">{app.candidate?.name}</p>
    </div>

    <span
      className="salary"
      style={{
        background: "#DCFCE7",
        color: "#166534",
      }}
    >
      {app.status}
    </span>
  </div>

  <div className="job-info">
    {app.candidate?.email}
  </div>

  <p className="description">
    {app.job?.company} • {app.job?.location}
  </p>
</div>
            ))
          ) : (
            !message && (
  <div className="page-header">
    <h2>No Applications Yet</h2>
    <p>
      Applications from candidates will appear here.
    </p>
  </div>
)
          )}
        </div>
      </section>
    </div>
    
  );
}

export default EmployerDashboard;