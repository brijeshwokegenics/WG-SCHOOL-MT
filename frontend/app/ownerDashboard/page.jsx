"use client";
import { useState } from "react";
import AddSchoolForm from "./AddSchoolForm";

export default function OwnerDashboard() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Owner Dashboard</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add School"}
      </button>

      {showForm && <AddSchoolForm />}
    </div>
  );
}
