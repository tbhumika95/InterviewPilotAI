const axios = require("axios");

const analyzeGitHub = async (githubUrl) => {

    try {

        // Example:
        // https://github.com/bhumika/interviewpilot

        const parts = githubUrl.split("/");

        const owner = parts[3];
        const repo = parts[4];

        // Repository Details
        const repoResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}`
        );

        const readmeResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/readme`,
            {
                headers: {
                    Accept: "application/vnd.github.raw",
                },
            }
        );

        return {
            name: repoResponse.data.name,

            description: repoResponse.data.description,

            language: repoResponse.data.language,

            topics: repoResponse.data.topics,

            readme: readmeResponse.data,
        };

    } catch (error) {

        throw new Error("Unable to fetch GitHub repository");

    }

};

module.exports = {
    analyzeGitHub,
};