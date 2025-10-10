'use client';

import React, { useState, useEffect } from 'react';
import { TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import Pagination from '@/components/Pagination';
import AddTestForm from './addTestForm';
import ViewTestQuestions from './ViewTestQuestions';
import { EditIcon } from 'lucide-react';
import SearchFilter from '@/components/SearchFilter';

export default function CreateTestPage() {
  const [tests, setTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewTestId, setViewTestId] = useState(null);
  const [testToEdit, setTestToEdit] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showTestTypeDropdown, setShowTestTypeDropdown] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 10;

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('All');
  const [sortOrder, setSortOrder] = useState('latest');


  const formatDate = (date) =>
    new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTestToEdit(null);
  };

  //Fetching all tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:4000/api/test/all-test', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await res.json();
        console.log('dataa',data)
        if (res.ok)
          {
            setTests(data.tests || []);
          } 
        else {
          setError(data.message || 'Failed to load tests');
        }
      } catch (err) {
        console.error('Error fetching tests:', err);
        setError('Something went wrong while loading tests');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);


  // Filter by search term or class
  const filteredTests = tests.filter((test) => {
    const matchesSearch =
      test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass =
      filterSubject === 'All' || test.subject === filterSubject;

    return matchesSearch && matchesClass;
  });

  // Sort
  const sortedTests = [...filteredTests].sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });


  // Pagination
const totalPagesCalc = Math.ceil(sortedTests.length / pageSize);
const paginatedTests = sortedTests.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
);


  const handleTestAdded = (updatedTest) => {
    if (testToEdit) {
      // Replace old test with updated one
      setTests((prev) =>
        prev.map((t) => (t._id === updatedTest._id ? updatedTest : t))
      );
    } else {
      // Add new test
      setTests((prev) => [updatedTest, ...prev]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setTests((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="p-4 md:p-8 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
          Create Tests
        </h1>

        <div className="relative">
          <button
            onClick={() => setShowTestTypeDropdown((prev) => !prev)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            + Create Test
          </button>

          {showTestTypeDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded shadow-lg z-10">
              {['MCQ', 'True/False', 'Fill in the Blanks', 'Match the Following'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    if (type === 'Fill in the Blanks') {
                      setSelectedTestType('MCQ');
                    }
                    else {
                      setSelectedTestType(type);
                    }

                    setShowTestTypeDropdown(false);
                    setTestToEdit(null);
                    handleOpenModal();
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filterState={filterSubject}
        onFilter={setFilterSubject}
        states={['Maths', 'Physics']}  // you can pass your class levels here dynamically too
        sortOrder={sortOrder}
        onSortOrder={setSortOrder}
      />


      {/* Loading & Error */}
      {loading && <p className="text-gray-500 text-center mt-10">Loading tests...</p>}
      {error && <p className="text-red-500 text-center mt-10">{error}</p>}

      {/* Tests List */}
      {!loading && !error && paginatedTests.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center mt-10">
          No tests created yet.
        </p>
      ) : (
        <div className="space-y-4">
          {paginatedTests.map((test) => (
            <div
              key={test._id}
              className="bg-gray-100 dark:bg-gray-800 p-5 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="mb-3 md:mb-0 w-full md:w-auto">
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                  {test.testName}
                </h3>
                <p>
                  Class: <strong>{test.classLevel}</strong> | Subject: <strong>{test.subject}</strong>
                </p>
                <p>
                  Questions: <strong>{test.questions.length}</strong> | Duration: <strong>{test.duration} mins</strong>
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Created: {formatDate(test.createdAt)}
                </p>
              </div>

              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => setViewTestId(test._id)}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                  title="View Test"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>

                <button
                  onClick={() => {
                    setTestToEdit(test);
                    setSelectedTestType(
                      test.type === 'mcq' ? 'MCQ' : 'True/False'
                    );
                    handleOpenModal();
                  }}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded"
                  title="Edit Test"
                >
                  <EditIcon className="h-5 w-5" />
                </button>

                <button
                  onClick={() => handleDelete(test._id)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                  title="Delete Test"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Test Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-full max-w-5xl relative max-h-[95vh] overflow-y-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-3 text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              &times;
            </button>

            <AddTestForm
              onAdded={handleTestAdded}
              onClose={handleCloseModal}
              testType={selectedTestType}
              existingTest={testToEdit}
              
            />
          </div>
        </div>
      )}

      {/* View Test Modal */}
      {viewTestId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setViewTestId(null)}
              className="absolute top-2 right-3 text-xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              &times;
            </button>

            <div className="pr-2">
              <ViewTestQuestions testId={viewTestId} />
            </div>
          </div>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPagesCalc}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
