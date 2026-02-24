import api from "./api";

export const getPermissions = async () => {
  const response = await api.get("/api/permissions");
  return response.data;
};
