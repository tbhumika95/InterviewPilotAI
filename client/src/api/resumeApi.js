import api from "./axios";

export const uploadResume = async (formData) => {
  const response = await api.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getMyResume = async () => {
  const response = await api.get("/resume/me");
  return response.data;
};