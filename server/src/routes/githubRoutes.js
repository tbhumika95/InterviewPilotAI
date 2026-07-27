const express = require("express");

const router = express.Router();

const { analyzeGitHub } = require("../services/githubService");

router.post("/analyze", async (req, res) => {

    try {

        const { githubUrl } = req.body;

        const repo = await analyzeGitHub(githubUrl);

        res.json({
            success: true,
            repo,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

});

module.exports = router;