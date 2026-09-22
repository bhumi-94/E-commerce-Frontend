import api from "../../api/api";

// GET CART
export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};

// ADD TO CART
export const addCartItem = async (productId, quantity = 1) => {
  const response = await api.post("/cart", {
    product_id: productId,
    quantity,
  });

  return response.data;
};

// UPDATE CART QUANTITY
export const updateCartItem = async (productId, quantity) => {
  const response = await api.put(`/cart/${productId}`, {
    quantity,
  });

  return response.data;
};

// REMOVE CART ITEM
export const removeCartItem = async (productId) => {
  const response = await api.delete(`/cart/${productId}`);

  return response.data;
};

// CLEAR CART
export const clearCartApi = async () => {
  const response = await api.delete("/cart");

  return response.data;
};
