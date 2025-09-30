// "use client";
// import { useState, useEffect } from "react";

// export default function EditSchool({ school, onClose, onUpdate }) {
//   const [formData, setFormData] = useState({
//     schoolName: "",
//     schoolCode: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     phone: "",
//     email: "",
//   });

//   useEffect(() => {
//     if (school) {
//       setFormData({
//         schoolName: school.schoolName || "",
//         schoolCode: school.schoolCode || "",
//         address: school.address || "",
//         city: school.city || "",
//         state: school.state || "",
//         pincode: school.pincode || "",
//         phone: school.phone || "",
//         email: school.email || "",
//       });
//     }
//   }, [school]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//      // Validate phone number
//   if (!/^\d{10}$/.test(formData.phone)) {
//     alert("Phone number must be exactly 10 digits.");
//     return;
//   }

//     try {
//       const res = await fetch(`http://localhost:4000/api/school/${school._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("School updated successfully");
//         onUpdate(data.school); // refresh UI
//         onClose(); // close modal
//       } else {
//         alert(data.message || "Error updating school");
//       }
//     } catch (err) {
//       console.error("Error updating school:", err);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-2xl mx-4 shadow-xl">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
//           Edit School
//         </h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
//           {[
//             { label: "School Name", name: "schoolName", type: "text" },
//             { label: "School Code", name: "schoolCode", type: "text" },
//             { label: "Address", name: "address", type: "text" },
//             { label: "City", name: "city", type: "text" },
//             { label: "State", name: "state", type: "text" },
//             { label: "Pincode", name: "pincode", type: "text" },

//             { label: "Phone", name: "phone", type: "tel", pattern: "[0-9]{10}", maxLength: 10 },

//             { label: "Email", name: "email", type: "email" },
//           ].map(({ label, name, type }) => (
//             <div key={name} className="flex flex-col">
//               <label
//                 htmlFor={name}
//                 className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
//               >
//                 {label}
//               </label>
//               <input
//                 type={type}
//                 name={name}
//                 id={name}
//                 value={formData[name]}
//                 onChange={handleChange}
//                 placeholder={label}
//                 required={name === "schoolName"}
//                 pattern={name === "phone" ? "[0-9]{10}" : undefined}
//                 maxLength={name === "phone" ? 10 : undefined}
//                 className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
//               />
//             </div>
//           ))}

//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition duration-150"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-150"
//             >
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState, useEffect } from "react";

export default function EditSchool({ school, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolCode: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (school) {
      setFormData({
        schoolName: school.schoolName || "",
        schoolCode: school.schoolCode || "",
        address: school.address || "",
        city: school.city || "",
        state: school.state || "",
        pincode: school.pincode || "",
        phone: school.phone || "",
        email: school.email || "",
      });
    }
  }, [school]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/school/${school._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("School updated successfully");
        onUpdate(data.school); // refresh UI
        onClose(); // close modal
      } else {
        alert(data.message || "Error updating school");
      }
    } catch (err) {
      console.error("Error updating school:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-2xl mx-auto shadow-xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          Edit School
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {[
            { label: "School Name", name: "schoolName", type: "text" },
            { label: "School Code", name: "schoolCode", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "State", name: "state", type: "text" },
            { label: "Pincode", name: "pincode", type: "text" },
            { label: "Phone", name: "phone", type: "tel", pattern: "[0-9]{10}", maxLength: 10 },
            { label: "Email", name: "email", type: "email" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={label}
                required={name === "schoolName"}
                pattern={name === "phone" ? "[0-9]{10}" : undefined}
                maxLength={name === "phone" ? 10 : undefined}
                className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-150"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
