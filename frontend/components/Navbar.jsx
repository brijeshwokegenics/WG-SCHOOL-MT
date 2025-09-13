"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; // Icons for hamburger

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/auth", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleAuthChange = () => fetchUser();
    window.addEventListener("authChanged", handleAuthChange);
    return () => window.removeEventListener("authChanged", handleAuthChange);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      window.dispatchEvent(new Event("authChanged"));
      router.push("/login");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <nav className="bg-slate-700 shadow-md sticky top-0 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-14 items-center">
          {/* Brand */}
          <Link
            href="/"
            className="text-white text-xl sm:text-2xl font-semibold tracking-wide hover:text-gray-300 transition duration-300"
          >
            School MockTest System
          </Link>

          {/* Desktop Nav (hidden on small) */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-800 text-white text-sm px-5 py-2 rounded-md font-medium transition duration-200 shadow-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm px-5 py-2 rounded-md font-medium transition duration-200 shadow-sm"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none transition duration-200"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <HiOutlineX className="h-6 w-6" />
              ) : (
                <HiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 pb-6 border-t border-gray-700">
          {user ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="block w-full text-left bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md font-medium transition duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-left bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-md font-medium transition duration-200"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
