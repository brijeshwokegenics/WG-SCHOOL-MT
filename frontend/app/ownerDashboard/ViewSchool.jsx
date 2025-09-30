"use client";
import React from "react";

export default function ViewSchool({ school, onClose }) {
  if (!school) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex justify-center items-center z-50 p-4">
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-3xl relative mx-auto
                   max-h-[80vh] overflow-y-auto p-8 md:p-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-2xl font-semibold focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
          School Information
        </h2>

        {/* School Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-200">
          <InfoItem label="School Name" value={school.schoolName} />
          <InfoItem label="School Code" value={school.schoolCode} />
          <InfoItem label="Address" value={school.address} />
          <InfoItem label="City" value={school.city} />
          <InfoItem label="State" value={school.state} />
          <InfoItem label="Pincode" value={school.pincode} />
          <InfoItem label="Phone" value={school.phone} />
          <InfoItem label="Email" value={school.email} />
        </div>

        <hr className="my-8 border-gray-300 dark:border-gray-700" />

        {/* Principal Info */}
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Principal Details
        </h3>

        {school.principal ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700 dark:text-gray-200">
            <InfoItem label="Name" value={school.principal.fullName} />
            <InfoItem label="Email" value={school.principal.email} />
            <InfoItem label="Role" value={school.principal.role} />
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            No principal linked
          </p>
        )}
      </div>
    </div>
  );
}

// Reusable info row
function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </p>
      <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
        {value || <span className="text-gray-400 dark:text-gray-600">—</span>}
      </p>
    </div>
  );
}
