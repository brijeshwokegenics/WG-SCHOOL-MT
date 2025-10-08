"use client";

import { useEffect, useState } from "react";

export default function ViewAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
          Principal's Announcements for Teachers
        </h1>
      </div>


      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading announcements...
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-600 dark:text-red-400">{error}</p>
      )}

      {/* No announcements */}
      {!loading && announcements.length === 0 && !error && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No announcements yet.
        </p>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="bg-gray-100 dark:bg-gray-800 p-5 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div className="mb-3 md:mb-0 w-full md:w-auto">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                {announcement.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mt-2">
                {announcement.body}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Announced on: {formatDate(announcement.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
