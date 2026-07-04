import { useEffect, useState } from "react";
import API from "../services/api";
import formatSalary from "../utils/formatSalary";
import { FaLocationDot } from "react-icons/fa6";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user || user.role !== "candidate") {
        setMessage("Only candidates can view applications.");
        return;
      }

      if (!token) {
        setMessage("Please login first.");
        return;
      }

      try {
        const res = await API.get("/applications/my-applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(res.data);
      } catch (error) {
        setMessage(
          error.response?.data?.message || "Failed to load applications"
        );
      }
    };

    fetchApplications();
  }, [token, user]);

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track all the jobs you've applied for.</p>
      </div>

      {message && <p className="error-message">{message}</p>}

      <div className="jobs-grid">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div className="job-card" key={app._id}>
              <div className="job-top">
                <div>
                  <h2>{app.job?.title}</h2>
                  <p className="company">{app.job?.company}</p>
                </div>

                <span className="salary">
                  {formatSalary(app.job?.salary)}
                </span>
              </div>

              <div className="job-info">
                <FaLocationDot
  style={{ marginRight: "6px", color: "#2563EB" }}
/>
{app.job?.location}
              </div>

              <p className="description">
                {app.job?.description}
              </p>

              <div className="skills">
                {app.job?.skills?.map((skill, index) => (
                  <span className="skill" key={index}>
                    {skill}
                  </span>
                ))}
              </div>

              <div className="job-footer">
                <span
                  style={{
                    background: "#DCFCE7",
                    color: "#166534",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    fontWeight: 600,
                  }}
                >
                  {app.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          !message && (
            <div className="page-header">
              <h2>No Applications Yet</h2>
              <p>
                Browse available jobs and start applying to opportunities.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default MyApplications;