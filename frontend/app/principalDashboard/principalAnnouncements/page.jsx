'use client';
import React, { useState } from 'react';

export default function PrincipalAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', message: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleOpenModal = () => {
    setFormData({ title: '', message: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ title: '', message: '' });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      alert('Please fill in both fields.');
      return;
    }

    const newEntry = { ...formData, date: new Date().toISOString() };

    if (isEditing) {
      const updated = [...announcements];
      updated[editIndex] = newEntry;
      setAnnouncements(updated);
    } else {
      setAnnouncements([newEntry, ...announcements]); // newest on top
    }

    handleCloseModal();
  };

  const handleEdit = (index) => {
    const announcement = announcements[index];
    setFormData({ title: announcement.title, message: announcement.message });
    setIsEditing(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = announcements.filter((_, i) => i !== index);
    setAnnouncements(updated);
  };

  return (
    <div className="p-8 bg-white min-h-screen text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Principal's Announcements</h1>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Announcement
        </button>
      </div>

      {announcements.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No announcements yet.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <div
              key={index}
              className="bg-gray-100 p-5 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="mb-3 md:mb-0">
                <h3 className="text-lg font-semibold text-blue-700">{announcement.title}</h3>
                <p className="text-gray-700">{announcement.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Announced on: {formatDate(announcement.date)}
                </p>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-xl text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              {isEditing ? 'Edit Announcement' : 'New Announcement'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Write your announcement"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-blue-700 text-blue-700 rounded hover:bg-blue-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
                >
                  {isEditing ? 'Update' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
