// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/ProtectedRoute";

// import Header from "./components/Header";
// import Footer from "./components/Footer";
import AppLayout from "./AppLayout";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import RegistrationForm from "./pages/RegistrationForm";
import { ToastContainer } from "react-toastify";
import UserProfile from "./pages/UserProfile";

const App = () => (
  <Provider store={store}>
    <Router>
      {/* <Header /> */}
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/new user" element={<RegistrationForm />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AppLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="profile" element={<UserProfile />} />
              <Route
                path="admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
      {/* <Footer /> */}

      <ToastContainer />
    </Router>
  </Provider>
);

export default App;
