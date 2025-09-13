// /////////////
"use client";
import React from "react";

export default function ViewSchool({ school, onClose }) {
  if (!school) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-semibold focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          School Information
        </h2>

        {/* School Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <InfoItem label="School Name" value={school.schoolName} />
          <InfoItem label="School Code" value={school.schoolCode} />
          <InfoItem label="Address" value={school.address} />
          <InfoItem label="City" value={school.city} />
          <InfoItem label="State" value={school.state} />
          <InfoItem label="Pincode" value={school.pincode} />
          <InfoItem label="Phone" value={school.phone} />
          <InfoItem label="Email" value={school.email} />
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Principal Info */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Principal Details
        </h3>

        {school.principal ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <InfoItem label="Name" value={school.principal.fullName} />
            <InfoItem label="Email" value={school.principal.email} />
            <InfoItem label="Role" value={school.principal.role} />
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No principal linked</p>
        )}
      </div>
    </div>
  );
}

// Reusable info row
function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-medium">{value || <span className="text-gray-400">—</span>}</p>
    </div>
  );
}
