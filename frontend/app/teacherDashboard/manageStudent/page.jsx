'use client';

import React, { useState, useEffect } from 'react';
import AddStudentForm from '@/app/principalDashboard/AddStudentForm';
// import CsvUpload from '../CsvUpload';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function ManageStudentsPage() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingStudent(null);
    setIsModalOpen(false);
  };

  const handleAddOrUpdate = (student) => {
    if (editingStudent !== null) {
      // Update existing student
      const updated = [...students];
      updated[editingStudent] = student;
      setStudents(updated);
    } else {
      // Add new student
      setStudents([...students, student]);
    }
    handleCloseModal();
  };

  const handleEdit = (index) => {
    setEditingStudent(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/student/all-student', {
        method: 'GET',
        credentials: 'include', // if you need cookies/auth
      });
      const data = await res.json();
      console.log("fetching student on teacher dashboard...", data)

      if (!res.ok) {
        setError(data.message || 'Failed to fetch students');
        setLoading(false);
        return;
      }

      setStudents(data.students || data); // adjust depending on backend response
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Network error while fetching students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">Manage Students</h1>

        <div className="flex gap-3">

          <button
            onClick={handleOpenModal}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white transition"
          >
            + Add Student
          </button>
        </div>
      </div>

      {loading && <p className="mb-4 text-gray-500 dark:text-gray-400">Loading students...</p>}
      {error && <p className="mb-4 text-red-500 dark:text-red-400">{error}</p>}

      <h5 className='text-black dark:text-white'>Students here are filtered on the basis of teacher's class and section</h5>
      {/* Student Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-[800px] w-full table-auto text-left bg-gray-100 dark:bg-gray-800">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-blue-300">
              <th className="p-4">Name</th>
              <th className="p-4">Roll No.</th>
              <th className="p-4">Class</th>
              <th className="p-4">Section</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr
                  key={index}
                  className="overflow-x-auto border-t border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-4">{student.fullName}</td>
                  <td className="p-4">{student.rollNumber || '-'}</td>
                  <td className="p-4">{student.classLevel || '-'}</td>
                  <td className="p-4">{student.section || '-'}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm text-white"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm text-white"
                    >

                      <TrashIcon className="w-5 h-5" />

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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg w-full max-w-xl relative">
            <div className="p-6 overflow-y-auto max-h-[80vh]">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  {editingStudent !== null ? 'Edit Student' : 'Add Student'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-600 dark:text-gray-300 hover:text-white border border-gray-300 dark:border-gray-600 rounded-md text-xl px-3 py-1 hover:bg-red-500 transition-colors"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              {/* Form */}
              <AddStudentForm
                initialData={editingStudent !== null ? students[editingStudent] : null}
                onAdded={handleAddOrUpdate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
