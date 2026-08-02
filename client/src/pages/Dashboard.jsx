import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getInterviewHistory } from "../api/interviewApi";
import { getMyResume } from "../api/resumeApi";
import Sidebar from "../components/Sidebar";

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
  <div className="flex min-h-screen bg-zinc-950 text-white">

    <Sidebar />

    <div className="flex-1">

  </div>

      <div className="max-w-7xl mx-auto p-8">

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-zinc-900 rounded-2xl p-6">

            <p className="text-zinc-400">
              Resume
            </p>

            <h2 className="text-2xl font-bold mt-2">

              {resume
                ? "✅ Uploaded"
                : "❌ Missing"}

            </h2>

          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">

            <p className="text-zinc-400">
              Interviews
            </p>

            <h2 className="text-5xl font-bold mt-2">
              {history.length}
            </h2>

          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">

            <p className="text-zinc-400">
              Average Score
            </p>

            <h2 className="text-5xl font-bold mt-2">
              {avgScore}
            </h2>

          </div>

          <div className="bg-zinc-900 rounded-2xl p-6">

            <p className="text-zinc-400">
              Completed
            </p>

            <h2 className="text-5xl font-bold mt-2">
              {completed.length}
            </h2>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <button
            onClick={() => navigate("/upload-resume")}
            className="bg-blue-600 hover:bg-blue-700 transition rounded-2xl p-8 text-left"
          >

            <h2 className="text-2xl font-bold">
              📄 Upload Resume
            </h2>

            <p className="mt-2 text-blue-100">
              Upload or update your latest resume.
            </p>

          </button>

          <button
            onClick={() => navigate("/interview/setup")}
            className="bg-green-600 hover:bg-green-700 transition rounded-2xl p-8 text-left"
          >

            <h2 className="text-2xl font-bold">
              🎤 Start Interview
            </h2>

            <p className="mt-2 text-green-100">
              Begin a personalized AI interview.
            </p>

          </button>

          <button
            onClick={() => navigate("/history")}
            className="bg-zinc-800 hover:bg-zinc-700 transition rounded-2xl p-8 text-left"
          >

            <h2 className="text-2xl font-bold">
              📊 Interview History
            </h2>

            <p className="mt-2 text-zinc-400">
              View previous interviews and reports.
            </p>

          </button>

        </div>

        {/* Recent Interviews */}

        <div className="bg-zinc-900 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent Interviews
          </h2>

          {history.length === 0 ? (

            <div className="text-zinc-400 text-lg">
              No interviews yet.
            </div>

          ) : (

            <div className="space-y-4">

              {history.slice(0, 5).map((item) => (

                <div
                  key={item._id}
                  className="flex justify-between items-center bg-zinc-800 rounded-xl p-5"
                >

                  <div>

                    <h3 className="text-xl font-semibold">
                      {item.focus} Interview
                    </h3>

                    <p className="text-zinc-400 mt-1">
                      {item.difficulty} • {item.status}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      navigate(`/interview-details/${item._id}`)
                    }
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
                  >
                    View
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;