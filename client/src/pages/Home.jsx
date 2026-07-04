import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [stats, setStats] = useState({
  jobs: 0,
  candidates: 0,
  employers: 0,
});

useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await API.get("/jobs/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load stats");
    }
  };

  fetchStats();
}, []);
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            Modern Recruitment Platform
          </span>

          <h1>
            Find the right opportunity.
            <br />
            Hire exceptional talent.
          </h1>

          <p>
            CareerConnect helps candidates discover meaningful opportunities
            and enables employers to connect with skilled professionals through
            a secure and streamlined hiring platform.
          </p>

          <div className="hero-buttons">
            <Link to="/jobs">
              <Button>Browse Jobs</Button>
            </Link>

            <Link to="/post-job">
              <Button variant="secondary">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="page section-alt">
        <div className="page-header">
          <h1>Why Choose CareerConnect?</h1>
          <p>
            Everything you need to connect talent with opportunity.
          </p>
        </div>

        <div className="feature-grid">
          <Card>
            <h3>Verified Employers</h3>
            <p>
              Connect with trusted companies actively hiring talented candidates.
            </p>
          </Card>

          <Card>
            <h3>Fast Applications</h3>
            <p>
              Apply to opportunities quickly with a simple, streamlined process.
            </p>
          </Card>

          <Card>
            <h3>Secure Platform</h3>
            <p>
              Protected authentication and role-based access for all users.
            </p>
          </Card>
        </div>
      </section>

      <section className="page">
        <div className="page-header">
          <h1>Platform Highlights</h1>
        </div>

        <div className="stats-grid">
  <div className="stat-card">
    <h2>{stats.jobs}</h2>
    <p>Active Job Openings</p>
  </div>

  <div className="stat-card">
    <h2>{stats.candidates}</h2>
    <p>Registered Candidates</p>
  </div>

  <div className="stat-card">
    <h2>{stats.employers}</h2>
    <p>Hiring Companies</p>
  </div>
</div>
      </section>
    </main>
  );
}

export default Home;