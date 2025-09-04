// import React from 'react'

// const Navbar = () => {
//   return (
//     <div>Navbar</div>
//   )
// }

// export default Navbar

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Load user from localStorage (or cookies if you prefer)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Left Logo */}
      <Link href="/" className="text-2xl font-bold hover:text-yellow-300 transition">
        MockTest System
      </Link>

      {/* Center Links */}
      <div className="space-x-6">
        <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
        <Link href="/tests" className="hover:text-yellow-300 transition">Tests</Link>
        <Link href="/results" className="hover:text-yellow-300 transition">Results</Link>
        <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
      </div>

      {/* Right Side (Auth & Role Based) */}
      <div className="space-x-4">
        {user ? (
          <>
            <span className="font-semibold">Hi, {user.email}</span>

            {/* Role-based link */}
            {user.role === "owner" && (
              <Link
                href="/admin"
                className="bg-yellow-500 px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
              >
                Admin Dashboard
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
