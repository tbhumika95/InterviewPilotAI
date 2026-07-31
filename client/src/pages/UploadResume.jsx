import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadResume } from "../api/resumeApi";

const UploadResume = () => {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please select a resume.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);

      const response = await uploadResume(formData);

      alert(response.message || "Resume uploaded successfully.");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "Resume upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl p-8 border border-zinc-800">

        <h1 className="text-3xl font-bold text-white mb-2">
          Upload Resume
        </h1>

        <p className="text-zinc-400 mb-8">
          Upload your resume to generate AI interviews.
        </p>

        <form
          onSubmit={handleUpload}
          className="space-y-6"
        >
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full text-white bg-zinc-800 rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadResume;