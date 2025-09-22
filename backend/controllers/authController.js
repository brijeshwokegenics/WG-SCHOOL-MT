
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PrincipalModel= require("../models/PrincipalModel");
const TeacherModel= require("../models/TeacherModel");


////////////////////
//login according to roles
exports.login = async (req, res) => {

    const { email, password, role } = req.body;
    if (role === "principal") {
        try {
            // const { email, password, role } = req.body;

            // ✅ Check if user exists
            const principalModel= await PrincipalModel.findOne({ email, role });
            if (!principalModel) return res.status(400).json({ message: "Invalid credentials" });

            // ✅ Compare password
            const isMatch = await bcrypt.compare(password, principalModel.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

            // ✅ Generate JWT
            const token = jwt.sign(
                { id: principalModel._id, role: principalModel.role },
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
                role: principalModel.role,
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }


////////////////////////////////////
            else if (role === "owner") {
    try {
        // const { email, password, role } = req.body;

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
}

else if (role === "teacher") {
  try {
    // ✅ Find teacher by email and role
    const teacher = await TeacherModel.findOne({ email, role });
    if (!teacher) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: teacher._id, role: teacher.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Send cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true if HTTPS
      sameSite: "lax",
    });

    // ✅ Success response
    res.status(200).json({
      message: "Login successful",
      role: teacher.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

}


////////////////////




//logout controller
exports.logout = (req, res) => {
    // Clear cookies by setting Max-Age=0 (or Expires in the past)
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only HTTPS in prod
        sameSite: "lax",
        path: "/", // make sure matches the path where cookie was set
    });

    res.clearCookie("user", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully" });
}