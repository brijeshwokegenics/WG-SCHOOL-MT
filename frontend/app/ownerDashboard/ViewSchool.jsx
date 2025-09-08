"use client";
import React from "react";

export default function ViewSchool({ school, onClose }) {
  if (!school) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          School Details
        </h2>

        {/* School Info */}
        <div className="space-y-3">
          <p><strong>School Name:</strong> {school.schoolName}</p>
          <p><strong>School Code:</strong> {school.schoolCode}</p>
          <p><strong>Address:</strong> {school.address}</p>
          <p><strong>City:</strong> {school.city}</p>
          <p><strong>State:</strong> {school.state}</p>
          <p><strong>Pincode:</strong> {school.pincode}</p>
          <p><strong>Phone:</strong> {school.phone}</p>
          <p><strong>Email:</strong> {school.email}</p>
        </div>

        <hr className="my-4" />

        {/* Principal Info */}
        <h3 className="text-xl font-semibold mb-2">Principal Details</h3>
        {school.principal ? (
          <div className="space-y-2">
            <p><strong>Name:</strong> {school.principal.fullName}</p>
            <p><strong>Email:</strong> {school.principal.email}</p>
            <p><strong>Role:</strong> {school.principal.role}</p>
          </div>
        ) : (
          <p className="text-gray-500">No principal linked</p>
        )}
      </div>
    </div>
  );
}
