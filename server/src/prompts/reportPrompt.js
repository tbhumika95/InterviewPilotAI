const reportPrompt = ({ candidate, history }) => {
    return `
You are an experienced technical interviewer.

Based on the interview conversation below, generate a detailed interview evaluation.

==============================
CANDIDATE PROFILE
==============================

Summary:
${candidate.summary || "Not Available"}

Skills:
${candidate.skills.join(", ")}

Technologies:
${candidate.technologies.join(", ")}

Strengths:
${candidate.strengths.join(", ")}

==============================
INTERVIEW CONVERSATION
==============================

${history
    .map(
        (message) => `
${message.role.toUpperCase()}:
${message.content}
`
    )
    .join("\n")}

==============================
EVALUATION RULES
==============================

Evaluate the candidate honestly.

Consider:

- Communication
- Technical Knowledge
- Problem Solving
- Confidence
- Overall Performance

Also provide:

- Strengths
- Weaknesses
- Suggestions for Improvement

Finally decide:

- Hire
- Borderline
- No Hire

==============================
OUTPUT FORMAT
==============================

Return ONLY valid JSON.

{
    "communication": 8,
    "technicalKnowledge": 7,
    "problemSolving": 8,
    "confidence": 9,
    "overallRating": 8,

    "strengths": [
        "...",
        "..."
    ],

    "weaknesses": [
        "...",
        "..."
    ],

    "suggestions": [
        "...",
        "..."
    ],

    "decision": "Hire",

    "summary": "Short interview summary."
}

Do not return markdown.

Do not explain anything.

Return ONLY valid JSON.
`;
};

module.exports = reportPrompt;