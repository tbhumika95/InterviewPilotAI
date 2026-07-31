import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInterviewHistory } from "../api/interviewApi";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getInterviewHistory();
      setHistory(res.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to fetch interview history."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Interview History
        </h1>

        {history.length === 0 ? (
          <div className="bg-zinc-900 rounded-xl p-8 text-center text-zinc-400">
            No Interview History Found
          </div>
        ) : (
          <div className="space-y-5">

            {history.map((item) => (

              <div
                key={item._id}
                className="bg-zinc-900 rounded-xl p-6 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {item.focus}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    Difficulty: {item.difficulty}
                  </p>

                  <p className="text-zinc-400">
                    Status: {item.status}
                  </p>

                  <p className="text-zinc-500 text-sm mt-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>

                {item.status === "completed" && (
                  <Link
                    to={`/report/${item._id}`}
                    className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
                  >
                    View Report
                  </Link>
                )}
              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default History;