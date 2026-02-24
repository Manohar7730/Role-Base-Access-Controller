import api from "./api";

export const getPermissions = async () => {
  const response = await api.get("/api/permissions");
  return response.data;
};

export const createPermission = async (payload) => {
  const res = await api.post("/api/permissions", payload);
  return res.data;
};