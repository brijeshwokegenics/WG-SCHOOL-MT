"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaBarcode,
  FaBirthdayCake,
  FaPhone,
  FaSchool,
  FaLayerGroup,
} from "react-icons/fa";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/student/me", {
          withCredentials: true,
        });
        console.log("Fetched student:", res.data);
        setStudent(res.data.student);
      } catch (error) {
        console.error(
          "Error fetching student:",
          error.response?.data || error.message
        );
      }
    };

    fetchStudent();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-50 to-white dark:from-gray-900 dark:to-gray-800 text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm py-6 px-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 flex items-center justify-center text-xl font-bold shadow-inner mb-2">
          {student?.fullName?.charAt(0).toUpperCase() || "S"}
        </div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Student Profile
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          School Management System
        </p>
      </div>

      {/* Content */}
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {student ? (
            <>
              <InfoCard
                icon={<FaUser className="text-blue-500 text-base" />}
                label="Full Name"
                value={student.fullName}
              />
              <InfoCard
                icon={<FaBarcode className="text-indigo-500 text-base" />}
                label="Roll Number"
                value={student.rollNumber}
              />
              <InfoCard
                icon={<FaBirthdayCake className="text-pink-500 text-base" />}
                label="Date of Birth"
                value={new Date(student.dob).toLocaleDateString()}
              />
              <InfoCard
                icon={<FaPhone className="text-green-500 text-base" />}
                label="Phone"
                value={student.phone}
              />
              <InfoCard
                icon={<FaLayerGroup className="text-yellow-500 text-base" />}
                label="Class/Grade"
                value={student.gradeOrClass}
              />
              <InfoCard
                icon={<FaSchool className="text-red-500 text-base" />}
                label="School ID"
                value={student.school}
              />
            </>
          ) : (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
              Loading student details...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable InfoCard Component
function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-md p-4 gap-3 hover:shadow-md transition">
      <div className="pt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}
