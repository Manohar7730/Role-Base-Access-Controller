import api from "./api";

export const getRoles = async () => {
  const response = await api.get("/api/roles");
  return response.data;
};