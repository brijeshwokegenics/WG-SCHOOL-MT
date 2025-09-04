"use client";
import { useState } from "react";

export default function AddSchoolForm() {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolCode: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    principalName: "",
    principalEmail: "",
    principalPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting school data:", formData);

    // 🔹 TODO: Call backend API
    // const res = await fetch("http://localhost:4000/api/schools/add", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // });
    // const data = await res.json();
    // console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        ➕ Add New School
      </h2>

      {/* 🏫 School Details Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-600 mb-3">
          🏫 School Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="schoolName"
            placeholder="School Name *"
            value={formData.schoolName}
            onChange={handleChange}
            required
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="schoolCode"
            placeholder="School Code / Unique ID"
            value={formData.schoolCode}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-2 border rounded col-span-2"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="School Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
      </div>

      {/* 👨‍🏫 Principal Credentials Section */}
      <div>
        <h3 className="text-lg font-semibold text-green-600 mb-3">
          👨‍🏫 Principal Credentials
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="principalName"
            placeholder="Principal Full Name"
            value={formData.principalName}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="principalEmail"
            placeholder="Principal Email (Login ID)"
            value={formData.principalEmail}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            name="principalPassword"
            placeholder="Principal Password"
            value={formData.principalPassword}
            onChange={handleChange}
            className="p-2 border rounded col-span-2"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ✅ Create School
      </button>
    </form>
  );
}
