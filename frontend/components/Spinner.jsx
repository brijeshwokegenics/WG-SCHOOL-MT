"use client";

export default function Spinner({ size = "w-6 h-6", color = "border-white" }) {
  return (
    <div
      className={`${size} border-2 ${color} border-t-transparent rounded-full animate-spin`}
    ></div>
  );
}
