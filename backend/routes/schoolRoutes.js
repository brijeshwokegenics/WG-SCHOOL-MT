

const express = require("express");
const { addSchool } = require("../controller/schoolController");
const { getAllSchools } = require("../controller/schoolController");
const schoolController = require("../controller/schoolController");

const router = express.Router();

// Owner adds a school
router.post("/add-school", addSchool);
router.get("/all-schools", getAllSchools);

router.get("/:id", schoolController.getSchoolById);
router.put("/:id", schoolController.updateSchool);
router.delete("/:id", schoolController.deleteSchool);


//export default router;
module.exports = router;
