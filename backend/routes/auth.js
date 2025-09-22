
const express = require("express");
const {login, logout} = require("../controllers/authController");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");

// GET /api/auth - check if user is logged in
// This route checks for a valid JWT token in cookies and returns user info if valid
router.get("/", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: decoded }); // this could be { email, role } etc.
  } catch (err) {
    console.error("Invalid token", err);
    return res.status(401).json({ user: null });
  }
});

router.post("/login", login);

// Protect /ownerDashboard
router.get("/ownerDashboard", authMiddleware(["owner"]), (req, res) => {
  res.json({ message: "Welcome Owner!", user: req.user });
 // alert("owner dashboard accessed");
});

// Protect /principalDashboard/dashboard
router.get("/principalDashboard/dashboard", authMiddleware(["principal"]), (req, res) => {
  res.json({ message: "Welcome Principal!", user: req.user });
 // alert("principal dashboard accessed");
});

// Protect /teacherDashboard
router.get("/teacherDashboard", authMiddleware(["teacher"]), (req, res) => {
  res.json({ message: "Welcome Teacher!", user: req.user });
 // alert("teacher dashboard accessed");
});

router.post("/logout", logout);

module.exports = router;
//export default router;
