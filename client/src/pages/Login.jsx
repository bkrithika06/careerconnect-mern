import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import Button from "../components/common/Button";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.role === "candidate") {
        navigate("/jobs");
      } else {
        navigate("/employer-dashboard");
      }

      window.location.reload();
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Welcome Back</h1>
        <p>Sign in to continue using CareerConnect.</p>
      </div>

      <div className="form-wrapper">
        <form className="modern-form" onSubmit={handleSubmit}>
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

          {message && (
            <p className="error-message">{message}</p>
          )}

          <Button type="submit">
            Sign In
          </Button>

          <p style={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "var(--primary)" }}
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;