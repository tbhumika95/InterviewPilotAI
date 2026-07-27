const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const resumePrompt = require("../prompts/resumePrompt");

const analyzeResume = async (resumeText) => {

    console.log("Sending resume to Groq...");

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: resumePrompt(resumeText),
            },
        ],
        model: "llama-3.3-70b-versatile",
    });

    console.log("Received response from Groq!");

    const response = completion.choices[0].message.content;

    try {
        return JSON.parse(response);
    } catch (error) {
        throw new Error("Invalid JSON received from AI.");
    }
};

module.exports = {
    analyzeResume,
};