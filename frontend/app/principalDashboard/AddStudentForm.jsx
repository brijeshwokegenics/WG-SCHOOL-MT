'use client';

import { useState } from 'react';

export default function AddStudentForm({ onAdded = () => {} }) {
  const [form, setForm] = useState({
    fullName: '',
    rollNumber: '',
    phone: '',
    dob: '',
    gradeOrClass: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'Full name is required.';
    if (!form.rollNumber.trim()) return 'Roll number is required.';
    if (!form.dob.trim()) return 'Date of birth is required.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/student/add-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to add student. Please try again.');
        setLoading(false);
        return;
      }

      setSuccessMsg('Student added successfully.');
      onAdded(data.student || data);

      setForm({
        fullName: '',
        rollNumber: '',
        phone: '',
        dob: '',
        gradeOrClass: '',
      });
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900  rounded-2xl p-6 transition-colors duration-300 text-black dark:text-white">
      {/* <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">Add New Student</h3> */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Enter student details below. Fields marked * are required.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full name *
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            type="text"
            placeholder="e.g. Abhishek Gupta"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Credentials Section */}
        <fieldset className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
          <legend className="text-lg font-semibold text-gray-700 dark:text-gray-200 px-2">
            Student Login Credentials
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div>
              <label htmlFor="rollNumber" className="block text-sm font-medium mb-1">
                Roll Number *
              </label>
              <input
                id="rollNumber"
                name="rollNumber"
                value={form.rollNumber}
                onChange={handleChange}
                type="text"
                placeholder="e.g. 23 or 9A-15"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium mb-1">
                Date of Birth *
              </label>
              <input
                id="dob"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                type="date"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Phone + Grade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="+91 9XXXXXXXXX"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="gradeOrClass" className="block text-sm font-medium mb-1">
              Class / Grade
            </label>
            <input
              id="gradeOrClass"
              name="gradeOrClass"
              value={form.gradeOrClass}
              onChange={handleChange}
              type="text"
              placeholder="e.g. 9A or Grade 10"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Status */}
        {error && (
          <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 rounded">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700 rounded">
            {successMsg}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white transition ${
              loading
                ? 'bg-indigo-300'
                : 'bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-500'
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
              'Create Student'
            )}
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({
                fullName: '',
                rollNumber: '',
                phone: '',
                dob: '',
                gradeOrClass: '',
              })
            }
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
