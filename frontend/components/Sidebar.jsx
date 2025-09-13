"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdPeople, MdOutlineAnnouncement, MdOutlineSchool, MdOutlineAssessment } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
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
      console.error("Logout error:", err);
    }
  };

  const links = [
    { label: "Dashboard", href: "/principalDashboard/dashboard", icon: <MdDashboard /> },
    { label: "Manage Teachers", href: "/principalDashboard/manageTeachers", icon: <HiUserGroup /> },
    { label: "Manage Students", href: "/principalDashboard/manageStudents", icon: <MdPeople /> },
    { label: "View Attendance", href: "/principal/attendance", icon: <MdOutlineAssessment /> },
    { label: "Student Results", href: "/principal/results", icon: <MdOutlineAssessment /> },
    { label: "Announcements", href: "/principalDashboard/principalAnnouncements", icon: <MdOutlineAnnouncement /> },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300 ease-in-out min-h-screen flex flex-col justify-between py-6 px-4 shadow-lg ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top: Brand + Toggle */}
      <div>
        <div className="flex justify-between items-center mb-8">
          {!isCollapsed && (
            <h2 className="text-xl font-bold tracking-wide text-white">Principal Panel</h2>
          )}
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="text-white hover:text-blue-400 text-xl"
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
                pathname === href
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <span className="text-lg">{icon}</span>
              {!isCollapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom: Logout */}
    {/*  {user && (
        <div className="mt-10 px-2">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 text-white py-2 rounded-md transition font-medium text-sm"
          >
            <FaSignOutAlt className="text-base" />
            {!isCollapsed && "Logout"}
          </button>
        </div>
      )}
        */}
    </aside>
  );
}
