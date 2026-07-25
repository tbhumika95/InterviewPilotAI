const fs = require("fs");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (filePath) => {
    try {

        // Read PDF file
        const dataBuffer = fs.readFileSync(filePath);

        // Parse PDF
        const data = await pdfParse(dataBuffer);

        return data.text;

    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    extractTextFromPDF,
};