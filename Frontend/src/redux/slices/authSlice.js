// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userRole: null,
    user: null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userRole = action.payload.role;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.userRole = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
