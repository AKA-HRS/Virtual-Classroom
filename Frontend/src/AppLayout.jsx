// components/AppLayout.js
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const AppLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-200 p-6">
        <h2 className="text-xl font-bold mb-4">Navigation</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard" className="block py-2 text-blue-600 hover:underline">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin" className="block py-2 text-blue-600 hover:underline">
                Admin
              </Link>
            </li>
            <li>
              <Link to="/profile" className="block py-2 text-blue-600 hover:underline">
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    
    </div>
  );
};

export default AppLayout;
