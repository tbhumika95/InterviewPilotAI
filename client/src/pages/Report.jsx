import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInterviewReport } from "../api/interviewApi";

const Report = () => {
  const { sessionId } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await getInterviewReport(sessionId);
      setReport(res.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to fetch report."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center text-white text-2xl">
        Loading Report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center text-red-500 text-2xl">
        Report Not Available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">

      <div className="max-w-5xl mx-auto bg-zinc-900 rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-8">
          Interview Report
        </h1>

        <div className="space-y-6">
            {Object.entries(report).map(([key, value]) => (
            <div
                key={key}
                className="bg-zinc-800 rounded-xl p-5"
            >
            <h2 className="text-xl font-semibold capitalize mb-2">
              {key}
            </h2>

            <pre className="text-zinc-300 whitespace-pre-wrap break-words">
              {typeof value === "object"
                ? JSON.stringify(value, null, 2)
                : value}
            </pre>
        </div>
       ))}
       </div>

      </div>

    </div>
  );
};

export default Report;