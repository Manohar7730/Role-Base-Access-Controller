import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/api/users");
  return response.data;
};

export const updateUserStatus = async (id, status) => {
  const response = await api.patch(`/api/users/${id}/status`, {
    status,
  });
  return response.data;
};
