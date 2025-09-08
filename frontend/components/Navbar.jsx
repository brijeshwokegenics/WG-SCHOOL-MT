"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Fetch user info from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth", {
          credentials: "include", // sends HttpOnly cookies automatically
        });
        if (res.ok) {
          const data = await res.json();
          console.log(data);
          setUser(data.user); // assuming backend returns { user: { email, role } }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Error logging out:", err);
    }
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

      {/* Right Side */}
      <div className="space-x-4">
        
          <>
            
            

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
                  <Link
            href="/login"
            className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </Link>
        
      </div>
    </nav>
  );
}
