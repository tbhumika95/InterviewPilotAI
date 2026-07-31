import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getInterviewHistory } from "../api/interviewApi";
import { getMyResume } from "../api/resumeApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [history, setHistory] = useState([]);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [historyRes, resumeRes] = await Promise.all([
        getInterviewHistory(),
        getMyResume(),
      ]);

      setHistory(historyRes.data || []);
      setResume(resumeRes.resume || null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const completed = history.filter(
    (item) => item.status === "completed"
  );

  let avgScore = "--";

  if (completed.length > 0) {
    const total = completed.reduce(
      (sum, item) => sum + (item.report?.overallScore || 0),
      0
    );

    avgScore = Math.round(total / completed.length);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="flex justify-between items-center px-10 py-6 border-b border-zinc-800">

        <div>
          <h1 className="text-4xl font-bold">
            InterviewPilot AI
          </h1>

          <p className="text-zinc-400 mt-2">
            Welcome, {user?.name} 👋
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="max-w-6xl mx-auto p-8 grid gap-6">

        <div className="bg-zinc-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Resume Status
          </h2>

          <p className="text-xl">
            {resume
              ? "✅ Resume Uploaded"
              : "❌ No Resume Uploaded"}
          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Interviews
          </h2>

          <p className="text-5xl font-bold">
            {history.length}
          </p>

        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Average Score
          </h2>

          <p className="text-5xl font-bold">
            {avgScore}
          </p>

        </div>

        <button
          onClick={() => navigate("/upload-resume")}
          className="bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-xl font-semibold"
        >
          Upload Resume
        </button>

        <button
          onClick={() => navigate("/interview/setup")}
          className="bg-green-600 hover:bg-green-700 py-4 rounded-xl text-xl font-semibold"
        >
          Start Interview
        </button>

        <button
          onClick={() => navigate("/history")}
          className="bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl text-xl font-semibold"
        >
          Interview History
        </button>

      </div>

    </div>
  );
};

export default Dashboard;