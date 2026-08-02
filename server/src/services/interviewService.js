const Resume = require("../models/Resume");
const InterviewSession = require("../models/InterviewSession");

const interviewPrompt = require("../prompts/interviewPrompt");
const reportPrompt = require("../prompts/reportPrompt");

const {
  generateInterviewResponse,
  generateReport,
} = require("./groqService");

const QUESTION_LIMIT = {
  5: 4,
  10: 6,
  15: 9,
  20: 12,
  30: 15,
};

const startInterview = async ({
  resumeId,
  duration,
  difficulty,
  focus,
}) => {
  const candidate = await Resume.findById(resumeId);

  if (!candidate) {
    throw new Error("Resume not found.");
  }

  const firstQuestion = "Tell me about yourself.";

  const session = await InterviewSession.create({
    user: candidate.user,
    resume: candidate._id,
    duration,
    difficulty,
    focus,
    status: "ongoing",
    history: [
      {
        role: "assistant",
        content: firstQuestion,
      },
    ],
  });

  return {
    sessionId: session._id,
    completed: false,
    question: firstQuestion,
  };
};

const nextQuestion = async ({
  sessionId,
  answer,
}) => {
  const session = await InterviewSession.findById(sessionId).populate("resume");

  if (!session) {
    throw new Error("Interview session not found.");
  }

  if (session.status === "completed") {
    return {
      completed: true,
      report: session.report,
    };
  }

  // Save candidate answer
  session.history.push({
    role: "user",
    content: answer,
  });

  // Count questions already asked
  const questionsAsked = session.history.filter(
    (msg) => msg.role === "assistant"
  ).length;

  const maxQuestions =
    QUESTION_LIMIT[session.duration] || 6;

  // Backend decides interview completion
  if (questionsAsked >= maxQuestions) {
    const report = await generateReport(
      reportPrompt({
        candidate: session.resume,
        history: session.history,
      })
    );

    session.report = report;
    session.status = "completed";

    if ("completed" in session) {
      session.completed = true;
    }

    await session.save();

    return {
      completed: true,
      report,
    };
  }

  // Generate next question
  const prompt = interviewPrompt({
    candidate: session.resume,
    duration: session.duration,
    difficulty: session.difficulty,
    focus: session.focus,
    history: session.history,
  });

  const aiResponse = await generateInterviewResponse(prompt);

  session.history.push({
    role: "assistant",
    content: aiResponse.question,
  });

  await session.save();

  return {
    completed: false,
    question: aiResponse.question,
  };
};

const getReport = async (sessionId) => {
  const session = await InterviewSession.findById(sessionId);

  if (!session) {
    throw new Error("Interview session not found.");
  }

  return session.report;
};

const getHistory = async (userId) => {
  return await InterviewSession.find({
    user: userId,
  })
    .select("title difficulty focus status createdAt report")
    .sort({
      createdAt: -1,
    });
};

const getInterviewDetails = async (sessionId) => {

    const session = await InterviewSession
        .findById(sessionId)
        .populate("resume", "summary skills technologies");

    if (!session) {
        throw new Error("Interview session not found.");
    }

    return session;
};


module.exports = {
    startInterview,
    nextQuestion,
    getReport,
    getHistory,
    getInterviewDetails,
};