"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaSchool,
  FaCity,
  FaMapMarkerAlt,
  FaBarcode,
} from "react-icons/fa";

export default function PrincipalDashboard() {
  const [principal, setPrincipal] = useState(null);

  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/principal/me", {
          withCredentials: true,
        });
        console.log("Fetched principal:", res.data);
        setPrincipal(res.data.principal);
      } catch (error) {
        console.error(
          "Error fetching principal:",
          error.response?.data || error.message
        );
      }
    };

    fetchPrincipal();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white text-sm">
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm py-6 px-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold shadow-inner mb-2">
          {principal?.name?.charAt(0).toUpperCase() || "P"}
        </div>
        <h1 className="text-xl font-semibold text-gray-800">Principal Profile</h1>
        <p className="text-xs text-gray-500 mt-0.5">School Management System</p>
      </div>

      {/* Content */}
      <div className="w-full px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {principal ? (
            <>
              <InfoCard
                icon={<FaEnvelope className="text-blue-500 text-base" />}
                label="Email"
                value={principal.email}
              />
              <InfoCard
                icon={<FaSchool className="text-green-500 text-base" />}
                label="School Name"
                value={principal.schoolName}
              />
              <InfoCard
                icon={<FaBarcode className="text-indigo-500 text-base" />}
                label="School Code"
                value={principal.schoolCode}
              />
              <InfoCard
                icon={<FaCity className="text-pink-500 text-base" />}
                label="City"
                value={principal.city}
              />
              <InfoCard
                icon={<FaMapMarkerAlt className="text-red-500 text-base" />}
                label="State"
                value={principal.state}
              />
              <InfoCard
                icon={<div className="text-yellow-500 text-base">👤</div>}
                label="Name"
                value={principal.name}
              />
            </>
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Loading principal details...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Reusable Card
function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start bg-white shadow-sm border border-gray-200 rounded-md p-4 gap-3 hover:shadow-md transition">
      <div className="pt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900 truncate">{value}</p>
      </div>
    </div>
  );
}
