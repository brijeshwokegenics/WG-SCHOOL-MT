'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Result() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const token = localStorage.getItem('teacherToken');
//         const res = await axios.get('http://localhost:4000/api/teacher/results', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setResults(res.data);
//       } catch (err) {
//         console.error('Error fetching results:', err);
//         setError('Failed to fetch results');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResults();
//   }, []);

  const filteredResults = results.filter((r) =>
    r.studentName.toLowerCase().includes(search.toLowerCase()) ||
    r.testName.toLowerCase().includes(search.toLowerCase())
  );

//   if (loading) return <p className="text-center mt-10 ">Loading results...</p>;
//   if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Student Test Results
      </h1>


      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="w-full table-auto text-left bg-gray-100 dark:bg-gray-800">
          <thead className="bg-gray-200 dark:bg-gray-700 text-blue-700 dark:text-blue-300">
            <tr>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">Test Name</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Total Marks</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.length > 0 ? (
              filteredResults.map((r, i) => (
                <tr
                  key={i}
                  className={`border-b hover:bg-blue-50 dark:hover:bg-gray-700 ${
                    i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  <td className="px-4 py-3">{r.studentName}</td>
                  <td className="px-4 py-3">{r.classLevel}</td>
                  <td className="px-4 py-3">{r.section}</td>
                  <td className="px-4 py-3">{r.testName}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    {r.score}
                  </td>
                  <td className="px-4 py-3">{r.totalMarks}</td>
                  <td className="px-4 py-3">
                    {new Date(r.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
