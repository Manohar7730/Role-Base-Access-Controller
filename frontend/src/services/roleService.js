import api from "./api";

export const getRoles = async () => {
  const response = await api.get("/api/roles");
  return response.data;
};


export const updateRole = async (id, permissions) => {
  const res = await api.patch(`/api/roles/${id}`, {
    permissions,
  });
  return res.data;
};

export const createRole = async (payload) => {
  const res = await api.post("/api/roles", payload);
  return res.data;
};