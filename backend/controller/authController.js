
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // ✅ Check if user exists
        const user = await User.findOne({ email, role });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // ✅ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // ✅ Generate JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true if HTTPS
            sameSite: "lax",
        });

        res.status(200).json({
            message: "Login successful",
            role: user.role,
        });
    }
 catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    };
