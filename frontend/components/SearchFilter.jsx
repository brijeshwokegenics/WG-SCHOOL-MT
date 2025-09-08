"use client";
import React from "react";

export default function SearchFilter({ searchTerm, onSearch, filterState, onFilter, states,   sortOrder, onSortOrder, }) {
  return (
    <div className="flex items-center gap-4 my-4">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name, code, or city..."
        className="border px-3 py-2 rounded w-1/3"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Filter dropdown */}
      <select
        className="border px-3 py-2 rounded"
        value={filterState}
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="All">All States</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>


       {/*Sort dropdown */}
      <select
        className="border px-3 py-2 rounded"
        value={sortOrder}
        onChange={(e) => onSortOrder(e.target.value)}
      >
        <option value="latest">Latest Added</option>
        <option value="oldest">Oldest Added</option>
      </select>
    </div>
  );
}
