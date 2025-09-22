"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [studentForm, setStudentForm] = useState({
    fullName: "",
    email: "",
    rollNo: "",
    classLevel: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch teacher info & announcements
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherRes = await axios.get("/api/teacher/me", {
          withCredentials: true,
        });
        setTeacher(teacherRes.data);

        const annRes = await axios.get("/api/announcements", {
          withCredentials: true,
        });
        setAnnouncements(annRes.data || []);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Handle Add Student form submit
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/students/add", studentForm, {
        withCredentials: true,
      });
      alert(res.data.message || "Student added!");
      setStudentForm({ fullName: "", email: "", rollNo: "", classLevel: "" });
    } catch (err) {
      console.error("Error adding student:", err);
      alert(err.response?.data?.message || "Failed to add student");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* 🧑‍🏫 Teacher Info */}
      <section className="mb-8 bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
        {teacher ? (
          <div className="space-y-2">
            <p><strong>Name:</strong> {teacher.fullName}</p>
            <p><strong>Email:</strong> {teacher.email}</p>
            <p><strong>Phone:</strong> {teacher.phone}</p>
            <p><strong>Class Level:</strong> {teacher.classLevel}</p>
            <p><strong>Subject:</strong> {teacher.subject}</p>
          </div>
        ) : (
          <p>No teacher data found.</p>
        )}
      </section>

      {/* 📢 Announcements */}
      <section className="mb-8 bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Principal's Announcements</h2>
        {announcements.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {announcements.map((a) => (
              <li key={a._id}>
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-gray-600">{a.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(a.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No announcements yet.</p>
        )}
      </section>

      {/* ➕ Add Student Form */}
      <section className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Add Student</h2>
        <form onSubmit={handleAddStudent} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={studentForm.fullName}
              onChange={(e) =>
                setStudentForm({ ...studentForm, fullName: e.target.value })
              }
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={studentForm.email}
              onChange={(e) =>
                setStudentForm({ ...studentForm, email: e.target.value })
              }
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Roll No</label>
            <input
              type="text"
              value={studentForm.rollNo}
              onChange={(e) =>
                setStudentForm({ ...studentForm, rollNo: e.target.value })
              }
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Class Level</label>
            <select
              value={studentForm.classLevel}
              onChange={(e) =>
                setStudentForm({ ...studentForm, classLevel: e.target.value })
              }
              required
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select Class Level</option>
              <option value="Primary(1-5)">Primary (1-5)</option>
              <option value="Middle(6-8)">Middle (6-8)</option>
              <option value="Secondary(9-10)">Secondary (9-10)</option>
              <option value="Senior Secondary(11-12)">
                Senior Secondary (11-12)
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Student
          </button>
        </form>
      </section>
    </div>
  );
}
