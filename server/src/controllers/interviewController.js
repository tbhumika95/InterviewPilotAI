const interviewService = require("../services/interviewService");

const startInterview = async (req, res) => {
    try {

        const { resumeId, duration, difficulty, focus } = req.body;

        const result = await interviewService.startInterview({
            resumeId,
            duration,
            difficulty,
            focus,
        });

        return res.status(201).json({
            success: true,
            data: result,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const nextQuestion = async (req, res) => {
    try {

        const { sessionId, answer } = req.body;

        const result = await interviewService.nextQuestion({
            sessionId,
            answer,
        });

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getReport = async (req, res) => {
    try {

        const report = await interviewService.getReport(
            req.params.sessionId
        );

        return res.status(200).json({
            success: true,
            data: report,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getHistory = async (req, res) => {
    try {

        const userId = req.user.id || req.user;

        const history = await interviewService.getHistory(userId);

        return res.status(200).json({
            success: true,
            data: history,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getInterviewDetails = async (req, res) => {
    try {

        const session = await interviewService.getInterviewDetails(
            req.params.sessionId
        );

        return res.status(200).json({
            success: true,
            data: session,
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    startInterview,
    nextQuestion,
    getReport,
    getHistory,
    getInterviewDetails,
};