import api from "../../api/api";

// GET WISHLIST
export const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

// ADD TO WISHLIST
export const addWishlistItem = async (productId) => {
  const response = await api.post("/wishlist", {
    product_id: productId,
  });

  return response.data;
};

// REMOVE FROM WISHLIST
export const removeWishlistItem = async (productId) => {
  const response = await api.delete(`/wishlist/${productId}`);

  return response.data;
};

// CLEAR WISHLIST
export const clearWishlistApi = async () => {
  const response = await api.delete("/wishlist");

  return response.data;
};
