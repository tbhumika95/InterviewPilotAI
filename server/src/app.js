const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

app.use(express.json());

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "InterviewPilot AI Backend is Running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;