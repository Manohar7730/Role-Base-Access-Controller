import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { login, register } from "../../services/authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await login(credentials);

      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return rejectWithValue();
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await register(credentials);

      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Register failed");
      return rejectWithValue();
    }
  },
);

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const storedUser = getStoredUser();
const storedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: storedToken,
    user: storedUser,
    isAuthenticated: !!(storedToken && storedUser),
    loading: false,
    permissions: storedUser?.role?.permissions?.map((p) => p.key) || [],
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.permissions = [];

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.data));

        state.permissions = action.payload.data.role.permissions.map(
          (p) => p.key,
        );
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
