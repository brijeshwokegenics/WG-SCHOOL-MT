
const express = require("express");
const {login, logout} = require("../controllers/authController");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const nodemailer= require("nodemailer");
const User = require("../models/User");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');



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

// Protect /studentDashboard
router.get("/studentDashboard", authMiddleware(["student"]), (req, res) => {
  res.json({ message: "Welcome student!", user: req.user });
 // alert("student dashboard accessed");
});


router.post("/logout", logout);



// Forgot Password - send reset link
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists
      return res.status(200).send('If email exists, link sent');
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    //Create a temporary Ethereal account
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

//using gmail transporter
    //  const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER, // Gmail address
    //     pass: process.env.EMAIL_PASS  // App password from Google
    //   }
    // });


    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    const info = await transporter.sendMail({
      from: '"My App" <no-reply@example.com>',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click here to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    res.status(200).send('Reset link sent (check console for preview URL)');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Reset Password - verify token and update password
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



module.exports = router;
//export default router;
