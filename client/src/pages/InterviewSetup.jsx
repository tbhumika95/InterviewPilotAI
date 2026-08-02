import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startInterview } from "../api/interviewApi";
import { getMyResume } from "../api/resumeApi";

const difficulties = ["Easy", "Medium", "Hard"];

const focuses = [
  "Balanced",
  "Frontend",
  "Backend",
  "Core CS",
  "DSA",
  "HR",
  "AI / ML",
];

const InterviewSetup = () => {
  const navigate = useNavigate();

  const [resumeId, setResumeId] = useState("");

  const [formData, setFormData] = useState({
    duration: 15,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeId) {
      alert("Please upload your resume first.");
      return;
    }

    if (
      formData.duration < 5 ||
      formData.duration > 120
    ) {
      alert("Duration should be between 5 and 120 minutes.");
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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">

      <div className="w-full max-w-3xl bg-zinc-900 rounded-3xl border border-zinc-800 p-10">

        <h1 className="text-4xl font-bold text-white mb-2">
          Interview Setup
        </h1>

        <p className="text-zinc-400 mb-8">
          Configure your AI interview.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <div>

            <label className="block text-white mb-3 font-medium">
              Interview Duration (Minutes)
            </label>

            <input
              type="number"
              min="5"
              max="120"
              value={formData.duration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  duration: Number(e.target.value),
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="block text-white mb-3 font-medium">
              Difficulty
            </label>

            <div className="grid grid-cols-3 gap-4">

              {difficulties.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      difficulty: item,
                    })
                  }
                  className={`rounded-xl p-4 transition border ${
                    formData.difficulty === item
                      ? "bg-blue-600 border-blue-600"
                      : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          <div>

            <label className="block text-white mb-3 font-medium">
              Interview Focus
            </label>

            <div className="grid grid-cols-2 gap-4">

              {focuses.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      focus: item,
                    })
                  }
                  className={`rounded-xl p-4 transition border ${
                    formData.focus === item
                      ? "bg-blue-600 border-blue-600"
                      : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition rounded-xl py-4 text-lg font-semibold text-white"
          >
            {loading
              ? "Starting Interview..."
              : "🚀 Start Interview"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default InterviewSetup;