// // ForgotPassword.jsx
// "use client";
// import { useState } from "react";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:4000/api/auth/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       if (res.ok) {
//         setMessage("If this email exists, a reset link has been sent!");
//       } else {
//         setMessage("Something went wrong. Try again.");
//       }
//     } catch (err) {
//       setMessage("Server error. Try later.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-10">
//       <h2 className="text-xl font-bold">Forgot Password</h2>
//       <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Send Reset Link
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-600">{message}</p>}
//     </div>
//   );
// }


// ForgotPassword.jsx
"use client";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage("If this email exists, a reset link has been sent!");
      } else {
        setMessage("Something went wrong. Try again.");
      }
    } catch (err) {
      setMessage("Server error. Try later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p
            className={`mt-5 text-center text-sm font-medium ${
              message.toLowerCase().includes("error") ||
              message.toLowerCase().includes("wrong")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

