

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
//       else if (data.role === "teacher") router.push("/teacherDashboard/dashboard");
//       else router.push("/studentDashboard");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
//       <div className="flex flex-col-reverse md:flex-row w-full max-w-5xl rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">

//         {/* Left Panel (Brand Info) */}
//         <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white w-1/2 p-10">
//           <h1 className="text-3xl font-bold mb-4">School Mock Test System</h1>
//           <p className="text-gray-300 text-base">
//             A secure and scalable platform for schools to manage mock examinations, track performance, and streamline academic assessments.
//           </p>
//         </div>

//         {/* Login Form */}
//         <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8 sm:p-10">
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Login to Your Account</h2>
//           <form onSubmit={handleLogin} className="space-y-5">

//             {/* Role Selection */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Role</label>
//               <select
//                 value={role}
//                 onChange={(e) => {
//                   setRole(e.target.value);
//                   setEmailOrRoll("");
//                 }}
//                 className="w-full p-2.5 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               >
//                 <option value="owner">Owner</option>
//                 <option value="principal">Principal</option>
//                 <option value="teacher">Teacher</option>
//                 <option value="student">Student</option>
//               </select>
//             </div>

//             {/* Email or Roll */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                 {role === "student" ? "Roll Number" : "Email"}
//               </label>
//               <input
//                 type={role === "student" ? "text" : "email"}
//                 placeholder={role === "student" ? "Enter Roll Number" : "Enter Email"}
//                 value={emailOrRoll}
//                 onChange={(e) => setEmailOrRoll(e.target.value)}
//                 required
//                 className="w-full p-2.5 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full p-2.5 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
//               />
//               <div className="text-right mt-2">
//                 <button
//                   type="button"
//                   onClick={() => router.push("/forgot-password")}
//                   className="text-sm text-blue-600 hover:underline focus:outline-none"
//                 >
//                   Forgot Password?
//                 </button>
//               </div>
//             </div>


//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 text-sm font-semibold rounded-md transition duration-200"
//             >
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState("owner");
  const [emailOrRoll, setEmailOrRoll] = useState("");
  const [password, setPassword] = useState(""); // this will store dob if student
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const payload =
        role === "student"
          ? { rollNumber: emailOrRoll, dob: password, role } // send dob instead of password
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
      else if (data.role === "principal")
        router.push("/principalDashboard/dashboard");
      else if (data.role === "teacher")
        router.push("/teacherDashboard/dashboard");
      else router.push("/studentDashboard/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="flex flex-col-reverse md:flex-row w-full max-w-5xl rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">

        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white w-1/2 p-10">
          <h1 className="text-3xl font-bold mb-4">School Mock Test System</h1>
          <p className="text-gray-300 text-base">
            A secure and scalable platform for schools to manage mock
            examinations, track performance, and streamline academic assessments.
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select Role
              </label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setEmailOrRoll("");
                  setPassword("");
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

            {/* Password or DOB */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {role === "student" ? "Date of Birth" : "Password"}
              </label>
              <input
                type={role === "student" ? "date" : "password"}
                placeholder={role === "student" ? "" : "Enter Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2.5 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {role !== "student" && (
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-sm text-blue-600 hover:underline focus:outline-none"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}
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
