const { startInterview } = require("../services/interviewService");

const startInterviewController = async (req, res) => {
    try {

        const { resumeId, duration, difficulty, focus } = req.body;

        if (!resumeId || !duration || !difficulty || !focus) {
            return res.status(400).json({
                success: false,
                message: "Please provide resumeId, duration, difficulty and focus.",
            });
        }

        const result = await startInterview({
            resumeId,
            duration,
            difficulty,
            focus,
        });

        res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const nextQuestion = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Next Question API Coming Soon 🚀",
    });
};

const getReport = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Interview Report API Coming Soon 🚀",
    });
};

module.exports = {
    startInterview: startInterviewController,
    nextQuestion,
    getReport,
};