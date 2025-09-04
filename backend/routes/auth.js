
const express = require("express");
const {login} = require("../controller/authController");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", login);

// Protect /ownerDashboard
router.get("/ownerDashboard", authMiddleware(["owner"]), (req, res) => {
  res.json({ message: "Welcome Owner!", user: req.user });
 // alert("owner dashboard accessed");
});

module.exports = router;
//export default router;
