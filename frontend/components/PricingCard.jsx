"use client";
export function PricingCard({ plan, price, features, highlight }) {
  return (
    <div
      className={`relative p-8 rounded-2xl shadow-lg transition transform hover:scale-105 duration-300 ${
        highlight
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
          : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      }`}
    >
      {highlight && (
        <span className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-2 py-1 text-xs rounded-full font-semibold shadow-md">
          Most Popular
        </span>
      )}

      <h3 className="text-xl font-bold mb-4">{plan}</h3>
      <p className={`text-3xl font-extrabold mb-6 ${highlight ? "text-white" : "text-blue-700 dark:text-blue-400"}`}>
        {price}
      </p>

      <ul className="mb-6 space-y-2 text-sm">
        {features.map((f, i) => (
          <li key={i} className="flex items-center">
            <span className={`mr-2 font-bold ${highlight ? "text-white" : "text-blue-500"}`}>✓</span> {f}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-2 rounded-lg font-semibold transition ${
          highlight
            ? "bg-white text-indigo-600 hover:bg-gray-100"
            : "bg-blue-700 text-white hover:bg-blue-800"
        }`}
      >
        Choose Plan
      </button>
    </div>
  );
}
