const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    focus: {
      type: String,
      enum: [
        "Balanced",
        "Frontend",
        "Backend",
        "Core CS",
        "DSA",
        "HR",
        "AI / ML",
      ],
      required: true,
    },

    currentStage: {
      type: String,
      default: "HR",
    },

    currentQuestion: {
      type: String,
      default: "",
    },

    history: [
      {
        question: String,
        answer: String,
      },
    ],

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    report: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "InterviewSession",
  interviewSessionSchema
);