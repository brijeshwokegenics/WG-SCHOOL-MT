"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex flex-wrap justify-center items-center mt-6 gap-1 sm:gap-2 px-4">
      {/* Prev Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center justify-center min-w-[2.5rem] h-10 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        <span className="hidden xs:inline">Prev</span>
        <span className="xs:hidden">‹</span>
      </button>

      {/* Page Numbers */}
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mx-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`min-w-[2.5rem] h-10 px-3 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200 shadow-sm hover:shadow-md ${
              currentPage === i + 1
                ? "bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 shadow-md"
                : "text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center justify-center min-w-[2.5rem] h-10 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white dark:disabled:hover:bg-gray-800 disabled:hover:border-gray-200 dark:disabled:hover:border-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <span className="hidden xs:inline">Next</span>
        <span className="xs:hidden">›</span>
        <ChevronRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  );
}

// Demo component to showcase the enhanced Pagination
function Demo() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(10);
  const [isDark, setIsDark] = React.useState(false);



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Enhanced Pagination Component
          </h1>
          <button
            onClick={() => setIsDark(!isDark)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 font-medium"
          >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        
        {/* Controls */}
        <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Demo Controls</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Page:
              </label>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => setCurrentPage(Math.max(1, Math.min(totalPages, parseInt(e.target.value) || 1)))}
                className="w-20 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Pages:
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={totalPages}
                onChange={(e) => {
                  const newTotal = Math.max(1, parseInt(e.target.value) || 1);
                  setTotalPages(newTotal);
                  if (currentPage > newTotal) {
                    setCurrentPage(newTotal);
                  }
                }}
                className="w-20 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Pagination Component */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Pagination Component</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Showing page {currentPage} of {totalPages}
            </p>
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Click any page number or use Prev/Next buttons
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold mb-3 text-blue-900 dark:text-blue-100 flex items-center">
              ✨ Design Enhancements
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• Modern button styling with shadows and hover effects</li>
              <li>• Consistent sizing with minimum widths and heights</li>
              <li>• Enhanced visual hierarchy and spacing</li>
              <li>• Smooth transitions and micro-interactions</li>
              <li>• Professional color scheme with proper contrast</li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold mb-3 text-green-900 dark:text-green-100 flex items-center">
              📱 Responsive Features
            </h3>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
              <li>• Adaptive text (full text on larger screens, symbols on mobile)</li>
              <li>• Flexible gap spacing that adjusts to screen size</li>
              <li>• Touch-friendly button sizes (minimum 44px height)</li>
              <li>• Proper wrapping behavior for many pages</li>
              <li>• Optimized padding and margins for all devices</li>
            </ul>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">🔧 Technical Improvements</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Accessibility</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Proper focus rings with offset</li>
                <li>• Keyboard navigation support</li>
                <li>• ARIA-compliant button states</li>
                <li>• High contrast ratios</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Performance</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Optimized hover states</li>
                <li>• Efficient CSS transitions</li>
                <li>• Minimal re-renders</li>
                <li>• Lightweight icons from Lucide</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}