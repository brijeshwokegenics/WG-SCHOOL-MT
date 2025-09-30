"use client";

import { useState } from "react";

export default function AddAnnouncementForm({ onAdded = () => {} }) {
  const [form, setForm] = useState({
    audience: "all", // all | teachers | students
    title: "",
    body: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.title.trim()) return "Title is required.";
    if (!form.body.trim()) return "Body is required.";
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
      const res = await fetch("http://localhost:4000/api/announcement/add-announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ important for sending token in cookie
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add announcement.");
        return;
      }

      setSuccessMsg(data.message || "Announcement added successfully.");
      onAdded(data.announcement || data);

      // reset form
      setForm({ audience: "all", title: "", body: "" });
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-xl p-6 sm:p-8 overflow-hidden">
      <h3 className="text-lg sm:text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
        Add Announcement
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Audience */}
        <div>
          <label htmlFor="audience" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
            Audience
          </label>
          <select
            id="audience"
            name="audience"
            value={form.audience}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="teacher">Teachers</option>
            <option value="student">Students</option>
          </select>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            placeholder="Announcement title"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Body */}
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
            Body <span className="text-red-500">*</span>
          </label>
          <textarea
            id="body"
            name="body"
            value={form.body}
            onChange={handleChange}
            rows={6}
            placeholder="Write your announcement here..."
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            required
          />
        </div>

        {/* Messages */}
        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600 rounded text-sm">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600 rounded text-sm">
            {successMsg}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
            } transition w-full sm:w-auto justify-center`}
          >
            {loading ? "Posting..." : "Post Announcement"}
          </button>

          <button
            type="button"
            onClick={() => setForm({ audience: "all", title: "", body: "" })}
            className="w-full sm:w-auto px-5 py-2 rounded-lg border border-blue-700 text-blue-700 dark:text-blue-300 dark:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
