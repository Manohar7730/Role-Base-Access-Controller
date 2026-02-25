import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createRole,
  getRoles,
  updateRole,
} from "../../services/roleService";
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRoles();
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Roles fetch failed"
      );
      return rejectWithValue();
    }
  }
);
export const createRoleThunk = createAsyncThunk(
  "roles/createRole",
  async ({ name, permissions }, { rejectWithValue }) => {
    try {
      const data = await createRole({ name, permissions });

      toast.success(data.message);

      return data;
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Create role failed"
      );
      return rejectWithValue();
    }
  }
);
export const updateRolePermissions = createAsyncThunk(
  "roles/updateRole",
  async ({ id, permissions }, { rejectWithValue }) => {
    try {
      const data = await updateRole(id, permissions);

      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
      return rejectWithValue();
    }
  }
);
const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roleList: [],
    roleLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.roleLoading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roleLoading = false;
        state.roleList = action.payload.data;
      })
      .addCase(fetchRoles.rejected, (state) => {
        state.roleLoading = false;
      })
      .addCase(createRoleThunk.fulfilled, (state, action) => {
        state.roleList.push(action.payload.data);
      })
      .addCase(updateRolePermissions.pending, (state) => {
        state.roleLoading = true;
      })
      .addCase(updateRolePermissions.fulfilled, (state, action) => {
        state.roleLoading = false;

        const updated = action.payload.data;
        const index = state.roleList.findIndex(
          (r) => r._id === updated._id
        );

        if (index !== -1) {
          state.roleList[index] = updated;
        }
      })
      .addCase(updateRolePermissions.rejected, (state) => {
        state.roleLoading = false;
      });
  },
});

export default rolesSlice.reducer;