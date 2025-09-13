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

//   ////// CRUD //////

//   const handleView = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:4000/api/school/${id}`);
//       const school = await res.json();
//       console.log(school); //printing fetched school details
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

//   ////// Search + Filter logic //////

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
//         return new Date(b.createdAt) - new Date(a.createdAt); // latest first
//       } else {
//         return new Date(a.createdAt) - new Date(b.createdAt); // oldest first
//       }
//     });

//   ////// Pagination logic //////

//   const indexOfLast = currentPage * schoolsPerPage;
//   const indexOfFirst = indexOfLast - schoolsPerPage;
//   const currentSchools = filteredSchools.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);

//   ////// UI //////

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">🏫 Owner Dashboard</h1>
//         <button
//           className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Close Form" : "+ Add School"}
//         </button>
//       </div>

//       {/* Add School Form */}
//       {showForm && (
//         <div className="mb-6 bg-white p-6 rounded-xl shadow-md">
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
//           states={[...new Set(schools.map((s) => s.state))]} // unique states
//           sortOrder={sortOrder}
//           onSortOrder={(value) => {
//             setSortOrder(value);
//             setCurrentPage(1);
//           }}
//         />
//       </div>

//       {/* Schools Table */}
//       <div className="bg-white rounded-xl shadow-md overflow-x-auto">
//         <table className="w-full text-sm text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
//               <th className="px-4 py-3 border">School Name</th>
//               <th className="px-4 py-3 border">Code</th>
//               <th className="px-4 py-3 border">City</th>
//               <th className="px-4 py-3 border">State</th>
//               <th className="px-4 py-3 border">Email</th>
//               <th className="px-4 py-3 border">Principal</th>
//               <th className="px-4 py-3 border text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {currentSchools.length > 0 ? (
//               currentSchools.map((school) => (
//                 <tr
//                   key={school._id}
//                   className="hover:bg-gray-50 transition border-b"
//                 >
//                   <td className="px-4 py-3">{school.schoolName}</td>
//                   <td className="px-4 py-3">{school.schoolCode}</td>
//                   <td className="px-4 py-3">{school.city}</td>
//                   <td className="px-4 py-3">{school.state}</td>
//                   <td className="px-4 py-3">{school.email}</td>
//                   <td className="px-4 py-3">
//                     {school.principal?.fullName || "-"} <br />
//                     <span className="text-sm text-gray-500">
//                       {school.principal?.email || "-"}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 text-center space-x-2">
//                     <button
//                       className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
//                       onClick={() => handleView(school._id)}
//                     >
//                       View
//                     </button>
//                     <button
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
//                       onClick={() => handleEdit(school)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
//                       onClick={() => handleDelete(school._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   className="px-4 py-6 text-center text-gray-500"
//                   colSpan="7"
//                 >
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

//       {/* Popups */}
//       {showView && selectedSchool && (
//         <ViewSchool
//           school={selectedSchool}
//           onClose={() => setShowView(false)}
//         />
//       )}

//       {showEdit && selectedSchool && (
//         <EditSchool
//           school={selectedSchool}
//           onClose={() => setShowEdit(false)}
//           onUpdate={(updatedSchool) => {
//             setSchools((prev) =>
//               prev.map((s) => (s._id === updatedSchool._id ? updatedSchool : s))
//             );
//           }}
//         />
//       )}
//     </div>
//   );
// }
////////////////////////////


"use client";

import { useState, useEffect } from "react";
import AddSchoolForm from "./AddSchoolForm";
import ViewSchool from "./ViewSchool";
import EditSchool from "./EditSchool";
import Pagination from "@/components/Pagination";
import SearchFilter from "@/components/SearchFilter";

export default function OwnerDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerPage = 10;

  // search & filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("All");

  // sort
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

  ////// CRUD //////

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
      fetchSchools(); // refresh
    } catch (error) {
      console.error("Error deleting school:", error);
    }
  };

  ////// Search + Filter logic //////

  const filteredSchools = schools
    .filter((school) => {
      const matchesSearch =
        school.schoolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.schoolCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterState === "All" || school.state === filterState;

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt); // latest first
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt); // oldest first
      }
    });

  ////// Pagination logic //////

  const indexOfLast = currentPage * schoolsPerPage;
  const indexOfFirst = indexOfLast - schoolsPerPage;
  const currentSchools = filteredSchools.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSchools.length / schoolsPerPage);

  ////// UI //////

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🏫 Owner Dashboard</h1>
        <button
          className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add School"}
        </button>
      </div>

      {/* Add School Form */}
      {showForm && (
        <div className="mb-6 bg-white p-6 rounded-xl shadow-md">
          <AddSchoolForm />
        </div>
      )}

      {/* Search & Filter */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-md">
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
          states={[...new Set(schools.map((s) => s.state))]} // unique states
          sortOrder={sortOrder}
          onSortOrder={(value) => {
            setSortOrder(value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Schools Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 text-xs text-gray-600 uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left border-b">School Name</th>
              <th className="px-5 py-3 text-left border-b">Code</th>
              <th className="px-5 py-3 text-left border-b">City</th>
              <th className="px-5 py-3 text-left border-b">State</th>
              <th className="px-5 py-3 text-left border-b">Email</th>
              <th className="px-5 py-3 text-left border-b">Principal</th>
              <th className="px-5 py-3 text-center border-b">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentSchools.length > 0 ? (
              currentSchools.map((school) => (
                <tr
                  key={school._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-5 py-4 whitespace-nowrap border-b">
                    {school.schoolName}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap border-b">
                    {school.schoolCode}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap border-b">
                    {school.city}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap border-b">
                    {school.state}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap border-b">
                    {school.email}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap border-b">
                    <div>{school.principal?.fullName || "-"}</div>
                    <div className="text-xs text-gray-500">
                      {school.principal?.email || "-"}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center border-b space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleView(school._id)}
                      className="text-xs bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(school)}
                      className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(school._id)}
                      className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No schools found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Popups */}
      {showView && selectedSchool && (
        <ViewSchool school={selectedSchool} onClose={() => setShowView(false)} />
      )}

      {showEdit && selectedSchool && (
        <EditSchool
          school={selectedSchool}
          onClose={() => setShowEdit(false)}
          onUpdate={(updatedSchool) => {
            setSchools((prev) =>
              prev.map((s) => (s._id === updatedSchool._id ? updatedSchool : s))
            );
          }}
        />
      )}
    </div>
  );
}
