import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Button from "../components/common/Button";

function PostJob() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
    description: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/jobs",
        {
          ...formData,
          skills: formData.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/employer-dashboard");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to create job."
      );
    }
  };

  if (!user || user.role !== "employer") {
    return (
      <div className="page">
        <h2>Only employers can access this page.</h2>
      </div>
    );
  }

  return (
    <div className="page">

      <div className="page-header">

        <h1>Post a New Opportunity</h1>

        <p>
          Publish a job opening and connect with talented candidates.
        </p>

      </div>

      <div className="form-wrapper">

        <form className="modern-form" onSubmit={handleSubmit}>

          <input
            name="title"
            placeholder="Job Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          <input
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
          />

          <textarea
            rows="6"
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {message && (
            <p className="error-message">
              {message}
            </p>
          )}

          <Button type="submit">
            Publish Job
          </Button>

        </form>

      </div>

    </div>
  );
}

export default PostJob;