// "use client";
// import React, { useState, useEffect } from "react";
// import AddTeacherForm from "../AddTeacherForm";

// export default function ManageTeachersPage() {
//   const [teachers, setTeachers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTeacher, setEditingTeacher] = useState(null);
//   const [viewingTeacher, setViewingTeacher] = useState(null);

//   // ✅ Fetch teachers from backend
//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await fetch("http://localhost:4000/api/teachers/all-teachers", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         console.log("Fetched teachers:", data);

//         if (Array.isArray(data)) {
//           setTeachers(data);
//         } else {
//           console.error("Unexpected response:", data);
//           setTeachers([]);
//         }
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const handleAddTeacher = (teacher) => {
//     setTeachers([...teachers, teacher]);
//     setIsModalOpen(false);
//   };

//   const handleUpdateTeacher = (updatedTeacher) => {
//     const updatedList = teachers.map((t) =>
//       t._id === updatedTeacher._id ? updatedTeacher : t
//     );
//     setTeachers(updatedList);
//     setEditingTeacher(null);
//     setIsModalOpen(false);
//   };

//   const handleDelete = async (teacherId) => {
//     if (!window.confirm("Are you sure you want to delete this teacher?")) return;

//     try {
//       const res = await fetch(`http://localhost:4000/api/teachers/${teacherId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to delete teacher");
//       setTeachers(teachers.filter((t) => t._id !== teacherId));
//     } catch (error) {
//       console.error("Error deleting teacher:", error);
//     }
//   };

//   return (
//     <div className="p-8 text-black bg-white min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-blue-600">Manage Teachers</h1>
//         <button
//           onClick={() => {
//             setEditingTeacher(null);
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
//         >
//           + Add Teacher
//         </button>
//       </div>

//       {/* ✅ Teachers Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full table-auto text-left bg-gray-100 rounded shadow">
//           <thead>
//             <tr className="bg-gray-200 text-blue-700">
//               <th className="p-4">Name</th>
//               <th className="p-4">Email</th>
//               <th className="p-4">Phone</th>
//               <th className="p-4">Class Level</th>
//               <th className="p-4">Subject</th>
//               <th className="p-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {teachers.length === 0 ? (
//               <tr>
//                 <td colSpan="6" className="p-4 text-center text-gray-500">
//                   No teachers added yet.
//                 </td>
//               </tr>
//             ) : (
//               teachers.map((teacher) => (
//                 <tr
//                   key={teacher._id}
//                   className="border-t border-gray-300 hover:bg-gray-100"
//                 >
//                   <td className="p-4">{teacher.fullName}</td>
//                   <td className="p-4">{teacher.email}</td>
//                   <td className="p-4">{teacher.phone || "-"}</td>
//                   <td className="p-4">{teacher.classLevel || "-"}</td>
//                   <td className="p-4">{teacher.subject || "-"}</td>
//                   <td className="p-4">
//                     <button
//                       onClick={() => setViewingTeacher(teacher)}
//                       className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm text-white mr-2"
//                     >
//                       View
//                     </button>
//                     <button
//                       onClick={() => {
//                         setEditingTeacher(teacher);
//                         setIsModalOpen(true);
//                       }}
//                       className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm text-white mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(teacher._id)}
//                       className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm text-white"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ✅ Add/Edit Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg relative">
//             <div className="max-h-[80vh] overflow-y-auto p-6">
//               <h2 className="text-2xl font-semibold text-blue-700 mb-4">
//                 {editingTeacher ? "Edit Teacher" : "Add Teacher"}
//               </h2>
//               <AddTeacherForm
//                 teacherData={editingTeacher}
//                 onAdded={editingTeacher ? handleUpdateTeacher : handleAddTeacher}
//               />
//             </div>
//             <button
//               onClick={() => {
//                 setIsModalOpen(false);
//                 setEditingTeacher(null);
//               }}
//               className="absolute top-3 right-3 text-gray-600 hover:text-white border border-gray-300 rounded-md text-xl px-3 py-1 hover:bg-red-500 transition-colors"
//               aria-label="Close modal"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ✅ View Modal */}
//       {viewingTeacher && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-md shadow-lg relative p-6">
//             <h2 className="text-2xl font-semibold text-blue-700 mb-4">
//               Teacher Details
//             </h2>
//             <div className="space-y-3 text-gray-800">
//               <p><strong>Name:</strong> {viewingTeacher.fullName}</p>
//               <p><strong>Email:</strong> {viewingTeacher.email}</p>
//               <p><strong>Phone:</strong> {viewingTeacher.phone || "-"}</p>
//               <p><strong>Class Level:</strong> {viewingTeacher.classLevel || "-"}</p>
//               <p><strong>Subject:</strong> {viewingTeacher.subject || "-"}</p>
//             </div>
//             <button
//               onClick={() => setViewingTeacher(null)}
//               className="absolute top-3 right-3 text-gray-600 hover:text-white border border-gray-300 rounded-md text-xl px-3 py-1 hover:bg-red-500 transition-colors"
//               aria-label="Close modal"
//             >
//               &times;
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import React, { useState, useEffect } from "react";
import AddTeacherForm from "../AddTeacherForm";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import CsvUpload from "@/components/CsvUpload";

export default function ManageTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [viewingTeacher, setViewingTeacher] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/teachers/all-teachers", {
          credentials: "include",
        });
        const data = await res.json();
        console.log("Fetched teachers:", data);

        if (Array.isArray(data)) {
          setTeachers(data);
        } else {
          console.error("Unexpected response:", data);
          setTeachers([]);
        }
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleAddTeacher = (teacher) => {
    setTeachers([...teachers, teacher]);
    setIsModalOpen(false);
  };

  const handleUpdateTeacher = (updatedTeacher) => {
    const updatedList = teachers.map((t) =>
      t._id === updatedTeacher._id ? updatedTeacher : t
    );
    setTeachers(updatedList);
    setEditingTeacher(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (teacherId) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/teachers/${teacherId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete teacher");
      setTeachers(teachers.filter((t) => t._id !== teacherId));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 text-black dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
          Manage Teachers
        </h1>

          <div className="flex gap-2">
    {/* Upload CSV button component */}
    <CsvUpload />
    </div>

        <button
          onClick={() => {
            setEditingTeacher(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm sm:text-base"
        >
          + Add Teacher
        </button>
      </div>

      {/* Teachers Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left bg-gray-100 dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-blue-300">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Class Level</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No teachers added yet.
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="border-t border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="p-4">{teacher.fullName}</td>
                  <td className="p-4">{teacher.email}</td>
                  <td className="p-4">{teacher.phone || "-"}</td>
                  <td className="p-4">{teacher.classLevel || "-"}</td>
                  <td className="p-4">{teacher.subject || "-"}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => setViewingTeacher(teacher)}
                      className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded"
                      title="View"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingTeacher(teacher);
                        setIsModalOpen(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-1.5 rounded"
                      title="Edit"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(teacher._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded"
                      title="Delete"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg w-full max-w-2xl shadow-lg relative overflow-hidden">
      
      {/* Header with close button */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
          {editingTeacher ? "Edit Teacher" : "Add Teacher"}
        </h2>
        <button
          onClick={() => {
            setIsModalOpen(false);
            setEditingTeacher(null);
          }}
          className="text-gray-600 dark:text-gray-300 hover:text-white border border-gray-300 dark:border-gray-600 rounded-md text-xl px-3 py-1 hover:bg-red-500 transition-colors"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>

      {/* Scrollable content */}
      <div className="max-h-[80vh] overflow-y-auto px-6 pb-6">
        <AddTeacherForm
          teacherData={editingTeacher}
          onAdded={editingTeacher ? handleUpdateTeacher : handleAddTeacher}
        />
      </div>
    </div>
  </div>
)}


      {/* View Modal */}
      {viewingTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg w-full max-w-md shadow-lg relative p-6">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
              Teacher Details
            </h2>
            <div className="space-y-3">
              <p><strong>Name:</strong> {viewingTeacher.fullName}</p>
              <p><strong>Email:</strong> {viewingTeacher.email}</p>
              <p><strong>Phone:</strong> {viewingTeacher.phone || "-"}</p>
              <p><strong>Class Level:</strong> {viewingTeacher.classLevel || "-"}</p>
              <p><strong>Subject:</strong> {viewingTeacher.subject || "-"}</p>
            </div>
            <button
              onClick={() => setViewingTeacher(null)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-white border border-gray-300 dark:border-gray-600 rounded-md text-xl px-3 py-1 hover:bg-red-500 transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
