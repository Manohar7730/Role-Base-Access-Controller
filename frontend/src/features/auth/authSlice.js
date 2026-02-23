import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../services/authService";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await register(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed",
      );
    }
  },
);
const storedUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: storedUser,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
    permissions: storedUser?.role?.permissions?.map((p) => p.key) || [],
  },
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload.data.role.permissions.map(
        (p) => p.key,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.data));
        state.isAuthenticated = true;
        state.permissions = action.payload.data.role.permissions.map(
          (p) => p.key,
        );
        console.log("LOGIN PAYLOAD:", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, setPermissions } = authSlice.actions;

export default authSlice.reducer;
