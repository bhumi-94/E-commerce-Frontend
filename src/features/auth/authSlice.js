import api from "../../api/api";

export const registerUser = async (data) => {
  const response = await api.post("/auth/register",data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/auth/login",data);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });
  return response.data;
};

export const resetPassword = async (
  token,
  password,
  confirmPassword
) => {
  const response = await api.post(
    "/auth/reset-password",
    {
      token,
      password,
      confirmPassword,
    }
  );

  return response.data;
};