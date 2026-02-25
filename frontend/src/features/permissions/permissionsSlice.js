import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getPermissions,
  createPermission,
} from "../../services/permissionService";

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getPermissions();
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Permission fetch failed"
      );
      return rejectWithValue();
    }
  }
);

export const createPermissionThunk = createAsyncThunk(
  "permissions/createPermission",
  async ({ key, description }, { rejectWithValue }) => {
    try {
      const data = await createPermission({ key, description });

      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Create permission failed"
      );
      return rejectWithValue();
    }
  }
);

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchPermissions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createPermissionThunk.fulfilled, (state, action) => {
        state.list.push(action.payload.data);
      });
  },
});

export default permissionsSlice.reducer;