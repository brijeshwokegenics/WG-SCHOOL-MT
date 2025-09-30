
const express = require("express");
const router = express.Router();


const { getAnnouncementsForUser } = require("../controllers/showAnnouncementController"); // 
const authMiddleware = require("../middleware/authMiddleware");


//show announcement on teacher and student dashboard
router.get("/showAnnouncementToUser",  authMiddleware(["teacher", "student"]),getAnnouncementsForUser);

module.exports = router;
