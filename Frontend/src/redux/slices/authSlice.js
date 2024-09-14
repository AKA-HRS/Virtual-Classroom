// redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    userRole: sessionStorage.getItem("user.role") || null, //when app load it should check session storage
    user: sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.userRole = action.payload.role;

      // Optionally, you can update sessionStorage here
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.userRole = null;

      // Optionally, you can clear sessionStorage here
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("user.role");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
