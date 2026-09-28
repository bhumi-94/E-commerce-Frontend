import api from "../../api/api";

// Get payment methods
export const getPaymentMethods = async () => {
  const response = await api.get("/payment-methods");
  return response.data;
};

// Add payment method
export const addPaymentMethod = async (paymentData) => {
  const response = await api.post("/payment-methods", paymentData);
  return response.data;
};

// Update payment method
export const updatePaymentMethod = async (paymentId, paymentData) => {
  const response = await api.put(`/payment-methods/${paymentId}`, paymentData);
  return response.data;
};

// Delete payment method
export const deletePaymentMethod = async (paymentId) => {
  const response = await api.delete(`/payment-methods/${paymentId}`);
  return response.data;
};

// Set default
export const setDefaultPaymentMethod = async (paymentId) => {
  const response = await api.put(`/payment-methods/${paymentId}/default`);
  return response.data;
};

