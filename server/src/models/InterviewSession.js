const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },

    title: {
      type: String,
      default: "Untitled Interview",
    },

    duration: {
      type: Number,
      enum: [10, 20, 30],
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

    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },

    history: [
      {
        role: {
          type: String,
          enum: ["assistant", "user"],
          required: true,
        },

        content: {
          type: String,
          required: true,
        },

        timestamp: {
          type: Date,
          default: Date.now,
        },
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
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);