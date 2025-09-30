"use client";

import { useEffect, useState } from "react";

export default function ViewAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Format date nicely
  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/showAnnouncement/showAnnouncementToUser",
          { credentials: "include" }
        );
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setAnnouncements(data.announcements || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Loading announcements...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        No announcements yet.
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400 mb-6">
        Principal's Announcements
      </h1>
      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a._id}
            className="bg-white dark:bg-gray-800 p-5 rounded shadow-md flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg"
          >
            <div className="mb-3 md:mb-0 w-full md:w-auto">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                {a.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mt-1">{a.body}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Announced on: {formatDate(a.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
