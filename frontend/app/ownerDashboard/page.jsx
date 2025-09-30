// "use client";

// import { useState, useEffect } from "react";
// import AddSchoolForm from "./AddSchoolForm";
// import ViewSchool from "./ViewSchool";
// import EditSchool from "./EditSchool";
// import Pagination from "@/components/Pagination";
// import SearchFilter from "@/components/SearchFilter";

// export default function OwnerDashboard() {
//   const [showForm, setShowForm] = useState(false);
//   const [schools, setSchools] = useState([]);
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [showView, setShowView] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);

//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const schoolsPerPage = 10;

//   // search & filter
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterState, setFilterState] = useState("All");

//   // sort
//   const [sortOrder, setSortOrder] = useState("latest");

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   const fetchSchools = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/school/all-schools");
//       const data = await res.json();
//       setSchools(data);
//     } catch (error) {
//       console.error("Error fetching schools:", error);
//     }
//   };

//   const handleView = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:4000/api/school/${id}`);
//       const school = await res.json();
//       setSelectedSchool(school);
//       setShowView(true);
//     } catch (error) {
//       console.error("Error fetching school details", error);
//     }
//   };

//   const handleEdit = (school) => {
//     setSelectedSchool(school);
//     setShowEdit(true);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this school?")) return;

//     try {
//       const res = await fetch(`http://localhost:4000/api/school/${id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();
//       alert(data.message);
//       fetchSchools(); // refresh
//     } catch (error) {
//       console.error("Error deleting school:", error);
//     }
//   };

//   // Filter + Search + Sort
//   const filteredSchools = schools
//     .filter((school) => {
//       const matchesSearch =
//         school.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         school.schoolCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         school.city?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesFilter =
//         filterState === "All" || school.state === filterState;

//       return matchesSearch && matchesFilter;
//     })
//     .sort((a, b) => {
//       if (sortOrder === "latest") {
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       } else {
//         return new Date(a.createdAt) - new Date(b.createdAt);
//       }
//     });

//   // Pagination
//   const indexOfLast = currentPage * schoolsPerPage;
//   const indexOfFirst = indexOfLast - schoolsPerPage;
//   const currentSchools = filteredSchools.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);

//   return (
//     <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">🏫 Owner Dashboard</h1>
//         <button
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Close Form" : "+ Add School"}
//         </button>
//       </div>

//       {/* Add School Form */}
//       {showForm && (
//         <div className="mb-6 bg-white p-4 sm:p-6 rounded-xl shadow-md">
//           <AddSchoolForm />
//         </div>
//       )}

//       {/* Search & Filter */}
//       <div className="mb-6 bg-white p-4 rounded-xl shadow-md">
//         <SearchFilter
//           searchTerm={searchTerm}
//           onSearch={(value) => {
//             setSearchTerm(value);
//             setCurrentPage(1);
//           }}
//           filterState={filterState}
//           onFilter={(value) => {
//             setFilterState(value);
//             setCurrentPage(1);
//           }}
//           states={[...new Set(schools.map((s) => s.state))]}
//           sortOrder={sortOrder}
//           onSortOrder={(value) => {
//             setSortOrder(value);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       {/* Schools Table */}
//       <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
//         <table className="min-w-full text-sm text-gray-800">
//           <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wider">
//             <tr>
//               <th className="px-4 py-3 text-left border-b">School Name</th>
//               <th className="px-4 py-3 text-left border-b">Code</th>
//               <th className="px-4 py-3 text-left border-b">City</th>
//               <th className="px-4 py-3 text-left border-b">State</th>
//               <th className="px-4 py-3 text-left border-b">Email</th>
//               <th className="px-4 py-3 text-left border-b">Principal</th>
//               <th className="px-4 py-3 text-center border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentSchools.length > 0 ? (
//               currentSchools.map((school) => (
//                 <tr
//                   key={school._id}
//                   className="hover:bg-gray-50 transition-colors duration-150"
//                 >
//                   <td className="px-4 py-4 whitespace-nowrap border-b">
//                     {school.schoolName}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap border-b">
//                     {school.schoolCode}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap border-b">
//                     {school.city}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap border-b">
//                     {school.state}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap border-b">
//                     {school.email}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap border-b">
//                     <div>{school.principal?.fullName || "-"}</div>
//                     <div className="text-xs text-gray-500">
//                       {school.principal?.email || "-"}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 border-b">
//                     <div className="flex flex-wrap justify-center gap-2">
//                       <button
//                         onClick={() => handleView(school._id)}
//                         className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md"
//                       >
//                         View
//                       </button>
//                       <button
//                         onClick={() => handleEdit(school)}
//                         className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(school._id)}
//                         className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-6 text-gray-500">
//                   No schools found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-6">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       )}

//       {/* Modals / Popups */}
//       {showView && selectedSchool && (
//         <ViewSchool school={selectedSchool} onClose={() => setShowView(false)} />
//       )}

//       {showEdit && selectedSchool && (
//         <EditSchool
//           school={selectedSchool}
//           onClose={() => setShowEdit(false)}
//           onUpdate={(updatedSchool) => {
//             setSchools((prev) =>
//                             prev.map((s) => (s._id === updatedSchool._id ? updatedSchool : s))
//             );
//             setShowEdit(false); // Close modal after update
//           }}
//         />
//       )}
//     </div>
//   );
// }


/////////////////////////////////////////

// "use client";

// import { useState, useEffect } from "react";
// import {
//   EyeIcon,
//   PencilSquareIcon,
//   TrashIcon,
//   PlusIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import AddSchoolForm from "./AddSchoolForm";
// import ViewSchool from "./ViewSchool";
// import EditSchool from "./EditSchool";
// import Pagination from "@/components/Pagination";
// import SearchFilter from "@/components/SearchFilter";

// export default function OwnerDashboard() {
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [schools, setSchools] = useState([]);
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [showView, setShowView] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);

//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const schoolsPerPage = 10;

//   // search & filter
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterState, setFilterState] = useState("All");

//   // sort
//   const [sortOrder, setSortOrder] = useState("latest");

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   const fetchSchools = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/school/all-schools");
//       const data = await res.json();
//       setSchools(data);
//     } catch (error) {
//       console.error("Error fetching schools:", error);
//     }
//   };

//   const handleView = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:4000/api/school/${id}`);
//       const school = await res.json();
//       setSelectedSchool(school);
//       setShowView(true);
//     } catch (error) {
//       console.error("Error fetching school details", error);
//     }
//   };

//   const handleEdit = (school) => {
//     setSelectedSchool(school);
//     setShowEdit(true);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this school?")) return;

//     try {
//       const res = await fetch(`http://localhost:4000/api/school/${id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();
//       alert(data.message);
//       fetchSchools();
//     } catch (error) {
//       console.error("Error deleting school:", error);
//     }
//   };

//   // Filter + Search + Sort
//   const filteredSchools = schools
//     .filter((school) => {
//       const matchesSearch =
//         school.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         school.schoolCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         school.city?.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesFilter =
//         filterState === "All" || school.state === filterState;

//       return matchesSearch && matchesFilter;
//     })
//     .sort((a, b) =>
//       sortOrder === "latest"
//         ? new Date(b.createdAt) - new Date(a.createdAt)
//         : new Date(a.createdAt) - new Date(b.createdAt)
//     );

//   // Pagination
//   const indexOfLast = currentPage * schoolsPerPage;
//   const indexOfFirst = indexOfLast - schoolsPerPage;
//   const currentSchools = filteredSchools.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);

//   return (
//     <div className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen transition-colors duration-300">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <h1 className="text-3xl font-bold">🏫 Owner Dashboard</h1>
//         <button
//           className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition"
//           onClick={() => setShowFormModal(true)}
//         >
//           <PlusIcon className="w-5 h-5" />
//           Add School
//         </button>
//       </div>

//       {/* Search & Filter */}
//       <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
//         <SearchFilter
//           searchTerm={searchTerm}
//           onSearch={(value) => {
//             setSearchTerm(value);
//             setCurrentPage(1);
//           }}
//           filterState={filterState}
//           onFilter={(value) => {
//             setFilterState(value);
//             setCurrentPage(1);
//           }}
//           states={[...new Set(schools.map((s) => s.state))]}
//           sortOrder={sortOrder}
//           onSortOrder={(value) => {
//             setSortOrder(value);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       {/* Schools Table */}
//       <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 uppercase text-xs">
//             <tr>
//               <th className="px-4 py-3 text-left">School Name</th>
//               <th className="px-4 py-3 text-left">Code</th>
//               <th className="px-4 py-3 text-left">City</th>
//               <th className="px-4 py-3 text-left">State</th>
//               <th className="px-4 py-3 text-left">Email</th>
//               <th className="px-4 py-3 text-left">Principal</th>
//               <th className="px-4 py-3 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentSchools.length > 0 ? (
//               currentSchools.map((school) => (
//                 <tr
//                   key={school._id}
//                   className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <td className="px-4 py-4">{school.schoolName}</td>
//                   <td className="px-4 py-4">{school.schoolCode}</td>
//                   <td className="px-4 py-4">{school.city}</td>
//                   <td className="px-4 py-4">{school.state}</td>
//                   <td className="px-4 py-4">{school.email}</td>
//                   <td className="px-4 py-4">
//                     <div>{school.principal?.fullName || "-"}</div>
//                     <div className="text-xs text-gray-500 dark:text-gray-400">
//                       {school.principal?.email || "-"}
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 text-center">
//                     <div className="flex justify-center gap-3">
//                       <button
//                         title="View"
//                         onClick={() => handleView(school._id)}
//                         className="text-green-500 hover:text-green-600"
//                       >
//                         <EyeIcon className="w-5 h-5" />
//                       </button>
//                       <button
//                         title="Edit"
//                         onClick={() => handleEdit(school)}
//                         className="text-yellow-500 hover:text-yellow-600"
//                       >
//                         <PencilSquareIcon className="w-5 h-5" />
//                       </button>
//                       <button
//                         title="Delete"
//                         onClick={() => handleDelete(school._id)}
//                         className="text-red-600 hover:text-red-700"
//                       >
//                         <TrashIcon className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-6 text-gray-500">
//                   No schools found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="mt-6">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       )}

//       {/* View Modal */}
//       {showView && selectedSchool && (
//         <ViewSchool school={selectedSchool} onClose={() => setShowView(false)} />
//       )}

//       {/* Edit Modal */}
//       {showEdit && selectedSchool && (
//         <EditSchool
//           school={selectedSchool}
//           onClose={() => setShowEdit(false)}
//           onUpdate={(updatedSchool) => {
//             setSchools((prev) =>
//               prev.map((s) => (s._id === updatedSchool._id ? updatedSchool : s))
//             );
//             setShowEdit(false);
//           }}
//         />
//       )}

//       {/* Add School Modal with Blur */}
//       {showFormModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
//           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-xl w-full relative">
//             <button
//               onClick={() => setShowFormModal(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//             >
//               <XMarkIcon className="w-6 h-6" />
//             </button>
//             <AddSchoolForm />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




/////////////////////////////////


"use client";

import { useState, useEffect } from "react";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import AddSchoolForm from "./AddSchoolForm";
import ViewSchool from "./ViewSchool";
import EditSchool from "./EditSchool";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";

export default function OwnerDashboard() {
  const [showFormModal, setShowFormModal] = useState(false);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerPage = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/school/all-schools");
      const data = await res.json();
      setSchools(data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/school/${id}`);
      const school = await res.json();
      setSelectedSchool(school);
      setShowView(true);
    } catch (error) {
      console.error("Error fetching school details", error);
    }
  };

  const handleEdit = (school) => {
    setSelectedSchool(school);
    setShowEdit(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this school?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/school/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
      fetchSchools();
    } catch (error) {
      console.error("Error deleting school:", error);
    }
  };

  // const filteredSchools = schools
  //   .filter((school) => {
  //     const matchesSearch =
  //       school.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       school.schoolCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       school.city?.toLowerCase().includes(searchTerm.toLowerCase());

  //     const matchesFilter =
  //       filterState === "All" || school.state === filterState;

  //     return matchesSearch && matchesFilter;
  //   })
  //   .sort((a, b) =>
  //     sortOrder === "latest"
  //       ? new Date(b.createdAt) - new Date(a.createdAt)
  //       : new Date(a.createdAt) - new Date(b.createdAt)
  //   );

  const filteredSchools = schools
  .filter((school) => {
    const matchesSearch =
      school.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.schoolCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterState.toLowerCase() === "all" ||
      school.state?.toLowerCase() === filterState.toLowerCase();

    return matchesSearch && matchesFilter;
  })
  .sort((a, b) =>
    sortOrder === "latest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );


  const indexOfLast = currentPage * schoolsPerPage;
  const indexOfFirst = indexOfLast - schoolsPerPage;
  const currentSchools = filteredSchools.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header Section with Stats */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Owner Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Manage your educational institutions
              </p>
            </div>
            <button
              onClick={() => setShowFormModal(true)}
              className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-2">
                <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="font-semibold">Add New School</span>
              </div>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <AcademicCapIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Schools</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{schools.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <BuildingOfficeIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">States Covered</p>
                  <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    {new Set(schools.map((s) => s.state)).size}
                  </p>
                </div>
              </div>
            </div>

           
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 p-6 rounded-2xl">
          <SearchFilter
            searchTerm={searchTerm}
            onSearch={(value) => {
              setSearchTerm(value);
              setCurrentPage(1);
            }}
            filterState={filterState}
            onFilter={(value) => {
              setFilterState(value);
              setCurrentPage(1);
            }}
            states={[...new Set(schools.map((s) => s.state))]}
            sortOrder={sortOrder}
            onSortOrder={(value) => {
              setSortOrder(value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Schools Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider">
                    School Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider">
                    Principal
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {currentSchools.length > 0 ? (
                  currentSchools.map((school, index) => (
                    <tr
                      key={school._id}
                      className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {school.schoolName?.charAt(0) || "S"}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-gray-100">
                              {school.schoolName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Est. School #{index + 1}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          {school.schoolCode}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 dark:text-gray-100 font-medium">{school.city}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{school.state}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 dark:text-gray-100">{school.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {school.principal?.fullName?.charAt(0) || "P"}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              {school.principal?.fullName || "Not Assigned"}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {school.principal?.email || "-"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            title="View Details"
                            onClick={() => handleView(school._id)}
                            className="group/btn p-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            title="Edit School"
                            onClick={() => handleEdit(school)}
                            className="group/btn p-2 rounded-xl bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white transition-all duration-300 hover:scale-110"
                          >
                            <PencilSquareIcon className="w-4 h-4" />
                          </button>
                          <button
                            title="Delete School"
                            onClick={() => handleDelete(school._id)}
                            className="group/btn p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <AcademicCapIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                            No schools found
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            Try adjusting your search or filter criteria
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </div>

      {/* View School */}
      {showView && selectedSchool && (
        <ViewSchool school={selectedSchool} onClose={() => setShowView(false)} />
      )}

      {/* Edit School */}
      {showEdit && selectedSchool && (
        <EditSchool
          school={selectedSchool}
          onClose={() => setShowEdit(false)}
          onUpdate={(updatedSchool) => {
            setSchools((prev) =>
              prev.map((s) => (s._id === updatedSchool._id ? updatedSchool : s))
            );
            setShowEdit(false);
          }}
        />
      )}

      {/* Add School Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowFormModal(false)}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Add New School</h2>
                  <p className="text-indigo-100 mt-1">Create a new educational institution</p>
                </div>
                <button
                  onClick={() => setShowFormModal(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="p-8">
                <AddSchoolForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}