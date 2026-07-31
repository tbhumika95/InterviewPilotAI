const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const resumePrompt = require("../prompts/resumePrompt");

const analyzeResume = async (resumeText) => {

    console.log("Sending Resume to Groq...");

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: resumePrompt(resumeText),
            },
        ],
        temperature: 0.2,
        response_format: {
            type: "json_object",
        },
    });

    const response = completion.choices[0].message.content;

    try {
        return JSON.parse(response);
    } catch (error) {
        console.error(response);
        throw new Error("Invalid JSON received from AI.");
    }
};

const generateInterviewResponse = async (prompt) => {

    console.log("Generating Interview Response...");

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.5,
        response_format: {
            type: "json_object",
        },
    });

    const response = completion.choices[0].message.content;

    try {
        return JSON.parse(response);
    } catch (error) {
        console.error(response);
        throw new Error("Invalid JSON received from AI.");
    }
};

const generateReport = async (prompt) => {

    console.log("Generating Interview Report...");

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.3,
        response_format: {
            type: "json_object",
        },
    });

    const response = completion.choices[0].message.content;

    try {
        return JSON.parse(response);
    } catch (error) {
        console.error(response);
        throw new Error("Invalid JSON received from AI.");
    }
};

module.exports = {
    analyzeResume,
    generateInterviewResponse,
    generateReport,
};