const express = require("express");
const router = express.Router();

const {createTest, getAllTest, getTestById, updateTest, deleteTest} = require("../controllers/testController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/create-test",authMiddleware(["teacher"]),createTest);

router.get("/all-test",authMiddleware(["teacher"]),getAllTest);

router.get("/:id",authMiddleware(["teacher"]), getTestById);
router.put("/:id",authMiddleware(["teacher"]), updateTest);
router.delete("/:id",authMiddleware(["teacher"]), deleteTest);



module.exports = router;