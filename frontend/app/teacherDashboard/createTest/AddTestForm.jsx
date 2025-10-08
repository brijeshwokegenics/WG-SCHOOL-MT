//////////////

'use client';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const AddTestForm = ({ testType = 'MCQ', onAdded, onClose, teacherId }) => {
  const [testName, setTestName] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [section, setSection] = useState('');
  const [marks, setMarks] = useState('30');
  const [duration, setDuration] = useState(30);
  const [questions, setQuestions] = useState([]);
  const [csvQuestionCount, setCsvQuestionCount] = useState(0);


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

    if (!testName.trim() || !subject || !selectedClass || !section.trim() || questions.length === 0) {
      alert('Please fill all fields and add at least one question.');
      return;
    }

    const cleanedQuestions = questions.map((q) => {
      if (testType === 'MCQ') {
        return {
          questionText: q.questionText.trim(),
          options: q.options.map((opt) => opt.trim()),
          correctAnswer: q.correctAnswer,
        };
      } else {
        return {
          questionText: q.questionText.trim(),
          correctAnswer: q.correctAnswer,
        };
      }
    });

    const testData = {
      testName: testName.trim(),
      subject: subject.trim(),
      classLevel: selectedClass,
      section: section.trim(),
      type: testType === 'MCQ' ? 'mcq' : 'trueFalse',
      duration: Number(duration),
      marks: marks.trim(),
      createdBy: teacherId,
      questions: cleanedQuestions,
      scheduledAt: null,
    };

    console.log('Submitting Test Data:', testData);

    try {
      const response = await fetch('http://localhost:4000/api/test/create-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(testData),
      });

      if (!response.ok) throw new Error('Failed to create test');

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
          : { questionText: '', correctAnswer: 'true' },
      ]);
    } catch (error) {
      console.error('Error submitting test:', error);
      alert('Error creating test.');
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

                {testType === 'MCQ' ? (
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

          <button
            type="button"
            onClick={addQuestion}
            className="mt-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            + Add More Questions
          </button>
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



