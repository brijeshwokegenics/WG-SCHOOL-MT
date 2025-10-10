'use client';
import React from 'react';

export default function TrueFalseQuestion({ question, qIndex, handleCorrectAnswerChange }) {
  return (
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
  );
}
