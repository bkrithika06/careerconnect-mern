import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Career<span>Connect</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {user?.role === "candidate" && (
            <>
  <span className="user-name">
    Hi, {user.name}
  </span>

  <Link to="/my-applications">My Applications</Link>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</>
          )}

          {user?.role === "employer" && (
            <>
  <span className="user-name">
    Hi, {user.name}
  </span>

  <Link to="/employer-dashboard">
    Dashboard
  </Link>

  <Link
    to="/post-job"
    className="post-job-btn"
  >
    Post Job
  </Link>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>
</>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;