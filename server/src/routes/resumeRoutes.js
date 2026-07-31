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
      const extractedText = await extractTextFromPDF(req.file.path);

      const analysis = await analyzeResume(extractedText);

      // Optional: remove previous resume
      await Resume.deleteMany({ user: req.user.id });

      const resume = await Resume.create({
        user: req.user.id,
        summary: analysis.summary,
        skills: analysis.skills,
        technologies: analysis.technologies,
        projects: analysis.projects,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
      });

      res.status(200).json({
        success: true,
        resumeId: resume._id,
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

// GET Logged-in user's resume
router.get("/me", protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.id });

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;