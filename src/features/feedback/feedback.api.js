import api from "../../api/api";

export const submitFeedback = async (feedbackData) => {
  const response = await api.post("/feedback", feedbackData);
  return response.data;
};

export const getFeedback = async () => {
  const response = await api.get("/feedback");
  return response.data;
};
