// controllers/teacherDetailsController.js
const TeacherModel = require("../models/TeacherModel");

exports.getTeacherDetails = async (req, res) => {
  // GET /api/teacher/me → teacher + school details
  try {
    const teacher = await TeacherModel.findById(req.user.id).populate("school");
    console.log("get teacher details called");
    console.log(teacher);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({
      teacher: {
        name: teacher.fullName,
        email: teacher.email,
        phone: teacher.phone || "N/A",
        subject: teacher.subject || "N/A",
        classLevel: teacher.classLevel || "N/A",
         section: teacher.section || "N/A",
        schoolName: teacher.school?.schoolName || "N/A",
        schoolCode: teacher.school?.schoolCode || "N/A",
        schoolLogo: teacher.school?.schoolLogo || "N/A",
        city: teacher.school?.city || "N/A",
        state: teacher.school?.state || "N/A",
      },
    });
  } catch (err) {
    console.error("Error fetching teacher:", err);
    res.status(500).json({ message: "Server error" });
  }
};
