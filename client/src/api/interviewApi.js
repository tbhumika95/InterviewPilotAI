import api from "./axios";

export const startInterview = async (data) => {
  const response = await api.post("/interview/start", data);
  return response.data;
};

export const nextQuestion = async (data) => {
  const response = await api.post("/interview/next", data);
  return response.data;
};

export const getInterviewHistory = async () => {
  const response = await api.get("/interview/history");
  return response.data;
};

export const getInterviewReport = async (sessionId) => {
  const response = await api.get(`/interview/report/${sessionId}`);
  return response.data;
};