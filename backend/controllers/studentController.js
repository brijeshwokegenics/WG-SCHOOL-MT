const Student = require("../models/StudentModel");

//using dob as password in the frontend
//we can hash dob in future
//const bcrypt = require("bcryptjs"); // only if you want to hash passwords

// exports.addStudent = async (req, res) => {
//   try {
//     const { fullName, rollNumber, phone, dob, gradeOrClass, school } = req.body;

//     // Basic validation
//     if (!fullName || !rollNumber || !dob) {
//       return res.status(400).json({ message: "Full name, roll number, and date of birth are required." });
//     }

//     // Optional: check if a student with same roll number already exists in the same school
//     if (school) {
//       const existingStudent = await Student.findOne({ rollNumber, school });
//       if (existingStudent) {
//         return res.status(400).json({ message: "Student with this roll number already exists in this school." });
//       }
//     }

//     // Optional: hash password if provided
//     // let hashedPassword = undefined;
//     // if (password) {
//     //   hashedPassword = await bcrypt.hash(password, 10);
//     // }

//     // Create new student
//     const newStudent = new Student({
//       fullName,
//       rollNumber,
//       phone,
//       dob,
//       gradeOrClass,
//       school,
//     });

//     await newStudent.save();

//     // Respond with success (omit password)
//     const { ...studentData } = newStudent.toObject();
//     res.status(201).json({ message: "Student added successfully", student: studentData });
//   } catch (err) {
//     console.error("Error adding student:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


//const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const Principal = require("../models/PrincipalModel"); // if you have a Principal model

exports.addStudent = async (req, res) => {
  try {
    const { fullName, rollNumber, phone, dob, gradeOrClass } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Basic validation
    if (!fullName || !rollNumber || !dob) {
      return res.status(400).json({ message: "Full name, roll number, and date of birth are required." });
    }

    // Figure out schoolId based on role
    let schoolId = null;

    if (userRole === "principal") {
      // fetch principal record
      const principal = await Principal.findById(userId).select("school");
      if (!principal) {
        return res.status(404).json({ message: "Principal not found" });
      }
      schoolId = principal.school;

    } else if (userRole === "teacher") {
      const teacher = await Teacher.findById(userId).select("school");
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      schoolId = teacher.school;
    } else {
      return res.status(403).json({ message: "Unauthorized role" });
    }

    if (!schoolId) {
      return res.status(400).json({ message: "No school linked to this user" });
    }

    // Check duplicate student in same school
    const existingStudent = await Student.findOne({ rollNumber, school: schoolId });
    if (existingStudent) {
      return res.status(400).json({ message: "Student with this roll number already exists in this school." });
    }

    // Create new student
    const newStudent = new Student({
      fullName,
      rollNumber,
      phone,
      dob,
      gradeOrClass,
      school: schoolId,
      createdBy: userId,   // track who created (principal/teacher)
    });

    await newStudent.save();

    // Remove sensitive fields if any (e.g., password later)
    const { password, ...studentData } = newStudent.toObject();

    res.status(201).json({ message: "Student added successfully", student: studentData });

  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Server error" });
  }
};


///get all student
//  Get all student for logged-in principal

// exports.getAllStudent = async (req, res) => {
//   try {
//     if (!req.user?.id) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: Principal ID missing" });
//     }

//     const student = await Student.find({ createdBy: req.user.id })
//     console.log("studentssss",student)
//     res.json(student);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching students", error: error.message });
//   }
// };


exports.getAllStudent = async (req, res) => {
  try {
    const userRole = req.user.role;  // "principal" | "teacher"
    const userId = req.user.id;

    let schoolId;

    if (userRole === "principal") {
      // Fetch principal record to get school
      const principal = await Principal.findById(userId).select("school");
      if (!principal) {
        return res.status(404).json({ message: "Principal not found" });
      }
      schoolId = principal.school;

    } else if (userRole === "teacher") {
      // Fetch teacher record to get school
      const teacher = await Teacher.findById(userId).select("school");
      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }
      schoolId = teacher.school;

    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!schoolId) {
      return res.status(400).json({ message: "School not found for this user" });
    }

    // Fetch all students belonging to this school
    //made changes here
    //filtering by schoolId not by createdBy
    const students = await Student.find({ school: schoolId }).sort({ createdAt: -1 });

    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
};

//  Get one student by ID
// exports.getStudentById = async (req, res) => {
//   try {
//     const teacher = await Teacher.findById(req.params.id);
//     if (!teacher)
//       return res.status(404).json({ message: "Teacher not found" });

//     res.json(teacher);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error fetching teacher", error: error.message });
//   }
// };

