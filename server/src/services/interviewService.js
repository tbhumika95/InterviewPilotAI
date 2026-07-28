const Resume = require("../models/Resume");
const InterviewSession = require("../models/InterviewSession");

const interviewPrompt = require("../prompts/interviewPrompt");
const { generateQuestion } = require("./groqService");

const startInterview = async ({
    resumeId,
    duration,
    difficulty,
    focus,
}) => {

    // Find Candidate Resume
    const candidate = await Resume.findById(resumeId);

    if (!candidate) {
        throw new Error("Resume not found.");
    }

    // First interview prompt
    const prompt = interviewPrompt({
        candidate,
        duration,
        difficulty,
        focus,
        history: [],
    });

    // Generate first question
    const firstQuestion = await generateQuestion(prompt);

    // Create Interview Session
    const session = await InterviewSession.create({
        user: candidate.user,
        resume: candidate._id,
        duration,
        difficulty,
        focus,
        history: [
            {
                role: "assistant",
                content: firstQuestion,
            },
        ],
    });

    return {
        sessionId: session._id,
        question: firstQuestion,
    };
};

module.exports = {
    startInterview,
};