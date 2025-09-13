const express = require("express");
const { addTeacher } = require("../controllers/teacherController");
const { getAllTeachers } = require("../controllers/teacherController");
const teacherController = require("../controllers/teacherController"); 
const authMiddleware = require("../middleware/authMiddleware"); 

const router = express.Router();

// Owner adds a school
router.post("/add-teacher",authMiddleware(["principal"]), addTeacher);
router.get("/all-teachers",authMiddleware(["principal"]), getAllTeachers);

router.get("/:id",authMiddleware(["principal"]), teacherController.getTeacherById);
router.put("/:id",authMiddleware(["principal"]), teacherController.updateTeacher);
router.delete("/:id",authMiddleware(["principal"]), teacherController.deleteTeacher);


//export default router;
module.exports = router;
