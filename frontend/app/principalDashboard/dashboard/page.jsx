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
import Spinner from "@/components/Spinner";

export default function PrincipalDashboard() {
  const [principal, setPrincipal] = useState(null);
  const [uploading, setUploading] = useState(false);


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



  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("logo", file);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/principal/upload-logo",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update state with new logo path
      setPrincipal((prev) => ({ ...prev, schoolLogo: res.data.logoPath }));
    } catch (error) {
      console.error("Error uploading logo:", error.response?.data || error.message);
    }
  };




  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300">


      {/* Header */}
      {/* <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm py-6 px-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xl font-bold shadow-inner mb-2">
          {principal?.name?.charAt(0).toUpperCase() || "P"}
        </div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Principal Profile
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          School Management System
        </p>
      </div> */}


      {/* Header */}
      <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm py-6 px-4 flex flex-col items-center relative">
        <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xl font-bold shadow-inner mb-2 overflow-hidden relative group">
          {principal?.schoolLogo ? (
            <img
              src={`http://localhost:4000/uploads/upload-logo${principal.schoolLogo}`} // backend should serve uploads
              alt="School Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{principal?.name?.charAt(0).toUpperCase() || "P"}</span>
          )}

          {/* Upload Button (visible on hovering)) */}
          {!uploading && (
            <label
              htmlFor="logoUpload"
              className="absolute inset-0 flex items-center justify-center 
             bg-black bg-opacity-60 text-white text-xs font-medium 
             opacity-0 group-hover:opacity-100 cursor-pointer transition rounded-full"
            >
              Upload
            </label>)}


          <input
            id="logoUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </div>

        {/* Loading Spinner Overlay */}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full">
            <Spinner size="w-6 h-6" color="border-white" />
          </div>
        )}

        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          Principal Profile
        </h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          School Management System
        </p>
      </div>



      {/* Content */}
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
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
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
              Loading principal details...
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
