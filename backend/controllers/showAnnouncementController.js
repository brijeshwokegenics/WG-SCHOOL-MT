const Announcement = require("../models/AnnouncementModel");
const TeacherModel = require("../models/TeacherModel");
const PrincipalModel = require("../models/PrincipalModel");
const StudentModel = require("../models/StudentModel");

exports.getAnnouncementsForUser = async (req, res) => {
  try {
    const userRole = req.user.role; // "principal" | "teacher" | "student"
    const userId = req.user.id;

    let schoolId;

    // Get school based on role
    if (userRole === "teacher") {
      const teacher = await TeacherModel.findById(userId).select("school role");
      if (!teacher) return res.status(404).json({ message: "Teacher not found" });
      schoolId = teacher.school;
    } else if (userRole === "principal") {
      const principal = await PrincipalModel.findById(userId).select("school role");
      if (!principal) return res.status(404).json({ message: "Principal not found" });
      schoolId = principal.school;
    } else if (userRole === "student") {
      const student = await StudentModel.findById(userId).select("school role");
      if (!student) return res.status(404).json({ message: "Student not found" });
      schoolId = student.school;
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!schoolId) {
      return res.status(400).json({ message: "School not found for this user" });
    }

    // Fetch announcements filtered by school and audience
    const announcements = await Announcement.find({
      school: schoolId,
      $or: [
        { audience: userRole },         // audience as string
        { audience: { $in: [userRole, "all"] } } // audience as array
      ]
    }).sort({ createdAt: -1 });

    res.json({ announcements });
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ message: "Server error" });
  }
};
