const express = require("express");
const router = express.Router();


const announcementController=require("../controllers/announcementController");
const { addAnnouncement, getAllAnnouncement} = require("../controllers/announcementController"); 
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add-announcement",authMiddleware(["principal"]),addAnnouncement);
router.get("/all-announcement",authMiddleware(["principal"]), getAllAnnouncement);
router.get("/:id",authMiddleware(["principal"]), announcementController.getAnnouncementById);
router.delete("/:id",authMiddleware(["principal"]), announcementController.deleteAnnouncement);







module.exports = router;