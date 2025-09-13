

const express = require("express");
const { addSchool } = require("../controllers/schoolController");
const { getAllSchools } = require("../controllers/schoolController");
const schoolController = require("../controllers/schoolController");

const router = express.Router();

// Owner adds a school
router.post("/add-school", addSchool);
router.get("/all-schools", getAllSchools);

router.get("/:id", schoolController.getSchoolById);
router.put("/:id", schoolController.updateSchool);
router.delete("/:id", schoolController.deleteSchool);


//export default router;
module.exports = router;
