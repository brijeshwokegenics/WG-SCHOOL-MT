"use client";

import { useState, useRef } from "react";
import Papa from "papaparse";

export default function CsvTestUpload({ onParsed }) {
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  // Open file picker when button clicked
  const handleButtonClick = () => {
    setMessage("");
    if (inputRef.current) {
      inputRef.current.value = null; // reset previous file
      inputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      setMessage("Please select a valid CSV file.");
      return;
    }

    setFile(selectedFile);
    setParsing(true);
    setMessage("Parsing file...");

    Papa.parse(selectedFile, {
      header: true, // assumes first row is header
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed CSV:", results.data);

        const parsedQuestions = results.data.map((row) => {
          if (row.Type?.toLowerCase() === "mcq") {
            // Expected columns: Question, Option1, Option2, Option3, Option4, CorrectAnswer
            return {
              questionText: row.Question?.trim() || "",
              options: [
                row.Option1?.trim(),
                row.Option2?.trim(),
                row.Option3?.trim(),
                row.Option4?.trim(),
              ].filter(Boolean),
              correctAnswer: parseInt(row.CorrectAnswer) - 1 || 0, // convert 1-based to 0-based
            };
          } else if (row.Type?.toLowerCase() === "truefalse" || row.Type?.toLowerCase() === "true/false") {
            // Expected columns: Question, CorrectAnswer
            return {
              questionText: row.Question?.trim() || "",
              correctAnswer:
                row.CorrectAnswer?.toLowerCase() === "true" ? true : false,
            };
          }
          return null;
        }).filter(Boolean);

        setParsing(false);
        setMessage(`Parsed ${parsedQuestions.length} questions successfully!`);

        // Send parsed data to parent
        onParsed?.(parsedQuestions);
      },
      error: (error) => {
        console.error("CSV parse error:", error);
        setParsing(false);
        setMessage("Error parsing CSV file.");
      },
    });
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        accept=".csv"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Upload button */}
      <button
        onClick={handleButtonClick}
        disabled={parsing}
        className={`px-4 py-2 rounded-md text-white font-medium transition ${
          parsing
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {parsing ? "Parsing..." : "Upload CSV"}
      </button>

      {/* Selected file */}
      {file && !parsing && (
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Selected file: <span className="font-semibold">{file.name}</span>
        </p>
      )}

      {/* Message */}
      {message && (
        <p
          className={`mt-2 font-medium ${
            message.toLowerCase().includes("error") ||
            message.toLowerCase().includes("please")
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}