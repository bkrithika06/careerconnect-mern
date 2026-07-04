import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/my-applications" element={<MyApplications />} />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;