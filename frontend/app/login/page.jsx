// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [role, setRole] = useState("owner");
//   const [emailOrRoll, setEmailOrRoll] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const payload =
//         role === "student"
//           ? { rollNumber: emailOrRoll, password, role }
//           : { email: emailOrRoll, password, role };

//       const res = await fetch("http://localhost:4000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Login failed");
//       const data = await res.json();

//       window.dispatchEvent(new Event("authChanged"));

//       if (data.role === "owner") router.push("/ownerDashboard");
//       else if (data.role === "principal") router.push("/principalDashboard/dashboard");
//       else if (data.role === "teacher") router.push("/teacherDashboard");
//       else router.push("/studentDashboard");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col md:flex-row bg-gray-50">
//       {/* Left Panel (hidden on small screens) */}
//       <div className="hidden md:flex md:w-1/2 bg-gray-900 text-white items-center justify-center p-8 lg:p-12">
//         <div className="max-w-md">
//           <h1 className="text-3xl lg:text-4xl font-semibold mb-4 leading-snug">
//             School Mock Test <br /> Management System
//           </h1>
//           <p className="text-gray-300 text-base lg:text-lg">
//             A secure and scalable platform for schools to manage mock examinations, track performance, and streamline academic assessments.
//           </p>
//         </div>
//       </div>

//       {/* Login Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-white">
//         <form
//           onSubmit={handleLogin}
//           className="w-full max-w-md bg-white border border-gray-200 p-6 sm:p-8 shadow-sm rounded-md"
//         >
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             Login to Your Account
//           </h2>

//           {/* Role Selection */}
//           <div className="mb-4">
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Select Role
//             </label>
//             <select
//               value={role}
//               onChange={(e) => {
//                 setRole(e.target.value);
//                 setEmailOrRoll("");
//               }}
//               className="w-full p-2.5 border border-gray-300 focus:ring-gray-800 focus:border-gray-800 rounded-sm text-sm"
//             >
//               <option value="owner">Owner</option>
//               <option value="principal">Principal</option>
//               <option value="teacher">Teacher</option>
//               <option value="student">Student</option>
//             </select>
//           </div>

//           {/* Email / Roll Input */}
//           <div className="mb-4">
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               {role === "student" ? "Roll Number" : "Email"}
//             </label>
//             <input
//               type={role === "student" ? "text" : "email"}
//               placeholder={role === "student" ? "Enter Roll Number" : "Enter Email"}
//               value={emailOrRoll}
//               onChange={(e) => setEmailOrRoll(e.target.value)}
//               className="w-full p-2.5 border border-gray-300 focus:ring-gray-800 focus:border-gray-800 rounded-sm text-sm"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-6">
//             <label className="block mb-1 text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2.5 border border-gray-300 focus:ring-gray-800 focus:border-gray-800 rounded-sm text-sm"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gray-900 text-white py-2.5 text-sm font-medium hover:bg-gray-800 transition rounded-sm"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
//////////////

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState("owner");
  const [emailOrRoll, setEmailOrRoll] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const payload =
        role === "student"
          ? { rollNumber: emailOrRoll, password, role }
          : { email: emailOrRoll, password, role };

      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();

      window.dispatchEvent(new Event("authChanged"));

      if (data.role === "owner") router.push("/ownerDashboard");
      else if (data.role === "principal") router.push("/principalDashboard/dashboard");
      else if (data.role === "teacher") router.push("/teacherDashboard");
      else router.push("/studentDashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-5xl rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        
        {/* Left Panel (Brand Info) */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white w-1/2 p-10">
          <h1 className="text-3xl font-bold mb-4">School Mock Test System</h1>
          <p className="text-gray-300 text-base">
            A secure and scalable platform for schools to manage mock examinations, track performance, and streamline academic assessments.
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Login to Your Account</h2>
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Role</label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setEmailOrRoll("");
                }}
                className="w-full p-2.5 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="owner">Owner</option>
                <option value="principal">Principal</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>

            {/* Email or Roll */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {role === "student" ? "Roll Number" : "Email"}
              </label>
              <input
                type={role === "student" ? "text" : "email"}
                placeholder={role === "student" ? "Enter Roll Number" : "Enter Email"}
                value={emailOrRoll}
                onChange={(e) => setEmailOrRoll(e.target.value)}
                required
                className="w-full p-2.5 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2.5 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 text-sm font-semibold rounded-md transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
