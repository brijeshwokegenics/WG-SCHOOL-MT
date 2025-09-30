const express = require("express");
const router = express.Router();
const TeacherModel= require("../models/TeacherModel");



const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");



const upload = multer({ dest: "uploads/" });


const authMiddleware = require("../middleware/authMiddleware");


//Upload & Save Teachers
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
          // Add createdBy from logged-in principal
          const teachersWithCreator = results.map((t) => ({
            ...t,
            createdBy: req.user.id, // coming from JWT
          }));

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


module.exports = router;