//////////////

'use client';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import MCQQuestion from './MCQQuestion';
import TrueFalseQuestion from './TrueFalseQuestion';
import MatchQuestion from './MatchQuestion';

const AddTestForm = ({ testType = 'MCQ', onAdded, onClose }) => {
  const [testName, setTestName] = useState('Test');
  const [subject, setSubject] = useState('Maths');
  const [selectedClass, setSelectedClass] = useState('7');
  const [section, setSection] = useState('B');
  const [marks, setMarks] = useState('30');
  const [duration, setDuration] = useState(30);
  // const [questions, setQuestions] = useState([]);
  const [questions, setQuestions] = useState([
    { questionText: '', options: [], correctAnswer: '', pairs: [] },
  ]);

  const [csvQuestionCount, setCsvQuestionCount] = useState(0);

  const type =
    testType === 'MCQ'
      ? 'mcq'
      : testType === 'True/False'
        ? 'trueFalse'
        : testType === 'Match the Following'
          ? 'match'
          : 'mcq'; // fallback


  // Initialize first question
  useEffect(() => {
    setQuestions([
      testType === 'MCQ'
        ? { questionText: '', options: ['', '', '', ''], correctAnswer: '0' }
        : { questionText: '', correctAnswer: 'true' },
    ]);
  }, [testType]);

  // Handle CSV Upload
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed = result.data;

        let formatted = [];
        if (testType === 'MCQ') {
          formatted = parsed.map((row) => {
            const options = [
              row.option1?.trim() || '',
              row.option2?.trim() || '',
              row.option3?.trim() || '',
              row.option4?.trim() || '',
            ];
            let correctAnswerIndex = '0';

            // Handle both index (1–4) and text match
            if (['1', '2', '3', '4'].includes(row.correctAnswer?.trim())) {
              correctAnswerIndex = (parseInt(row.correctAnswer) - 1).toString();
            } else {
              const matchIndex = options.findIndex(
                (opt) => opt.toLowerCase() === row.correctAnswer?.trim().toLowerCase()
              );
              if (matchIndex !== -1) correctAnswerIndex = matchIndex.toString();
            }

            return {
              questionText: row.questionText?.trim() || '',
              options,
              correctAnswer: correctAnswerIndex,
            };
          });
        } else {
          formatted = parsed.map((row) => ({
            questionText: row.questionText?.trim() || '',
            correctAnswer:
              row.correctAnswer?.toLowerCase() === 'true' ? 'true' : 'false',
          }));
        }

        setQuestions(formatted);
        setCsvQuestionCount(formatted.length); // store total question count
      },
    });
  };

  const handleQuestionTextChange = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value.toString();
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      testType === 'MCQ'
        ? { questionText: '', options: ['', '', '', ''], correctAnswer: '0' }
        : { questionText: '', correctAnswer: 'true' },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };


  // Update left/right values
  const handlePairChange = (qIndex, pairIndex, side, value) => {
    const updated = [...questions];
    updated[qIndex].pairs[pairIndex][side] = value;
    setQuestions(updated);
  };

  // Add a new pair
  const handleAddPair = (qIndex) => {
    const updated = [...questions];
    if (!updated[qIndex].pairs) updated[qIndex].pairs = [];
    updated[qIndex].pairs.push({ left: '', right: '' });
    setQuestions(updated);
  };

  // Remove a pair
  const handleRemovePair = (qIndex, pairIndex) => {
    const updated = [...questions];
    updated[qIndex].pairs.splice(pairIndex, 1);
    setQuestions(updated);
  };


  //download csv format for both mcq and true-false
  const downloadSampleCSV = (type) => {
    let sampleData = "";

    if (type === "MCQ") {
      sampleData = `questionText,optionA,optionB,optionC,optionD,correctAnswer\nWhat is 2+2?,2,3,4,5,4`;
    } else if (type === "true/false") {
      sampleData = `questionText,correctAnswer\nThe earth is flat,false`;
    }

    const blob = new Blob([sampleData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${type}_sample_format.csv`;
    link.click();
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validation
  if (!testName.trim() || !subject || !selectedClass || !section.trim() || questions.length === 0) {
    alert('Please fill all fields and add at least one question.');
    return;
  }

  // Clean questions based on test type
  const cleanedQuestions = questions.map((q) => {
    if (testType === 'MCQ') {
      return {
        questionText: q.questionText.trim(),
        options: q.options.map((opt) => opt.trim()),
        correctAnswer: q.correctAnswer,
      };
    } else if (testType === 'True/False') {
      return {
        questionText: q.questionText.trim(),
        correctAnswer: q.correctAnswer, // 'true' or 'false'
      };
    } else if (testType === 'match') {
      return {
        questionText: q.questionText.trim(),
        pairs: (q.pairs || []).map((p) => ({
          left: p.left.trim(),
          right: p.right.trim(),
        })),
      };
    }
  });

  // Prepare payload
  const testData = {
    testName: testName.trim(),
    subject: subject.trim(),
    classLevel: selectedClass,
    section: section.trim(),
    type:
      testType === 'MCQ'
        ? 'mcq'
        : testType === 'True/False'
          ? 'trueFalse'
          : testType === 'match'
            ? 'match'
            : 'mcq',
    duration: Number(duration),
    marks: marks.trim(),
    questions: cleanedQuestions,
    scheduledAt: null, // if you plan to schedule later
  };

  console.log('Submitting Test Data:', testData);

  try {
    const response = await fetch('http://localhost:4000/api/test/create-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // important to send cookies
      body: JSON.stringify(testData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create test');
    }

    alert('Test created successfully!');
    onAdded?.(testData);
    onClose?.();

    // Reset form
    setTestName('');
    setSubject('');
    setSelectedClass('');
    setSection('');
    setMarks('30');
    setDuration(30);
    setQuestions([
      testType === 'MCQ'
        ? { questionText: '', options: ['', '', '', ''], correctAnswer: '0' }
        : testType === 'True/False'
          ? { questionText: '', correctAnswer: 'true' }
          : { questionText: '', pairs: [] },
    ]);
  } catch (error) {
    console.error('Error submitting test:', error);
    alert('Error creating test: ' + error.message);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create {testType} Test</h2>

        {/* Test Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold mb-1">Test Name</label>
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-4 py-2"
              placeholder="Enter test name"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-4 py-2"
              placeholder="Enter subject"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              required
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-4 py-2"
            >
              <option value="">Select Class</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Section</label>
            <input
              type="text"
              value={section}
              onChange={(e) =>
                setSection(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))
              }
              required
              maxLength={1}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-4 py-2"
              placeholder="Enter Section (A-Z)"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Duration (minutes)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              min={5}
              max={180}
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Max Marks</label>
            <input
              type="text"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              required
              placeholder="Enter marks"
              className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-4 py-2"
            />
          </div>

        </div>

        {/* CSV Upload */}
        <div className="my-6">
          <label className="block font-semibold mb-2">Upload CSV File (optional)</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="border border-gray-300 dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-gray-700 text-sm"
          />
          <p className="text-sm text-gray-500 mt-1">
            {testType === 'MCQ'
              ? 'Format: questionText,option1,option2,option3,option4,correctAnswer'
              : 'Format: questionText,correctAnswer (true/false)'}
          </p>
          {csvQuestionCount > 0 && (
            <p className="mt-2 text-green-600 font-semibold">
              {csvQuestionCount} questions uploaded successfully.
            </p>
          )}

        </div>

        {/* download CSV format */}
        <button
          type="button"
          onClick={() => downloadSampleCSV(testType)}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2"
        >
          Download CSV Format
        </button>


        {/* Questions */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Questions</h3>
          
              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                {questions.length}
              </span>
          <div className="max-h-[400px] overflow-y-auto pr-2 space-y-6 border border-gray-300 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-700">
            {questions.map((question, qIndex) => (
              <div
                key={qIndex}
                className="border border-gray-300 dark:border-gray-600 rounded-md p-4 bg-white dark:bg-gray-800"
              >
                <div className="mb-4">
                  <label className="block font-semibold mb-1">
                    Question {qIndex + 1}
                  </label>
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                    required
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-2"
                    placeholder="Enter the question"
                  />
                </div>

                {/* {testType === 'MCQ' ? (
                  <div className="space-y-3">
                    {question.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-3">
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(qIndex, optIndex, e.target.value)
                          }
                          required
                          className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-2"
                          placeholder={`Option ${optIndex + 1}`}
                        />
                        <label className="flex items-center gap-1 text-sm">
                          <input
                            type="radio"
                            name={`correct-${qIndex}`}
                            checked={question.correctAnswer === optIndex.toString()}
                            onChange={() => handleCorrectAnswerChange(qIndex, optIndex)}
                          />
                          Correct
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex gap-4 mt-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`truefalse-${qIndex}`}
                        checked={question.correctAnswer === 'true'}
                        onChange={() => handleCorrectAnswerChange(qIndex, 'true')}
                      />
                      True
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`truefalse-${qIndex}`}
                        checked={question.correctAnswer === 'false'}
                        onChange={() => handleCorrectAnswerChange(qIndex, 'false')}
                      />
                      False
                    </label>
                  </div>
                )} */}

                {testType === 'MCQ' ? (
                  <MCQQuestion
                    question={question}
                    qIndex={qIndex}
                    handleOptionChange={handleOptionChange}
                    handleCorrectAnswerChange={handleCorrectAnswerChange}
                  />
                ) : testType === 'true/false' ? (
                  <TrueFalseQuestion
                    question={question}
                    qIndex={qIndex}
                    handleCorrectAnswerChange={handleCorrectAnswerChange}
                  />
                ) : (
                  <MatchQuestion
                    question={question}
                    qIndex={qIndex}
                    handlePairChange={handlePairChange}
                    handleAddPair={handleAddPair}
                    handleRemovePair={handleRemovePair}
                  />
                )}



                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="mt-4 bg-red-700 hover:bg-red-900 text-white text-sm px-3 py-1 rounded transition"
                  >
                    Remove Question
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* <button
            type="button"
            onClick={addQuestion}
            className="mt-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            + Add More Questions
          </button> */}

          <div className="mt-4 flex justify-between items-center">
            <button
              type="button"
              onClick={addQuestion}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              + Add More Questions
            </button>

            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
              <span className="font-semibold">Total Questions:</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                {questions.length}
              </span>
            </div>
          </div>

        </div>

        {/* Submit */}
        <div className="text-center mt-10">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded text-lg hover:bg-blue-700"
          >
            Submit Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTestForm;



// 'use client';

// import React, { useState } from 'react';
// import QuestionList from './QuestionList';
// import axios from 'axios';

// export default function AddTestForm({ onAdded, onClose }) {
//   const [testName, setTestName] = useState('');
//   const [subject, setSubject] = useState('');
//   const [classLevel, setClassLevel] = useState('');
//   const [testType, setTestType] = useState('MCQ'); // 'MCQ', 'true/false', 'match'
//   const [duration, setDuration] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [csvFile, setCsvFile] = useState(null);
//   const [uploadCount, setUploadCount] = useState(0);
//   const [loading, setLoading] = useState(false);

//   const handleCsvUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setCsvFile(file);
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         'http://localhost:4000/api/tests/upload-csv',
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//           withCredentials: true,
//         }
//       );

//       setQuestions(res.data.questions);
//       setUploadCount(res.data.questions.length);
//       alert(`Uploaded ${res.data.questions.length} questions`);
//     } catch (err) {
//       alert('Error uploading CSV');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!testName || !subject || !classLevel || !duration) {
//       alert('Please fill all required fields');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         'http://localhost:4000/api/tests/create',
//         {
//           testName,
//           subject,
//           classLevel,
//           testType,
//           duration,
//           questions,
//         },
//         { withCredentials: true }
//       );

//       alert('Test created successfully!');
//       onAdded();
//       onClose();
//     } catch (err) {
//       console.error('Error saving test:', err);
//       toast.error('Failed to save test');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
//         Create New Test
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Basic Details */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-semibold text-gray-700 dark:text-gray-200">
//               Test Name
//             </label>
//             <input
//               type="text"
//               value={testName}
//               onChange={(e) => setTestName(e.target.value)}
//               placeholder="Enter test name"
//               className="w-full border p-2 rounded mt-1"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700 dark:text-gray-200">
//               Subject
//             </label>
//             <input
//               type="text"
//               value={subject}
//               onChange={(e) => setSubject(e.target.value)}
//               placeholder="Enter subject"
//               className="w-full border p-2 rounded mt-1"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700 dark:text-gray-200">
//               Class Level
//             </label>
//             <input
//               type="text"
//               value={classLevel}
//               onChange={(e) => setClassLevel(e.target.value)}
//               placeholder="e.g. 6th Grade"
//               className="w-full border p-2 rounded mt-1"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700 dark:text-gray-200">
//               Duration (minutes)
//             </label>
//             <input
//               type="number"
//               value={duration}
//               onChange={(e) => setDuration(e.target.value)}
//               placeholder="Enter duration"
//               className="w-full border p-2 rounded mt-1"
//             />
//           </div>
//         </div>

//         {/* Test Type Selector */}
//         <div>
//           <label className="block font-semibold text-gray-700 dark:text-gray-200">
//             Test Type
//           </label>
//           <select
//             value={testType}
//             onChange={(e) => {
//               setTestType(e.target.value);
//               setQuestions([]);
//             }}
//             className="border p-2 rounded mt-1 w-full"
//           >
//             <option value="MCQ">MCQ</option>
//             <option value="true/false">True / False</option>
//             <option value="match">Match the Following</option>
//           </select>
//         </div>

//         {/* CSV Upload */}
//         <div className="mt-2">
//           <label className="block font-semibold text-gray-700 dark:text-gray-200">
//             Upload Questions via CSV
//           </label>
//           <input
//             type="file"
//             accept=".csv"
//             onChange={handleCsvUpload}
//             className="mt-2"
//           />
//           {uploadCount > 0 && (
//             <p className="text-sm mt-1 text-green-600">
//                {uploadCount} questions uploaded successfully!
//             </p>
//           )}
//         </div>

//         {/* Question List Section */}
//         <QuestionList
//           testType={testType}
//           questions={questions}
//           setQuestions={setQuestions}
//         />

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//           >
//             {loading ? 'Saving...' : 'Create Test'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
