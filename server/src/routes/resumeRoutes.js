const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const Resume = require("../models/Resume");
const protect = require("../middleware/authMiddleware");
const { extractTextFromPDF } = require("../services/pdfService");
const { analyzeResume } = require("../services/groqService");

router.post(
    "/upload",
    protect,
    upload.single("resume"),
    async (req, res) => {

        try {

            // Extract text from uploaded PDF
            const extractedText = await extractTextFromPDF(req.file.path);

            const analysis = await analyzeResume(extractedText);
            await Resume.create({
                user: req.user,

                summary: analysis.summary,

                skills: analysis.skills,

                technologies: analysis.technologies,

                projects: analysis.projects,

                strengths: analysis.strengths,

                weaknesses: analysis.weaknesses,
            });

            res.status(200).json({
                success: true,
                analysis,
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message,
            });

        }

    }
);

module.exports = router;