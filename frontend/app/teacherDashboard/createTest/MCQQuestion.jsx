'use client';
import React from 'react';

export default function MCQQuestion({
  question,
  qIndex,
  handleOptionChange,
  handleCorrectAnswerChange,
}) {
  return (
    <div className="space-y-3">
      {question.options.map((opt, optIndex) => (
        <div key={optIndex} className="flex items-center gap-3">
          <input
            type="text"
            value={opt}
            onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
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
  );
}
