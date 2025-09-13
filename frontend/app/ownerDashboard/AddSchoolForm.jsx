// "use client";
// import { useState } from "react";

// export default function AddSchoolForm() {
//   const [formData, setFormData] = useState({
//     schoolName: "",
//     schoolCode: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//     email: "",
    
//     principalName: "",
//     principalEmail: "",
//     principalPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };



//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log("Submitting school data:", formData);

//   const res = await fetch("http://localhost:4000/api/school/add-school", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });

//   const data = await res.json();
//   console.log("Response from server:", data);

//   alert(data.message || "School added successfully!");

//   // reset properly (don't set to {})
//   setFormData({
//     schoolName: "",
//     schoolCode: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//     email: "",
//     principalName: "",
//     principalEmail: "",
//     principalPassword: "",
//   });
// };


//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="mt-6 bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto space-y-6"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 text-center">
//         ➕ Add New School
//       </h2>

//       {/* 🏫 School Details Section */}
//       <div>
//         <h3 className="text-lg font-semibold text-blue-600 mb-3">
//           🏫 School Details
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="schoolName"
//             placeholder="School Name *"
//             value={formData.schoolName}
//             onChange={handleChange}
//             required
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="schoolCode"
//             placeholder="School Code / Unique ID"
//             value={formData.schoolCode}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={formData.address}
//             onChange={handleChange}
//             className="p-2 border rounded col-span-2"
//           />
//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={formData.city}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="state"
//             placeholder="State"
//             value={formData.state}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="pincode"
//             placeholder="Pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="School Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="p-2 border rounded"
//           />
//         </div>
//       </div>

//       {/* 👨‍🏫 Principal Credentials Section */}
//       <div>
//         <h3 className="text-lg font-semibold text-green-600 mb-3">
//           👨‍🏫 Principal Credentials
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


//           <input
//             type="text"
//             name="principalName"
//             placeholder="Principal's name"
//             value={formData.principalName}
//             onChange={handleChange}
//             className="p-2 border rounded"
//             required
//           />

//           <input
//             type="email"
//             name="principalEmail"
//             placeholder="Principal Email (Login ID)"
//             value={formData.principalEmail}
//             onChange={handleChange}
//             className="p-2 border rounded"
//             required
//           />
//           <input
//             type="password"
//             name="principalPassword"
//             placeholder="Principal Password"
//             value={formData.principalPassword}
//             onChange={handleChange}
//             className="p-2 border rounded col-span-2"
//             required
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//       >
//         ✅ Create School
//       </button>
//     </form>
//   );
// }

//////////////

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

    const res = await fetch("http://localhost:4000/api/school/add-school", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("Response from server:", data);

    alert(data.message || "School added successfully!");

    setFormData({
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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto space-y-8"
    >
      <h2 className="text-3xl font-semibold text-gray-900 text-center">
        Add New School
      </h2>

      {/* School Details */}
      <div>
        <h3 className="text-xl font-medium text-gray-700 mb-4">School Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Code</label>
            <input
              type="text"
              name="schoolCode"
              value={formData.schoolCode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Principal Credentials */}
      <div>
        <h3 className="text-xl font-medium text-gray-700 mb-4">Principal Credentials</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Name *</label>
            <input
              type="text"
              name="principalName"
              value={formData.principalName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Email *</label>
            <input
              type="email"
              name="principalEmail"
              value={formData.principalEmail}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Password *</label>
            <input
              type="password"
              name="principalPassword"
              value={formData.principalPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2.5 rounded-md hover:bg-gray-900 transition duration-200"
      >
        Add School
      </button>
    </form>
  );
}
