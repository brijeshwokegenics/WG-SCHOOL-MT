"use client";

import { useState } from "react";

export default function AddTeacherForm({ onAdded = () => {} }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    classLevel: "",
    subject: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name is required.";
    if (!form.email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email.";
    if (!form.password || form.password.length < 6)
      return "Password must be at least 6 characters.";
    if (!form.classLevel) return "Please select a class level.";
    if (!form.subject.trim()) return "Subject is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);
    setError("");
    setSuccessMsg("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/teachers/add-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Add teacher response:", data);
      if (!res.ok) {
        setError(data.message || "Failed to add teacher. Please try again.");
        setLoading(false);
        return;
      }

      setSuccessMsg("Teacher added successfully.");
      onAdded(data.teacher || data);
      setForm({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        classLevel: "",
        subject: "",
      });
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 max-h-screen">
      <p className="text-sm text-gray-700 mb-8">
        Create teacher account and assign class level and subject. All fields marked * are required.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-900 mb-2">
            Full name *
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Abhishek Gupta"
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Login Credentials */}
        <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
          <h4 className="text-lg font-semibold text-black mb-4">Teacher Login Credentials</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email *
              </label>
              <input
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="teacher@example.com"
                className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                Password *
              </label>
              <input
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="At least 6 characters"
                className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            placeholder="+91 9XXXXXXXXX"
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Class Level Dropdown */}
        <div>
          <label htmlFor="classLevel" className="block text-sm font-medium text-gray-900 mb-2">
            Class Level *
          </label>
          <select
            id="classLevel"
            name="classLevel"
            value={form.classLevel}
            onChange={handleChange}
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">-- Select Class Level --</option>
            <option value="Primary(1-5)">Primary (class 1 to 5)</option>
            <option value="Middle(6-8)">Middle (class 6 to 8)</option>
            <option value="Secondary(9-10)">Secondary School (class 9 to 10)</option>
            <option value="Senior(11-12)">Senior Secondary School (class 11 & 12)</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
            Subject *
          </label>
          <input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Mathematics"
            className="w-full border border-blue-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Status messages */}
        {error && <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded">{error}</div>}
        {successMsg && (
          <div className="p-3 bg-green-100 text-green-700 border border-green-300 rounded">{successMsg}</div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white ${
              loading ? "bg-blue-300" : "bg-blue-700 hover:bg-blue-800"
            } transition`}
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating...
              </>
            ) : (
              "Create Teacher"
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({
                fullName: "",
                email: "",
                password: "",
                phone: "",
                classLevel: "",
                subject: "",
              })
            }
            className="px-5 py-3 rounded-lg border border-blue-700 text-blue-700 hover:bg-blue-100 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
