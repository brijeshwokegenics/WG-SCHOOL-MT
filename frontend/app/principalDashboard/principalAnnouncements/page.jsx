'use client';

import React, { useState, useEffect } from 'react';
import AddAnnouncementForm from './AddAnnouncementForm'; // adjust path if needed
import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function PrincipalAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewAnnouncement, setViewAnnouncement] = useState(null); // for viewing details

  const formatDate = (date) =>
    new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/announcement/all-announcement', {
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) setAnnouncements(data.announcements || []);
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAnnouncementAdded = (newAnnouncement) => {
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/announcement/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to delete');
      setAnnouncements((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white transition-colors duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
          Principal&apos;s Announcements
        </h1>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          + Add Announcement
        </button>
      </div>

      {announcements.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
          No announcements yet.
        </p>
      ) : (
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
                <p className="text-gray-700 dark:text-gray-200 line-clamp-2">
                  {announcement.body}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Audience: {announcement.audience}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Announced on: {formatDate(announcement.createdAt)}
                </p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                {/* View Button */}
                <button
                  onClick={() => setViewAnnouncement(announcement)}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                  title="View Announcement"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(announcement._id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                  title="Delete Announcement"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Announcement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              &times;
            </button>

            <AddAnnouncementForm
              onAdded={handleAnnouncementAdded}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}

      {/* View Announcement Modal */}
      {viewAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setViewAnnouncement(null)}
              className="absolute top-2 right-3 text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">
              {viewAnnouncement.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-2">
              {viewAnnouncement.body}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Audience: {viewAnnouncement.audience}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Announced on: {formatDate(viewAnnouncement.createdAt)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
