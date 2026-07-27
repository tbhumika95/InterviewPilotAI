const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        summary: {
            type: String,
        },

        skills: [String],

        technologies: [String],

        projects: [{
            name: String,
            description: String,
            github: String,
            githubAnalysis: {
                name: String,
                description: String,
                language: String,
                topics: [String]
            }
        }],

        strengths: [String],

        weaknesses: [String],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Resume", resumeSchema);