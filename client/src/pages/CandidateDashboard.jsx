function CandidateDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="page">
      <div className="page-header">
        <h1>Welcome back, {user?.name} 👋</h1>
        <p>
          Track your applications and explore new opportunities.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>💼</h2>
          <p>Browse Jobs</p>
        </div>

        <div className="stat-card">
          <h2>📄</h2>
          <p>My Applications
            
          </p>
        </div>

        <div className="stat-card">
          <h2>🚀</h2>
          <p>Career Growth</p>
        </div>
      </div>
    </div>
  );
}

export default CandidateDashboard;