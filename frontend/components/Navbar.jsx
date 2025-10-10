"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon, BellIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleAuthChange = () => fetchUser();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("authChanged", handleAuthChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          "http://localhost:4000/api/showAnnouncement/showAnnouncementToUser",
          { credentials: "include" }
        );
        if (res.ok) {
          const data = await res.json();
          console.log("noti data is:",data);
          setNotifications(data.announcements || []);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };

    if (user?.role === "teacher" || user?.role === "student") {
      fetchNotifications();
    }
  }, [user]);

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

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setIsDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
          : "bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                School MockTest System
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                Educational Assessment Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>

            {/* Notifications for Teacher/Student */}
            {(user?.role === "teacher" || user?.role === "student") && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="relative p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <BellIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-80 overflow-y-auto z-50">
                    {notifications.length > 0 ? (
                      notifications.map((note, i) => (
                        <div
                          key={i}
                          className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <p className="font-medium text-gray-800 dark:text-gray-100">
                            {note.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {note.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        No announcements yet.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Toggle Dark Mode"
            >
               {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle Menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <div
                  className={`w-full h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                ></div>
                <div
                  className={`w-full h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                ></div>
                <div
                  className={`w-full h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-1" : ""
                  }`}
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-6 space-y-4">
          {user && (
            <>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.name || "User"}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {user.role || "Student"}
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            {user ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div> */}
      {/* Mobile Dropdown */}
<div className="md:hidden relative">
  <div
    className={`absolute top-full right-0 transform -translate-x-1/10 transition-all duration-300 ease-in-out overflow-hidden z-50 ${
      menuOpen ? "opacity-100 max-h-[300px]" : "opacity-0 max-h-0"
    } w-[40vw]`}
  >
    <div className="bg-white dark:bg-gray-900 border border-blue-900 dark:border-gray-700 px-4 py-6 space-y-4 rounded-lg shadow-lg">
      {user && (
        <div className="flex items-center space-x-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-white">
              {user.name || "User"}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {user.role || "Student"}
            </span>
          </div>
        </div>
      )}

       <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Toggle Dark Mode"
            >
               {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-400" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        {user ? (
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            onClick={() => setMenuOpen(false)}
            className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  </div>
</div>

    </nav>
  );
}
