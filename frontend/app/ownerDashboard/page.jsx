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
  const schoolsPerPage = 5;

  // search & filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("All");

  //sort according to date
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

  const filteredSchools = schools.filter((school) => {
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
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>

    <button
      className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      onClick={() => setShowForm(!showForm)}
    >
      {showForm ? "Close Form" : "Add School"}
    </button>

    {showForm && <AddSchoolForm />}

    {/* Search & Filter component */}
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
      states={[...new Set(schools.map((s) => s.state))]} // pass unique states

      sortOrder={sortOrder}
      onSortOrder={(value) => {
        setSortOrder(value);
        setCurrentPage(1);
      }}
    />

    <h2 className="text-xl font-semibold mt-6">📋 All Schools</h2>

    <table className="w-full mt-4 border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">School Name</th>
          <th className="border px-4 py-2">Code</th>
          <th className="border px-4 py-2">City</th>
          <th className="border px-4 py-2">State</th>
          <th className="border px-4 py-2">Email</th>
          <th className="border px-4 py-2">Principal</th>
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {currentSchools.length > 0 ? (
          currentSchools.map((school) => (
            <tr key={school._id}>
              <td className="border px-4 py-2">{school.schoolName}</td>
              <td className="border px-4 py-2">{school.schoolCode}</td>
              <td className="border px-4 py-2">{school.city}</td>
              <td className="border px-4 py-2">{school.state}</td>
              <td className="border px-4 py-2">{school.email}</td>
              <td className="border px-4 py-2">
                {school.principal?.fullName || "-"} <br />
                {school.principal?.email || "-"}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleView(school._id)}
                >
                  View
                </button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(school)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(school._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="border px-4 py-2 text-center" colSpan="7">
              No schools found.
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {/* Pagination */}
    {totalPages > 1 && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    )}

    {/* Popups */}
    {showView && selectedSchool && (
      <ViewSchool
        school={selectedSchool}
        onClose={() => setShowView(false)}
      />
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
