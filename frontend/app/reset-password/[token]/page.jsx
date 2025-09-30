// "use client";
// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// export default function ResetPasswordPage() {
//   const { token } = useParams();
//   const router = useRouter();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match");
//       return;
//     }
//     const res = await fetch(`http://localhost:4000/api/auth/reset-password/${token}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ password }),
//     });
//     const data = await res.json();
//     if (data.success) {
//       setMessage("Password reset successful!");
//       setTimeout(() => router.push("/login"), 2000);
//     } else {
//       setMessage(data.message || "Failed to reset password");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center mt-10">
//       <h2 className="text-xl font-bold">Reset Password</h2>
//       <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="border p-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Reset Password
//         </button>
//       </form>
//       {message && <p className="mt-4 text-green-600">{message}</p>}
//     </div>
//   );
// }

///////////////////////


"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    const res = await fetch(`http://localhost:4000/api/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Password reset successful!");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setMessage(data.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Reset Password</h2>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition-colors duration-200 text-white font-semibold py-2 rounded-md"
          >
            Reset Password
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
