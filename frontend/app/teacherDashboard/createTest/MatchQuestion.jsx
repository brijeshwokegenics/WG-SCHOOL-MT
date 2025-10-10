'use client';
import React from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function MatchQuestion({
  question,
  qIndex,
  handlePairChange,
  handleAddPair,
  handleRemovePair,
}) {
  return (
    <div className="space-y-3 mt-2">
      {(question.pairs || []).map((pair, pairIndex) => (
        <div
          key={pairIndex}
          className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg p-2"
        >
          {/* Left column */}
          <input
            type="text"
            value={pair.left}
            onChange={(e) => handlePairChange(qIndex, pairIndex, 'left', e.target.value)}
            placeholder={`Left ${pairIndex + 1}`}
            className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-2"
          />

          {/* Right column */}
          <input
            type="text"
            value={pair.right}
            onChange={(e) => handlePairChange(qIndex, pairIndex, 'right', e.target.value)}
            placeholder={`Right ${pairIndex + 1}`}
            className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-2"
          />

          {/* Remove pair button */}
          <button
            type="button"
            onClick={() => handleRemovePair(qIndex, pairIndex)}
            className="text-red-500 hover:text-red-700"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ))}

      {/* Add pair button */}
      <button
        type="button"
        onClick={() => handleAddPair(qIndex)}
        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mt-2"
      >
        <PlusIcon className="w-4 h-4" />
        Add Pair
      </button>
    </div>
  );
}
