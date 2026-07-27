const resumePrompt = (resumeText) => `
You are an experienced technical interviewer.

Analyze the following resume.

Return ONLY a valid JSON object.

Do not write explanations.
Do not use markdown.
Do not wrap the JSON inside \`\`\`.

Return this exact structure:

{
  "summary": "",
  "skills": [],
  "technologies": [],
  "projects": [
    {
      "name": "",
      "description": "",
      "github": ""
    }
  ],
  "strengths": [],
  "weaknesses": []
}

Rules:
1. Extract GitHub links ONLY if they are present in the resume.
2. If a project has no GitHub link, return an empty string.
3. Do not invent GitHub links.
4. Return valid JSON only.

Resume:

${resumeText}
`;

module.exports = resumePrompt;