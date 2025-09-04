// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
//         console.log(req.body);

//         // Check user
//         const user = await User.findOne({ email });
//         console.log("owner email is:" + user);
//         if (user) console.log("email matched");
//         if (!user) return res.status(400).json({ message: "User not found" });

//         // Check role
//         if (user.role !== role) {
//             return res.status(400).json({ message: "Role mismatch. Please select correct role." });

//         }

//         if (user.role === role) {
//             console.log("role matched" + user.role + role);

//         }

//         // Check password
//         const isMatch = bcrypt.compareSync(password, user.password);
//         console.log("pass check" + password + "space" + user.password);

//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//         // Create token
//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         // ✅ Set JWT in HttpOnly cookie
//         res.cookie("token", token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production", // true in production
//             sameSite: "strict",
//             maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//         });

//         // Send response
//         res.status(200).json({
//            // token,        //no need to send token in response if using HttpOnly cookie    
//             role: user.role,
//             user: {
//                 id: user._id,
//                 email: user.email
//             }
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// module.exports = { login };

///////////////////////

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
