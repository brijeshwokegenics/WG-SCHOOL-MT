'use client';
import React, { useState } from 'react';

export default function ManageStudentsPage() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', grade: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({ name: '', email: '', grade: '' });
    setIsEditing(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', grade: '' });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.grade) {
      alert('Please fill all fields');
      return;
    }

    if (isEditing) {
      const updated = [...students];
      updated[editIndex] = formData;
      setStudents(updated);
    } else {
      setStudents([...students, formData]);
    }

    handleCloseModal();
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setIsEditing(true);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  return (
    <div className="p-8 text-black bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Manage Students</h1>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
        >
          + Add Student
        </button>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left bg-gray-100 rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-blue-700">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Grade</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No students added yet.
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-300 hover:bg-gray-100"
                >
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.grade}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative text-black">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900 text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              {isEditing ? 'Edit Student' : 'Add Student'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Student name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="student@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Grade / Class *</label>
                <input
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 9A or Grade 10"
                  required
                />
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
                  {isEditing ? 'Update' : 'Add'} Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
