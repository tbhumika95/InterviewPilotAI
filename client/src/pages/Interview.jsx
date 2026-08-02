import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { nextQuestion } from "../api/interviewApi";

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionId } = useParams();

  const [question, setQuestion] = useState(
    location.state?.question || "Loading..."
  );

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!answer.trim()) {
      alert("Please answer the question.");
      return;
    }

    try {
      setLoading(true);

      const res = await nextQuestion({
        sessionId,
        answer,
      });

      if (res.data.completed) {
        navigate(`/interview-details/${sessionId}`);
        return;
      }

      setQuestion(res.data.question);
      setAnswer("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center px-6">
      <div className="w-full max-w-4xl bg-zinc-900 rounded-2xl p-8 border border-zinc-800">

        <h1 className="text-3xl text-white font-bold mb-8">
          AI Interview
        </h1>

        <div className="bg-zinc-800 rounded-xl p-6 text-white text-lg mb-8">
          {question}
        </div>

        <textarea
          rows={8}
          placeholder="Type your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full bg-zinc-800 text-white rounded-xl p-4 outline-none"
        />

        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Generating..." : "Next Question"}
        </button>

      </div>
    </div>
  );
};

export default Interview;