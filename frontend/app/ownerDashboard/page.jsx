"use client";
import { useState, useEffect } from "react";
import AddSchoolForm from "./AddSchoolForm";

export default function OwnerDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [schools, setSchools] = useState([]);

  // fetch schools from backend
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

      <h2 className="text-xl font-semibold mt-6">📋 All Schools</h2>

      <table className="w-full mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">School Name</th>
            <th className="border px-4 py-2">Code</th>
            <th className="border px-4 py-2">City</th>
            <th className="border px-4 py-2">State</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {schools.length > 0 ? (
            schools.map((school) => (
              <tr key={school._id}>
                <td className="border px-4 py-2">{school.schoolName}</td>
                <td className="border px-4 py-2">{school.schoolCode}</td>
                <td className="border px-4 py-2">{school.city}</td>
                <td className="border px-4 py-2">{school.state}</td>
                <td className="border px-4 py-2">{school.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 text-center" colSpan="5">
                No schools added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
