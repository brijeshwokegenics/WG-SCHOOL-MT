"use client";

import { useState, useRef } from "react";

export default function CsvUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
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

  // Handle file selection and upload immediately after confirmation
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      setMessage("Please select a CSV file.");
      return;
    }

    // Confirm upload
    const confirmed = window.confirm(
      `Are you sure you want to upload "${selectedFile.name}"?`
    );
    if (!confirmed) {
      setMessage("Upload cancelled.");
      return;
    }

    setFile(selectedFile);
    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:4000/api/upload/uploadTeacherCsv", {
        method: "POST",
        body: formData,
        credentials: "include", // Sends cookies (e.g. JWT)
      });

      const result = await response.json();
      setMessage(result.message || "Upload successful!");
      console.log("CSV Data:", result.data); // Optional: show in table
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Upload failed.");
    }

    setUploading(false);
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
        disabled={uploading}
        className={`py-3 px-6 rounded-md text-white font-medium transition ${
          uploading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload CSV"}
      </button>

      {/* Display selected file name */}
      {file && !uploading && (
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Selected file: <span className="font-semibold">{file.name}</span>
        </p>
      )}

      {/* Message */}
      {message && (
        <p
          className={`mt-2 font-medium ${
            message.toLowerCase().includes("failed") ||
            message.toLowerCase().includes("cancelled") ||
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
