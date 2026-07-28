const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const resumePrompt = require("../prompts/resumePrompt");

const analyzeResume = async (resumeText) => {

    console.log("Sending Resume to Groq...");

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: resumePrompt(resumeText),
            },
        ],
        model: "llama-3.3-70b-versatile",
    });

    const response = completion.choices[0].message.content;

    try {
        return JSON.parse(response);
    } catch (error) {
        throw new Error("Invalid JSON received from AI.");
    }
};

const generateQuestion = async (prompt) => {

    console.log("Generating Interview Question...");

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "llama-3.3-70b-versatile",
    });

    return completion.choices[0].message.content.trim();
};

module.exports = {
    analyzeResume,
    generateQuestion,
};