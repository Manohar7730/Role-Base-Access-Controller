import api from "./api";

export const login = async (credentials) => {
  const response = await api.post("/api/login", credentials);
  return response.data;
};

export const register = async (credentials) => {
  const response = await api.post("/api/register", credentials);
  return response.data;
};
