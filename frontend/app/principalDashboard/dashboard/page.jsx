"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaSchool,
  FaCity,
  FaMapMarkerAlt,
  FaBarcode,
  FaEdit,
} from "react-icons/fa";
import Spinner from "@/components/Spinner";

export default function PrincipalDashboard() {
  const [principal, setPrincipal] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  // Fetch current principal data
  useEffect(() => {
    const fetchPrincipal = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/principal/me", {
          withCredentials: true,
        });
        setPrincipal(res.data.principal);

        setFormData(res.data.principal); // Prefill form when editing
      } catch (error) {
        console.error("Error fetching principal:", error);
      }
    };
    fetchPrincipal();
  }, []);

  
 // console.log('printing prin data....', principal);

  // Upload School Logo
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("logo", file);

try {
  const res = await axios.post(
    "http://localhost:4000/api/upload-logo/upload-logo",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );

  setPrincipal((prev) => ({ ...prev, schoolLogo: res.data.imageUrl }));
  setFormData((prev) => ({ ...prev, schoolLogo: res.data.imageUrl }));
} catch (error) {
  console.error("Error uploading logo:", error.response?.data || error.message);
}

    finally {
      setUploading(false);
    }
  };

  /////
  console.log("p data...",principal);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Save edited details
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.put(
        "http://localhost:4000/api/principal/edit",
        formData,
        { withCredentials: true }
      );
      setPrincipal(res.data.principal);
      setEditing(false);
    } catch (error) {
      console.error("Error updating principal:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-sm text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Header */}
      <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm py-6 px-4 flex flex-col items-center relative">
        {/* Profile Picture or Logo */}
        <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xl font-bold shadow-inner mb-2 overflow-hidden relative group">
          {principal?.schoolLogo ? (
            <img
              src={principal.schoolLogo}
              alt="School Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{principal?.name?.charAt(0).toUpperCase() || "k"}</span>
          )}

          {/* Upload Button on hover */}
          {!uploading && (
            <label
              htmlFor="logoUpload"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white text-xs font-medium opacity-0 group-hover:opacity-100 cursor-pointer transition rounded-full"
            >
              Upload
            </label>
          )}

          <input
            id="logoUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />

          {/* Spinner overlay */}
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full">
              <Spinner size="w-6 h-6" color="border-white" />
            </div>
          )}
        </div>

        <h1 className="text-xl font-semibold">Principal Profile</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          School Management System
        </p>

        {/* Edit Button */}
        <button
          onClick={() => setEditing(true)}
          className="absolute top-6 right-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
        >
          <FaEdit />
          Edit
        </button>
      </div>

      {/* Content */}
      <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
        {!editing ? (
          // View Mode
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principal ? (
              <>
                <InfoCard icon={<FaEnvelope />} label="Email" value={principal.email} />
                <InfoCard icon={<FaSchool />} label="School Name" value={principal.schoolName} />
                <InfoCard icon={<FaBarcode />} label="School Code" value={principal.schoolCode} />
                <InfoCard icon={<FaCity />} label="City" value={principal.city} />
                <InfoCard icon={<FaMapMarkerAlt />} label="State" value={principal.state} />
                <InfoCard icon={<div>👤</div>} label="Name" value={principal.name} />
              </>
            ) : (
              <div className="col-span-full text-center text-gray-500">
                Loading principal details...
              </div>
            )}
          </div>
        ) : (
          // Edit Mode
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-md shadow-sm space-y-4 border dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
            <FormInput label="Name" name="name" value={formData.name} onChange={handleInputChange} />
            <FormInput label="Email" name="email" value={formData.email} onChange={handleInputChange} />
            <FormInput label="School Name" name="schoolName" value={formData.schoolName} onChange={handleInputChange} />
            <FormInput label="School Code" name="schoolCode" value={formData.schoolCode} onChange={handleInputChange} />
            <FormInput label="City" name="city" value={formData.city} onChange={handleInputChange} />
            <FormInput label="State" name="state" value={formData.state} onChange={handleInputChange} />

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Info card component
function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-md p-4 gap-3 hover:shadow-md transition">
      <div className="pt-0.5 text-base text-blue-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

// Input component
function FormInput({ label, name, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
