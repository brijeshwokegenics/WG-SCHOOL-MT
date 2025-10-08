// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { FaBars, FaSignOutAlt } from "react-icons/fa";
// import { 
//   MdDashboard, MdPeople, MdOutlineAnnouncement, 
//   MdOutlineAssessment, MdOutlineSchool 
// } from "react-icons/md";
// import { HiUserGroup } from "react-icons/hi";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [user, setUser] = useState(null);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   // ✅ Fetch user info (to get role)
//   const fetchUser = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/auth", {
//         credentials: "include",
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setUser(data.user);
//       } else {
//         setUser(null);
//       }
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//     const handleAuthChange = () => fetchUser();
//     window.addEventListener("authChanged", handleAuthChange);
//     return () => window.removeEventListener("authChanged", handleAuthChange);
//   }, []);


//   //incase in futher we need logout feature in sidebar
//   // const handleLogout = async () => {
//   //   try {
//   //     await fetch("http://localhost:4000/api/auth/logout", {
//   //       method: "POST",
//   //       credentials: "include",
//   //     });
//   //     setUser(null);
//   //     window.dispatchEvent(new Event("authChanged"));
//   //     router.push("/login");
//   //   } catch (err) {
//   //     console.error("Logout error:", err);
//   //   }
//   // };

//   // ✅ Define links based on role
//   const principalLinks = [
//     { label: "Dashboard", href: "/principalDashboard/dashboard", icon: <MdDashboard /> },
//     { label: "Manage Teachers", href: "/principalDashboard/manageTeachers", icon: <HiUserGroup /> },
//     { label: "Manage Students", href: "/principalDashboard/manageStudents", icon: <MdPeople /> },
//     { label: "View Attendance", href: "/principal/attendance", icon: <MdOutlineAssessment /> },
//     { label: "Student Results", href: "/principal/results", icon: <MdOutlineAssessment /> },
//     { label: "Announcements", href: "/principalDashboard/principalAnnouncements", icon: <MdOutlineAnnouncement /> },
//   ];

//   const teacherLinks = [
//     { label: "Dashboard", href: "/teacher/dashboard", icon: <MdDashboard /> },
//     { label: "Announcements", href: "/teacher/announcements", icon: <MdOutlineAnnouncement /> },
//     { label: "Add Student", href: "/teacher/addStudent", icon: <MdPeople /> },
//     { label: "Attendance", href: "/teacher/attendance", icon: <MdOutlineAssessment /> },
//   ];

//   const links = user?.role === "principal" ? principalLinks : teacherLinks;

//   return (
//     <aside
//       className={`bg-gray-900 text-white transition-all duration-300 ease-in-out min-h-screen flex flex-col justify-between py-6 px-4 shadow-lg ${
//         isCollapsed ? "w-20" : "w-64"
//       }`}
//     >
//       {/* 🔹 Top Section: Brand + Toggle */}
//       <div>
//         <div className="flex justify-between items-center mb-8">
//           {!isCollapsed && (
//             <h2 className="text-xl font-bold tracking-wide text-white">
//               {user?.role === "teacher" ? "Teacher Panel" : "Principal Panel"}
//             </h2>
//           )}
//           <button
//             onClick={() => setIsCollapsed((prev) => !prev)}
//             className="text-white hover:text-blue-400 text-xl"
//             aria-label="Toggle Sidebar"
//           >
//             <FaBars />
//           </button>
//         </div>

//         {/* 🔹 Navigation Links */}
//         <nav className="space-y-1">
//           {links.map(({ href, label, icon }) => (
//             <Link
//               key={href}
//               href={href}
//               className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${
//                 pathname === href
//                   ? "bg-blue-600 text-white"
//                   : "text-gray-300 hover:bg-gray-800"
//               }`}
//             >
//               <span className="text-lg">{icon}</span>
//               {!isCollapsed && <span>{label}</span>}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* 🔹 Bottom: Logout */}
//       {/* {user && (
//         <div className="mt-10 px-2">
//           <button
//             onClick={handleLogout}
//             className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 text-white py-2 rounded-md transition font-medium text-sm"
//           >
//             <FaSignOutAlt className="text-base" />
//             {!isCollapsed && "Logout"}
//           </button>
//         </div>
//       )} */}
//     </aside>
//   );
// }



////////////////


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaBars, FaSignOutAlt } from "react-icons/fa";
import {
  MdDashboard,
  MdPeople,
  MdOutlineAnnouncement,
  MdOutlineAssessment,
} from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { PiExam } from "react-icons/pi";
import { MdCreditScore } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Fetch user info (to get role)
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

  //  Auto-collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const handleLogout = async () => {
  //   try {
  //     await fetch("http://localhost:4000/api/auth/logout", {
  //       method: "POST",
  //       credentials: "include",
  //     });
  //     setUser(null);
  //     window.dispatchEvent(new Event("authChanged"));
  //     router.push("/login");
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //   }
  // };

  // Define links based on role
  const principalLinks = [
    { label: "Dashboard", href: "/principalDashboard/dashboard", icon: <MdDashboard /> },
    { label: "Manage Teachers", href: "/principalDashboard/manageTeachers", icon: <HiUserGroup /> },
    { label: "Manage Students", href: "/principalDashboard/manageStudents", icon: <MdPeople /> },
        { label: "Student Results", href: "/principal/results", icon: <MdOutlineAssessment /> },
    { label: "Announcements", href: "/principalDashboard/principalAnnouncements", icon: <MdOutlineAnnouncement /> },
  ];

  const teacherLinks = [
    { label: "Dashboard", href: "/teacherDashboard/dashboard", icon: <MdDashboard /> },
    { label: "Announcements", href: "/teacherDashboard/viewAnnouncements", icon: <MdOutlineAnnouncement /> },
    { label: "Manage Student", href: "/teacherDashboard/manageStudent", icon: <MdPeople /> },
    { label: "Create Test", href: "/teacherDashboard/createTest", icon: <PiExam />},
    { label: "Result", href: "/teacherDashboard/result", icon: <TbReportAnalytics />},
  ];

  const studentLinks = [
    { label: "Dashboard", href: "/studentDashboard/dashboard", icon: <MdDashboard /> },
    { label: "Announcements", href: "/studentDashboard/viewAnnouncement", icon: <MdOutlineAnnouncement /> },
    { label: "Show Tests", href: "/studentDashboard/showTest", icon: <PiExam /> },
    { label: "View Results", href: "/studentDashboard/viewResult", icon: <MdCreditScore /> },
   
  ];

  

  const links =
    user?.role === "principal"
      ? principalLinks
      : user?.role === "student"
        ? studentLinks
        : teacherLinks;


  return (
    <aside
      className={`transition-all duration-300 ease-in-out min-h-screen flex flex-col justify-between py-6 px-4 shadow-lg
        ${isCollapsed ? "w-20" : "w-64"}
        bg-gray-200 text-black
        dark:bg-gray-900 dark:text-white
      `}
    >
      {/* Top Section: Brand + Toggle */}
      <div>
        <div className="flex justify-between items-center mb-8">
          {!isCollapsed && (
            <h2 className="text-xl font-bold tracking-wide text-black dark:text-white">
              {/* {user?.role === "teacher" ? "Teacher Panel" : "Principal Panel"} */}
              {user?.role === "teacher"
                ? "Teacher Panel"
                : user?.role === "student"
                  ? "Student Panel"
                  : "Principal Panel"}

            </h2>
          )}
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="text-black dark:text-white hover:text-blue-500 text-3xl"
            aria-label="Toggle Sidebar"
          >
            {/* <FaBars /> */}
            {isCollapsed ? <FaArrowAltCircleRight /> : <FaArrowAltCircleLeft />}
          </button>
        </div>

        {/* 🔹 Navigation Links */}
        <nav className="space-y-1">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition ${pathname === href
                  ? "bg-blue-600 text-white"
                  : "text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
            >
              <span className="text-lg">{icon}</span>
              {!isCollapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* 🔹 Bottom: Logout */}
      {/* {user && (
        <div className="mt-10 px-2">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 text-white py-2 rounded-md transition font-medium text-sm"
          >
            <FaSignOutAlt className="text-base" />
            {!isCollapsed && "Logout"}
          </button>
        </div>
      )} */}
    </aside>
  );
}


