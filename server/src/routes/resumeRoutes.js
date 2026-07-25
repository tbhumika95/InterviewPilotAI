const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const { extractTextFromPDF } = require("../services/pdfService");

router.post(
    "/upload",
    upload.single("resume"),
    async (req, res) => {

        try {

            // Extract text from uploaded PDF
            const extractedText = await extractTextFromPDF(req.file.path);

            res.status(200).json({
                success: true,
                message: "Resume uploaded successfully",
                extractedText,
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