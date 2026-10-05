import api from "../../api/api";

export const getAdminProducts = async () => {
  const response = await api.get("/admin/products");
  return response.data;
};

export const addAdminProduct = async (formData) => {
  const response = await api.post("/admin/products", formData);
  return response.data;
};

export const updateAdminProduct = async (productId, formData) => {
  const response = await api.put(`/admin/products/${productId}`, formData);
  return response.data;
};