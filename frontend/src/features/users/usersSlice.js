import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getUsers,
  updateUserStatus,
  updateUserRole,
  changePassword,
} from "../../services/userService";
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUsers();
      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Users fetch failed"
      );
      return rejectWithValue();
    }
  }
);
export const makeUpdateUserStatus = createAsyncThunk(
  "users/updateUserStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const data = await updateUserStatus(id, status);

      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "User status update failed"
      );
      return rejectWithValue();
    }
  }
);
export const makeUpdateUserRole = createAsyncThunk(
  "users/updateUserRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const data = await updateUserRole(id, role);

      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Role update failed"
      );
      return rejectWithValue();
    }
  }
);
export const changePasswordThunk = createAsyncThunk(
  "users/changePassword",
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const data = await changePassword({
        currentPassword,
        newPassword,
      });

      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password change failed"
      );
      return rejectWithValue();
    }
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(makeUpdateUserStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeUpdateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.data;

        state.list = state.list.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        );
      })
      .addCase(makeUpdateUserStatus.rejected, (state) => {
        state.loading = false;
      })
      .addCase(makeUpdateUserRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeUpdateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload.data;

        state.list = state.list.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        );
      })
      .addCase(makeUpdateUserRole.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default usersSlice.reducer;