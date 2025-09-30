"use client";
import React from "react";
import { Search, Filter, SortAsc } from "lucide-react";

export default function SearchFilter({ 
  searchTerm, 
  onSearch, 
  filterState, 
  onFilter, 
  states,   
  sortOrder, 
  onSortOrder 
}) {
  return (
    <div className="w-full transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 p-4 sm:p-6">
        {/* Search input */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search by name, code, or city..."
            className="block w-full pl-10 pr-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
          <select
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white pl-10 pr-8 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer min-w-36 sm:min-w-40"
            value={filterState}
            onChange={(e) => onFilter(e.target.value)}
          >
            <option value="All" className="bg-white dark:bg-gray-800">All States</option>
            {states && states.map((state) => (
              <option key={state} value={state} className="bg-white dark:bg-gray-800">
                {state}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SortAsc className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
          <select
            className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white pl-10 pr-8 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer min-w-36 sm:min-w-40"
            value={sortOrder}
            onChange={(e) => onSortOrder(e.target.value)}
          >
            <option value="latest" className="bg-white dark:bg-gray-800">Latest Added</option>
            <option value="oldest" className="bg-white dark:bg-gray-800">Oldest Added</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo component to showcase the enhanced SearchFilter
function Demo() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterState, setFilterState] = React.useState("All");
  const [sortOrder, setSortOrder] = React.useState("latest");
  const [isDark, setIsDark] = React.useState(false);

  const states = ["California", "New York", "Texas", "Florida", "Illinois", "Pennsylvania"];

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Enhanced Search Filter
          </h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <SearchFilter
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            filterState={filterState}
            onFilter={setFilterState}
            states={states}
            sortOrder={sortOrder}
            onSortOrder={setSortOrder}
          />
        </div>
        
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Current Values:</h2>
          <div className="space-y-2 text-gray-700 dark:text-gray-300">
            <p><strong>Search Term:</strong> "{searchTerm}" {!searchTerm && "(empty)"}</p>
            <p><strong>Filter State:</strong> {filterState}</p>
            <p><strong>Sort Order:</strong> {sortOrder}</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100">✨ Enhanced Features:</h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>• <strong>Responsive Design:</strong> Stacks vertically on mobile, horizontal on desktop</li>
            <li>• <strong>Dark Mode Support:</strong> Seamless theme switching with proper contrast</li>
            <li>• <strong>Modern Styling:</strong> Rounded corners, subtle shadows, and smooth transitions</li>
            <li>• <strong>Interactive Icons:</strong> Visual indicators for each input type</li>
            <li>• <strong>Enhanced Focus States:</strong> Clear focus rings and hover effects</li>
            <li>• <strong>Accessibility:</strong> Proper contrast ratios and keyboard navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}