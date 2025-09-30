const express = require("express");
const {addStudent, getAllStudent }=require("../controllers/studentController");
const authMiddleware = require("../middleware/authMiddleware"); 

const router = express.Router();

// principal add teacher
router.post("/add-student",authMiddleware(["principal", "teacher"]), addStudent);

router.get("/all-student",authMiddleware(["principal", "teacher"]), getAllStudent);

//authMiddleware(["teacher", "student"])

//router.get("/:id",authMiddleware(["principal"]), teacherController.getTeacherById);
//router.put("/:id",authMiddleware(["principal"]), teacherController.updateTeacher);
//router.delete("/:id",authMiddleware(["principal"]), teacherController.deleteTeacher);




//export default router;
module.exports = router;
