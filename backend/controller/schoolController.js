

const School = require("../models/Schools");
const PrincipalModel = require("../models/PrincipalModel");
const bcrypt = require("bcryptjs");



//ading schools
exports.addSchool = async (req, res) => {
  try {
    const {
      schoolName,
      schoolCode,
      address,
      city,
      state,
      pincode,
      phone,
      email,
      principalName,
      principalEmail,
      principalPassword,
    } = req.body;

    // 1. Create School
    const newSchool = new School({
      schoolName,
      schoolCode,
      address,
      city,
      state,
      pincode,
      phone,
      email,
    });
    const savedSchool = await newSchool.save();

    // 2. Hash principal password
    const hashedPassword = await bcrypt.hash(principalPassword, 10);

    // 3. Create Principal user
    const principal = new PrincipalModel({
      fullName: principalName,
      email: principalEmail,
      password: hashedPassword,
      role: "principal",
     // schoolCode: schoolCode, // link principal to the school
    });
    await principal.save();

    res.status(201).json({ message: "School and principal created successfully", school: savedSchool });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating school", error: error.message });
  }
};


//viewing schools

exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    console.log("Fetched schools:", schools);
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schools", error: error.message });
  }
};
