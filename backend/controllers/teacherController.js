const Teacher = require("../models/TeacherModel");
const bcrypt = require("bcryptjs");
const Principal = require("../models/PrincipalModel");

// Allowed class levels
const VALID_CLASS_LEVELS = [
  "Primary(1-5)",
  "Middle(6-8)",
  "Secondary(9-10)",
  "Senior(11-12)",
];

// ✅ Add a new teacher
exports.addTeacher = async (req, res) => {
  try {
    const { fullName, email, password, phone, classLevel, subject } = req.body;

    console.log("Req.user:", req.user);

    // ✅ Ensure principal ID exists
    if (!req.user?.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Principal ID missing" });
    }

    // ✅ Validate class level
    if (!VALID_CLASS_LEVELS.includes(classLevel)) {
      return res.status(400).json({
        message: `Invalid class level. Must be one of: ${VALID_CLASS_LEVELS.join(
          ", "
        )}`,
      });
    }

    if (!subject || subject.trim() === "") {
      return res.status(400).json({ message: "Subject is required" });
    }

    // ✅ Fetch the principal
    const principal = await Principal.findById(req.user.id);
    if (!principal) {
      return res.status(404).json({ message: "Principal not found" });
    }

    // ✅ Check for duplicate email
    const existing = await Teacher.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create and save teacher
    const newTeacher = new Teacher({
      fullName,
      email,
      password: hashedPassword,
      phone,
      createdBy: req.user.id,
     
      classLevel,
      subject,
    });

    const savedTeacher = await newTeacher.save();
    res.status(201).json({
      message: "Teacher added successfully",
      teacher: savedTeacher,
    });
  } catch (error) {
    console.error("Error adding teacher:", error);
    res.status(500).json({
      message: "Error adding teacher",
      error: error.message,
    });
  }
};

// ✅ Get all teachers for logged-in principal
exports.getAllTeachers = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Principal ID missing" });
    }

    const teachers = await Teacher.find({ createdBy: req.user.id })
    res.json(teachers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching teachers", error: error.message });
  }
};

// ✅ Get one teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher)
      return res.status(404).json({ message: "Teacher not found" });

    res.json(teacher);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching teacher", error: error.message });
  }
};

// ✅ Update teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, password, classLevel, subject } = req.body;

    const updateData = { fullName, email, phone, subject };

    // Validate class level if provided
    if (classLevel) {
      if (!VALID_CLASS_LEVELS.includes(classLevel)) {
        return res.status(400).json({
          message: `Invalid class level. Must be one of: ${VALID_CLASS_LEVELS.join(
            ", "
          )}`,
        });
      }
      updateData.classLevel = classLevel;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating teacher", error: error.message });
  }
};

// ✅ Delete teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTeacher = await Teacher.findByIdAndDelete(id);
    if (!deletedTeacher)
      return res.status(404).json({ message: "Teacher not found" });

    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting teacher", error: error.message });
  }
};
