const express = require("express");
const router = express.Router();
const TeacherModel = require("../models/TeacherModel");
const PrincipalModel=require("../models/PrincipalModel");
const StudentModel=require("../models/StudentModel");


const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");




const upload = multer({ dest: "uploads/" });
const authMiddleware = require("../middleware/authMiddleware");

// Upload and Save Teachers csv
router.post(
  "/uploadTeacherCsv",
  authMiddleware(["principal"]),
  upload.single("file"),
  (req, res) => {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          const principal = await PrincipalModel.findById(req.user.id);
          // Map CSV data to match schema
          const teachersWithCreator = results.map((t) => ({
            fullName: t.fullName?.trim(),
            email: t.email?.trim().toLowerCase(),
            password: t.password?.trim(),
            phone: t.phone?.trim() || "",
            classLevel: t.classLevel?.toString().trim(), // must be string beacuse it is string in schema
            section: t.section?.trim().toUpperCase(),
            subject: t.subject?.trim(),
            createdBy: req.user.id,   // Principal ID
            school: principal.school,  // School ID from principal profile
          }));

          // Optional: log to check the mapped data
          console.log("Mapped CSV Data:", teachersWithCreator);

          await TeacherModel.insertMany(teachersWithCreator);

          fs.unlinkSync(req.file.path);

          res.json({
            message: "Teachers uploaded successfully!",
            count: teachersWithCreator.length,
          });
        } catch (error) {
          console.error("Error inserting teachers:", error);
          res.status(500).json({ error: "Failed to insert teachers" });
        }
      });
  }
);

////////////////////////


router.post(
  "/uploadStudentCsv",
  authMiddleware(["principal", "teacher"]),
  upload.single("file"),
  (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        let school = null; // use let so we can assign later

        try {
          const role = req.user.role;
          console.log("Inside upload CSV backend route, role:", role);

          // Get school ID depending on role
          if (role === "principal") {
            const principal = await PrincipalModel.findById(req.user.id);
            if (!principal) return res.status(404).json({ error: "Principal not found" });
            if (!principal.school)
              return res.status(400).json({ error: "Principal does not have a school assigned" });
            school = principal.school;
          } else if (role === "teacher") {
            const teacher = await TeacherModel.findById(req.user.id);
            if (!teacher) return res.status(404).json({ error: "Teacher not found" });
            if (!teacher.school)
              return res.status(400).json({ error: "Teacher does not have a school assigned" });
            school = teacher.school;
          }

          // Map CSV rows to student objects
          const studentsWithMeta = results.map((s) => ({
            fullName: s.fullName?.trim() || "Unknown",
            rollNumber: s.rollNumber?.trim() || "",
            dob: s.dob ? new Date(s.dob) : null,
            classLevel: s.classLevel?.toString().trim() || "",
            section: s.section?.trim().toUpperCase() || "",
            school: school,
          }));

          // Insert all students at once
          await StudentModel.insertMany(studentsWithMeta);

          // Delete CSV file after processing
          fs.unlinkSync(req.file.path);

          res.json({
            message: "Students uploaded successfully!",
            count: studentsWithMeta.length,
          });
        } catch (error) {
          console.error("Error inserting students:", error);
          res.status(500).json({ error: "Failed to insert students" });
        }
      })
      .on("error", (err) => {
        console.error("CSV parse error:", err);
        res.status(500).json({ error: "Failed to parse CSV" });
      });
  }
);

module.exports = router;
