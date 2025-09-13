"use client";

import { useState } from "react";

/**
 * AddStudentForm
 *
 * Props:
 *  - schoolOptions: [{ _id, schoolName, schoolCode }] (optional) -> to assign student to a school
 *  - onAdded: function(student) called when student successfully created
 *
 * Backend: POST http://localhost:4000/api/students   (adjust as needed)
 */
export default function AddStudentForm({ schoolOptions = [], onAdded = () => {} }) {
  const [form, setForm] = useState({
    fullName: "",
    rollNumber: "",
    email: "",
    phone: "",
    dob: "",
    gradeOrClass: "",
    address: "",
    schoolId: schoolOptions?.[0]?._id || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required.";
    if (!form.rollNumber.trim()) return "Roll number is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email.";
    if (!form.dob.trim()) return "Date of birth is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // if cookie auth is used
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add student. Please try again.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Student added successfully.");
      onAdded(data.student || data);

      // Reset form but keep school selection
      setForm({
        fullName: "",
        rollNumber: "",
        email: "",
        phone: "",
        dob: "",
        gradeOrClass: "",
        address: "",
        schoolId: form.schoolId,
      });
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-1">Add New Student</h3>
      <p className="text-sm text-gray-500 mb-6">
        Enter student details below. Fields marked * are required.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full name *
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Ananya Singh"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Student Login Credentials Heading */}
        <fieldset className="border border-gray-300 rounded-lg p-4">
          <legend className="text-lg font-semibold text-gray-700 px-2">
            Student Login Credentials
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Roll Number *
              </label>
              <input
                id="rollNumber"
                name="rollNumber"
                value={form.rollNumber}
                onChange={handleChange}
                type="text"
                placeholder="e.g. 23 or 9A-15"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth *
              </label>
              <input
                id="dob"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="student@example.com"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="+91 9XXXXXXXXX"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {/* Class / Grade */}
        <div>
          <label htmlFor="gradeOrClass" className="block text-sm font-medium text-gray-700 mb-1">
            Class / Grade (optional)
          </label>
          <input
            id="gradeOrClass"
            name="gradeOrClass"
            value={form.gradeOrClass}
            onChange={handleChange}
            type="text"
            placeholder="e.g. 9A or Grade 10"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            placeholder="e.g. 123 Street Name, City, State"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        {/* School Select */}
        <div>
          <label htmlFor="schoolId" className="block text-sm font-medium text-gray-700 mb-1">
            Assign to School
          </label>
          <select
            id="schoolId"
            name="schoolId"
            value={form.schoolId}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">— Select school —</option>
            {schoolOptions.map((s) => (
              <option key={s._id} value={s._id}>
                {s.schoolName} {s.schoolCode ? `(${s.schoolCode})` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* status messages */}
        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-100 rounded">{error}</div>
        )}
        {successMsg && (
          <div className="p-3 bg-green-50 text-green-700 border border-green-100 rounded">{successMsg}</div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
              loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating...
              </>
            ) : (
              "Create Student"
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({
                fullName: "",
                rollNumber: "",
                email: "",
                phone: "",
                dob: "",
                gradeOrClass: "",
                address: "",
                schoolId: schoolOptions?.[0]?._id || "",
              })
            }
            className="px-3 py-2 rounded-lg border bg-white text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
