"use client";
import { useEffect, useState } from "react";

export default function PrincipalDashboard() {
  const [principal, setPrincipal] = useState(null);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    tests: 0,
  });

  // 🔹 Fetch principal details
  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/principal/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setPrincipal(data.principal);
        }
      } catch (error) {
        console.error("Error fetching principal:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/school/principalStats", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchPrincipal();
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header with principal info */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        {principal ? (
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              Welcome, {principal.name}
            </h1>
            <p className="text-gray-700">📧 {principal.email}</p>
            <p className="text-gray-700">
              🏫 School: {principal.schoolName} ({principal.schoolCode})
            </p>
            <p className="text-gray-700">📍 City: {principal.city}</p>
          </div>
        ) : (
          <p className="text-gray-500">Loading principal info...</p>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Students</h2>
          <p className="text-3xl font-bold text-indigo-600">{stats.students}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Teachers</h2>
          <p className="text-3xl font-bold text-green-600">{stats.teachers}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">Tests</h2>
          <p className="text-3xl font-bold text-yellow-600">{stats.tests}</p>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Management */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Student Management</h2>
          <ul className="space-y-2">
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
              View All Students
            </li>
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
              Add New Student
            </li>
          </ul>
        </div>

        {/* Teacher Management */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Teacher Management</h2>
          <ul className="space-y-2">
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
              View All Teachers
            </li>
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
              Add New Teacher
            </li>
          </ul>
        </div>

        {/* Test Management */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Test Management</h2>
          <ul className="space-y-2">
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
              Create Test
            </li>
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
              View Scheduled Tests
            </li>
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
              View Results
            </li>
          </ul>
        </div>

        {/* Announcements */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
          <ul className="space-y-2">
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
              Send Notice
            </li>
            <li className="p-3 bg-gray-50 rounded hover:bg-gray-100 cursor-pointer">
              View Notices
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
