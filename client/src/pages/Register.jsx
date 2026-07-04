import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Button from "../components/common/Button";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
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
      await API.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Create Account</h1>
        <p>Join CareerConnect today.</p>
      </div>

      <div className="form-wrapper">
        <form className="modern-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>

          {message && <p className="error-message">{message}</p>}

          <Button type="submit">Create Account</Button>

          <p style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--primary)" }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;