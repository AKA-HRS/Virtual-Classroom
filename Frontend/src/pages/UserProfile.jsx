import React, { useState } from "react";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Student",
  });

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    setProfile(form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({ ...profile });
    setEditing(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <div className="bg-white p-6 rounded shadow">
        {editing ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="role">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={form.role}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Name</h2>
              <p>{profile.name}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Email</h2>
              <p>{profile.email}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Role</h2>
              <p>{profile.role}</p>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
