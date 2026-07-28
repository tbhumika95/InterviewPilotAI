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

    // First Interview Stage
    const stage = "HR";

    // Generate AI Prompt
    const prompt = interviewPrompt({
        candidate,
        duration,
        difficulty,
        focus,
        stage,
        history: [],
    });

    // Generate First Question
    const firstQuestion = await generateQuestion(prompt);

    // Create Interview Session
    const session = await InterviewSession.create({
        candidate: resumeId,
        duration,
        difficulty,
        focus,
        currentStage: stage,
        history: [
            {
                question: firstQuestion,
                answer: "",
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