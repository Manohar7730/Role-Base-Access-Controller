import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRoles, updateRole } from "../../services/roleService";
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRoles();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Roles Fetch failed",
      );
    }
  },
);
export const updateRolePermissions = createAsyncThunk(
  "roles/updateRole",
  async ({ id, permissions }, { rejectWithValue }) => {
    try {
      const data = await updateRole(id, permissions);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  },
);
const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roleList: [],
    roleLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.roleLoading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roleList = action.payload.data;
      })
      .addCase(updateRolePermissions.pending, (state) => {
        state.roleLoading = true;
      })
      .addCase(updateRolePermissions.fulfilled, (state, action) => {
        const updated = action.payload.data;

        const index = state.roleList.findIndex((r) => r._id === updated._id);

        if (index !== -1) {
          state.roleList[index] = updated;
        }
      });
  },
});

export default rolesSlice.reducer;
