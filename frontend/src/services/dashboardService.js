import api from "./api";

export const getDashboardStats = async () => {
  const res = await api.get("/api/dashboard");
  return res.data;
};