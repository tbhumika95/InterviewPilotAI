import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaRobot } from "react-icons/fa";

import { registerUser } from "../api/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await registerUser(formData);

      alert(res.message || "Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center px-5">

      <div className="w-full max-w-md bg-zinc-900 rounded-3xl border border-zinc-800 p-10 shadow-2xl">

        <div className="flex flex-col items-center">

          <div className="bg-blue-600 p-5 rounded-full mb-6">
            <FaRobot className="text-3xl text-white" />
          </div>

          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-zinc-400 mt-3">
            Join InterviewPilot AI 🚀
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5"
        >

          <div className="relative">
            <FaUser className="absolute top-4 left-4 text-zinc-500" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none border border-zinc-700 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-4 left-4 text-zinc-500" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none border border-zinc-700 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-4 left-4 text-zinc-500" />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 text-white rounded-xl py-3 pl-12 pr-4 outline-none border border-zinc-700 focus:border-blue-500"
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center text-zinc-400 mt-8">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-500 ml-2 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;