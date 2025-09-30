const express = require("express");
const router = express.Router();

const {getTeacherDetails} = require("../controllers/teacherDetailsController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me",authMiddleware(["teacher"]),getTeacherDetails);

module.exports = router;