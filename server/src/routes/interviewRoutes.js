const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    startInterview,
    nextQuestion,
    getReport,
    getHistory,
} = require("../controllers/interviewController");

router.post("/start", protect, startInterview);

router.post("/next", protect, nextQuestion);

router.get("/report/:sessionId", protect, getReport);

router.get("/history", protect, getHistory);

module.exports = router;