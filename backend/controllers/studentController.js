const Student = require("../models/StudentModel");
const Teacher = require("../models/TeacherModel");
const Principal = require("../models/PrincipalModel"); // if you have a Principal model

exports.addStudent = async (req, res) => {
  try {
    const { fullName, rollNumber, dob, classLevel, section } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Basic validation
    if (!fullName || !rollNumber || !dob || !classLevel) {
      return res.status(400).json({
        message: "Full name, roll number, date of birth, and class level are required.",
      });
    }

    // Determine schoolId based on user role
    let schoolId = null;

    if (userRole === "principal") {
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
      return res.status(400).json({ message: "No school linked to this user." });
    }

    // Check for existing student in the same class and section
    const existingStudent = await Student.findOne({
      rollNumber,
      classLevel,
      section: section?.toUpperCase() || null,
      school: schoolId,
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student with this roll number already exists in this class and section.",
      });
    }

    // Create new student
    const newStudent = new Student({
      fullName,
      rollNumber,
      dob,
      classLevel,
      section: section?.toUpperCase() || null,
      school: schoolId,
      createdBy: userId,
    });

    await newStudent.save();

    const studentData = newStudent.toObject();
    delete studentData.password; // In case password is added later

    res.status(201).json({
      message: "Student added successfully",
      student: studentData,
    });

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

    } 


    // else if (userRole === "teacher") {
    //   // Fetch teacher record to get school
    //   const teacher = await Teacher.findById(userId).select("school");
    //   if (!teacher) {
    //     return res.status(404).json({ message: "Teacher not found" });
    //   }
    //   schoolId = teacher.school;

    // }


    else if (userRole === "teacher") {
  // Fetch teacher's assigned class, section, and school
  const teacher = await Teacher.findById(userId).select("school classLevel section");

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  const schoolId = teacher.school;
  const classAssigned = teacher.classLevel;
  console.log("class assigned is=>", classAssigned);
  const sectionAssigned = teacher.section; // may be undefined

  // Build the filter query
  const studentFilter = {
    school: schoolId,
    classLevel: classAssigned,
  };

  // Add section to filter if teacher has one assigned
  if (sectionAssigned) {
    studentFilter.section = sectionAssigned;
  }

  // Fetch students based on filters
  const students = await Student.find(studentFilter);
  console.log("filter student for teachers panel are:", students)

  return res.status(200).json({ students });
}

    
    else {
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

