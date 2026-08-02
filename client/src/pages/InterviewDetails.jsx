import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterviewDetails } from "../api/interviewApi";

const InterviewDetails = () => {
  const { sessionId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("report");

  useEffect(() => {
    fetchInterview();
  }, []);

  const fetchInterview = async () => {
    try {
      const res = await getInterviewDetails(sessionId);
      setData(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load interview.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center text-red-500 text-2xl">
        Interview Not Found
      </div>
    );

  const report = data.report || {};

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="bg-zinc-900 rounded-2xl p-8 mb-8">

          <h1 className="text-4xl font-bold">
            Interview Details
          </h1>

          <div className="grid md:grid-cols-4 gap-6 mt-8">

            <div>
              <p className="text-zinc-400">Focus</p>
              <h3 className="text-xl font-semibold">
                {data.focus}
              </h3>
            </div>

            <div>
              <p className="text-zinc-400">Difficulty</p>
              <h3 className="text-xl font-semibold">
                {data.difficulty}
              </h3>
            </div>

            <div>
              <p className="text-zinc-400">Duration</p>
              <h3 className="text-xl font-semibold">
                {data.duration} mins
              </h3>
            </div>

            <div>
              <p className="text-zinc-400">Status</p>
              <h3 className="text-green-400 font-semibold">
                {data.status}
              </h3>
            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="flex gap-4 mb-8">

          <button
            onClick={() => setActiveTab("report")}
            className={`px-6 py-3 rounded-xl ${
              activeTab === "report"
                ? "bg-blue-600"
                : "bg-zinc-800"
            }`}
          >
            📊 Report
          </button>

          <button
            onClick={() => setActiveTab("conversation")}
            className={`px-6 py-3 rounded-xl ${
              activeTab === "conversation"
                ? "bg-blue-600"
                : "bg-zinc-800"
            }`}
          >
            💬 Conversation
          </button>

        </div>

        {/* REPORT */}

        {activeTab === "report" && (

          <div className="space-y-8">

            {/* Scores */}

            <div className="grid md:grid-cols-2 gap-6">

              {Object.entries(report)
                .filter(([_, value]) => typeof value === "number")
                .map(([key, value]) => (

                  <div
                    key={key}
                    className="bg-zinc-900 rounded-2xl p-6"
                  >

                    <div className="flex justify-between mb-3">

                      <h3 className="text-lg font-semibold capitalize">
                        {key}
                      </h3>

                      <span className="font-bold">
                        {value}/10
                      </span>

                    </div>

                    <div className="w-full h-3 bg-zinc-700 rounded-full">

                      <div
                        className="h-3 rounded-full bg-blue-500"
                        style={{
                          width: `${value * 10}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

            </div>

            {/* Text Sections */}

            {Object.entries(report)
              .filter(([_, value]) => typeof value !== "number")
              .map(([key, value]) => (

                <div
                  key={key}
                  className="bg-zinc-900 rounded-2xl p-6"
                >

                  <h2 className="text-2xl font-bold mb-4 capitalize">
                    {key}
                  </h2>

                  <pre className="whitespace-pre-wrap text-zinc-300">
                    {typeof value === "object"
                      ? JSON.stringify(value, null, 2)
                      : value}
                  </pre>

                </div>

              ))}

          </div>

        )}

        {/* CONVERSATION */}

        {activeTab === "conversation" && (

          <div className="space-y-5">

            {data.history.map((msg, index) => (

              <div
                key={index}
                className={`max-w-4xl rounded-2xl p-6 ${
                  msg.role === "assistant"
                    ? "bg-blue-900 mr-auto"
                    : "bg-zinc-800 ml-auto"
                }`}
              >

                <h3 className="font-bold mb-2">

                  {msg.role === "assistant"
                    ? "🤖 AI Interviewer"
                    : "🙂 You"}

                </h3>

                <p className="leading-7">
                  {msg.content}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default InterviewDetails;