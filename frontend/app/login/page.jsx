"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState("owner");
  const [emailOrRoll, setEmailOrRoll] = useState(""); // Can be email or roll
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
        credentials: "include", // ✅ Send/receive cookies
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();

      // Redirect to dashboard
      if (data.role === "owner") router.push("/ownerDashboard");
      else if (data.role === "principal") router.push("/principalDashboard");
      else if (data.role === "teacher") router.push("/teacherDashboard");
      else router.push("/studentDashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-6 w-full max-w-md bg-white shadow-md rounded-lg"
      >
        {/* Role Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Role</label>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setEmailOrRoll(""); // reset input on role change
            }}
            className="w-full p-2 border rounded"
          >
            <option value="owner">Owner</option>
            <option value="principal">Principal</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Conditional Input */}
        {role === "student" ? (
          <input
            type="text"
            placeholder="Roll Number"
            value={emailOrRoll}
            onChange={(e) => setEmailOrRoll(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />
        ) : (
          <input
            type="email"
            placeholder="Email"
            value={emailOrRoll}
            onChange={(e) => setEmailOrRoll(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
            required
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
