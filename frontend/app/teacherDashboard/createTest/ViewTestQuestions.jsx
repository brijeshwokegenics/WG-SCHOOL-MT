'use client';
import React, { useEffect, useState } from 'react';

export default function ViewTestQuestions({ testId }) {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!testId) return;

    const fetchTest = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/test/${testId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await res.json();
        console.log("dataa",data)
        if (res.ok) setTest(data);
        else setError(data.message || 'Failed to load test');
      } catch (err) {
        setError('Error fetching test details');
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [testId]);

  if (loading) return <p>Loading test...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!test) return <p>No test found.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">
        {test.testName} — Questions ({test.questions.length})
      </h2>

      {test.questions.map((q, index) => (
        <div key={index} className="border rounded-md p-4 bg-gray-50 dark:bg-gray-800">
          <p className="font-medium mb-2">
            Q{index + 1}. {q.questionText}
          </p>

          {test.type === 'mcq' && (
            <ul className="space-y-1">
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  className={`px-3 py-1 rounded ${
                    i.toString() === q.correctAnswer
                      ? 'bg-green-200 dark:bg-green-700'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </li>
              ))}
            </ul>
          )}

          {test.type === 'trueFalse' && (
            <p>
              <span className="font-semibold">Correct Answer:</span>{' '}
              {q.correctAnswer === 'true' ? 'True' : 'False'}
            </p>
          )}

          {test.type === 'match' && (
            <div>
              <p className="font-semibold mb-2">Match the following:</p>
              <table className="w-full text-left border-collapse">
                <tbody>
                  {q.matchPairs.map((pair, i) => (
                    <tr key={i}>
                      <td className="p-1 border">{pair.left}</td>
                      <td className="p-1 border">→</td>
                      <td className="p-1 border">{pair.right}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
