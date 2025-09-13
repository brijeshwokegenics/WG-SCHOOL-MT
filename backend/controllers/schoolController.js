

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
      school: savedSchool._id, // ✅ link here
     // schoolCode: schoolCode, // link principal to the school
    });
    await principal.save();

    res.status(201).json({ message: "School and principal created successfully", school: savedSchool });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating school", error: error.message });
  }
};


// get all schools with principal details-> displayed on owner dashboard
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find().populate("principal", "fullName email").lean();

    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schools", error: error.message });
  }
};

//get school by id
// controllers/schoolController.js

exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id).populate("principal");
    if (!school) return res.status(404).json({ message: "School not found" });

    res.json(school);
  } catch (error) {
    res.status(500).json({ message: "Error fetching school", error: error.message });
  }
};

//update school details
exports.updateSchool = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedSchool = await School.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSchool) return res.status(404).json({ message: "School not found" });

    res.json({ message: "School updated successfully", school: updatedSchool });
  } catch (error) {
    res.status(500).json({ message: "Error updating school", error: error.message });
  }
};

//delete school
exports.deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSchool = await School.findByIdAndDelete(id);
    if (!deletedSchool) return res.status(404).json({ message: "School not found" });

    // Optionally, delete principal linked to school
    await PrincipalModel.deleteOne({ school: id });

    res.json({ message: "School deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting school", error: error.message });
  }
};
