//teacherDashboard/layout.jsx
import Sidebar from "@/components/Sidebar";

export default function TeacherLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 border-l-[1px] border-l-gray-300 dark:border-l-gray-600">
        {children}
      </main>
    </div>
  );
}

// "use client"; // Important for stateful layout components

// import { useState } from "react";
// import Sidebar from "@/components/Sidebar";

// export default function TeacherLayout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);

  
//   const mainMargin = collapsed ? "ml-16" : "ml-64";

//   return (
//     <div className="pt-16 flex">
//       {/* Fixed Sidebar */}
//       <div
//         className={`fixed top-16 left-0 h-[calc(100vh-4rem)] border-r border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 z-10 transition-all duration-300`}
//       >
//         <Sidebar collapsed={collapsed} toggleCollapse={() => setCollapsed(!collapsed)} />
//       </div>

//       {/* Main Content */}
//       <main
//         className={`transition-all duration-300 ${mainMargin} w-full flex-1 h-[calc(100vh-4rem)] bg-gray-50`}
//       >
//         {children}
//       </main>
//     </div>
//   );
// }

