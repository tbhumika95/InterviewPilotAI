import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import InterviewDetails from "./pages/InterviewDetails";
import History from "./pages/History";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-3xl font-bold">
      404 Page Not Found
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/upload-resume" element={<UploadResume />} />

      <Route path="/interview/setup" element={<InterviewSetup />} />

      <Route path="/interview/:sessionId" element={<Interview />} />

      <Route path="/interview-details/:sessionId" element={<InterviewDetails />} />
      
      <Route path="/history" element={<History />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;