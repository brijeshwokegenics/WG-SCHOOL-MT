'use client';

import CsvUpload from '@/components/CsvUpload';
import { useState } from 'react';

export default function AddStudentForm({ onAdded = () => {} }) {
  const [form, setForm] = useState({
    fullName: '',
    rollNumber: '',
    dob: '',
    classLevel: '',
    section: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === 'section' ? value.toUpperCase() : value,
    }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return 'Full name is required.';
    if (!form.rollNumber.trim()) return 'Roll number is required.';
    if (!form.dob.trim()) return 'Date of birth is required.';
    if (!form.classLevel) return 'Class level is required.';
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
        dob: '',
        classLevel: '',
        section: '',
      });
    } catch (err) {
      console.error(err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };


 const handleDownloadCSV = () => {
  // CSV headers
  const headers = "fullName,rollNumber,dob,classLevel,section\n";

  // Sample student rows
  const sampleRows = [
    "Rohan Mehta,01,2008-05-14,10,A",
    "Ananya Gupta,02,2009-08-22,9,B",
    "Karan Sharma,03,2010-01-30,8,A",
    "Sneha Verma,04,2007-11-18,11,C",
    "Arjun Patel,05,2011-03-25,7,B",
  ].join("\n");

  const csvContent = headers + sampleRows + "\n";

  // Create a Blob file
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  // Create a hidden download link and trigger download
  const link = document.createElement("a");
  link.href = url;
  link.download = "student-CSVFormat.csv"; // File name
  link.click();

  // Cleanup
  URL.revokeObjectURL(url);
};


  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-6 transition-colors duration-300 text-black dark:text-white">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Enter student details below. Fields marked * are required.
      </p>

            {/* CSV Buttons */}
            <div className="flex items-center justify-start gap-4 mb-6">
              <button
                type="button"
                onClick={handleDownloadCSV}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Download CSV Format
              </button>
      
              <div>
                <CsvUpload uploadURL="uploadStudentCsv"  />
              </div>
            </div>

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

        {/* Class Level + Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="classLevel" className="block text-sm font-medium mb-1">
              Class / Grade *
            </label>
            <select
              id="classLevel"
              name="classLevel"
              value={form.classLevel}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">-- Select Class --</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="section" className="block text-sm font-medium mb-1">
              Section <span className="text-gray-500">(optional)</span>
            </label>
            <input
              id="section"
              name="section"
              value={form.section}
              onChange={handleChange}
              type="text"
              placeholder="e.g. A or B"
              maxLength={2}
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
                dob: '',
                classLevel: '',
                section: '',
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
