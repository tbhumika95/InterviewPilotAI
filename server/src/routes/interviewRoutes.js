const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    startInterview,
    nextQuestion,
    getReport,
    getHistory,
    getInterviewDetails,
} = require("../controllers/interviewController");

router.post("/start", protect, startInterview);

router.post("/next", protect, nextQuestion);

router.get("/report/:sessionId", protect, getReport);

router.get("/history", protect, getHistory);

router.get("/details/:sessionId", protect, getInterviewDetails);

module.exports = router;