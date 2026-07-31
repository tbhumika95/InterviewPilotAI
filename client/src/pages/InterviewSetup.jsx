import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startInterview } from "../api/interviewApi";
import { getMyResume } from "../api/resumeApi";

const InterviewSetup = () => {
  const navigate = useNavigate();

  const [resumeId, setResumeId] = useState("");

  const [formData, setFormData] = useState({
    duration: 10,
    difficulty: "Easy",
    focus: "Balanced",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      const res = await getMyResume();

      if (res.resume) {
        setResumeId(res.resume._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "duration"
          ? Number(e.target.value)
          : e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeId) {
      alert("Please upload your resume first.");
      return;
    }

    try {
      setLoading(true);

      const res = await startInterview({
        resumeId,
        ...formData,
      });

      navigate(`/interview/${res.data.sessionId}`, {
        state: {
          sessionId: res.data.sessionId,
          question: res.data.question,
        },
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to start interview."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center px-6">
      <div className="w-full max-w-xl bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

        <h1 className="text-3xl font-bold text-white mb-6">
          Interview Setup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white"
          >
            <option value={5}>5 Minutes</option>
            <option value={10}>10 Minutes</option>
            <option value={15}>15 Minutes</option>
            <option value={20}>20 Minutes</option>
          </select>

          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <select
            name="focus"
            value={formData.focus}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-800 text-white"
          >
            <option>Balanced</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Core CS</option>
            <option>DSA</option>
            <option>HR</option>
            <option>AI / ML</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-semibold"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default InterviewSetup;