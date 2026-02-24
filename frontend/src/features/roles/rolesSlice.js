import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRoles} from "../../services/roleService";
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
  },
});

export default rolesSlice.reducer;
