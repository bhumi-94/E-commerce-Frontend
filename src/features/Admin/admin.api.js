import api from "../../api/api";

export const getAdminUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const dismissAdminUser = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/dismiss`);
  return response.data;
};

export const enableAdminUser = async (userId) => {
  const response = await api.put(`/admin/users/${userId}/enable`);
  return response.data;
};
