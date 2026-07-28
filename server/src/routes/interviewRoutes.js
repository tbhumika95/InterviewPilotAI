const express = require("express");

const router = express.Router();

const {
    startInterview,
    nextQuestion,
    getReport,
} = require("../controllers/interviewController");

router.post("/start", startInterview);

router.post("/next", nextQuestion);

router.get("/report/:sessionId", getReport);

module.exports = router;