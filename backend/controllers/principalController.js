const express = require("express");
const router = express.Router();
const PrincipalModel = require("../models/PrincipalModel");

exports.getPrincipalDetails = async (req, res) => {
// GET /api/principal/me → principal + school details

  try {
    const principal = await PrincipalModel.findById(req.user.id).populate("school");
    console.log("get principal details called");
    console.log(principal);

    if (!principal) {
      return res.status(404).json({ message: "Principal not found" });
    }

    res.json({
      principal: {
        name: principal.fullName,
        email: principal.email,
        schoolName: principal.school?.schoolName || "N/A",
        schoolCode: principal.school?.schoolCode || "N/A",
        city: principal.school?.city || "N/A",
        state: principal.school?.state || "N/A",
      },
    });
    
  } catch (err) {
    console.error("Error fetching principal:", err);
    res.status(500).json({ message: "Server error" });
  }
}

