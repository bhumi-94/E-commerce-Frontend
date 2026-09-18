import api from "../../api/api";

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const getCategoryById = async (categoryId) => {
  const response = await api.get(`/categories/${categoryId}`);
  return response.data;
};
