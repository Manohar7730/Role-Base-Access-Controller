import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers, updateUserStatus } from "../../services/userService";
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUsers();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Users Fetch failed",
      );
    }
  },
);
export const makeUpdateUserStatus = createAsyncThunk(
  "users/updateUserStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const data = await updateUserStatus(id, status);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Users Fetch failed",
      );
    }
  },
);
const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(makeUpdateUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeUpdateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.data;

        state.list = state.list.map((u) =>
          u._id === updatedUser._id ? updatedUser : u,
        );
      })
      .addCase(makeUpdateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
