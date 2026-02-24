import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPermissions } from "../../services/permissionService";

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getPermissions();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Permission fetch failed",
      );
    }
  },
);

const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    list: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        ((state.loading = false), (state.list = action.payload.data));
      });
  },
});

export default permissionsSlice.reducer;
