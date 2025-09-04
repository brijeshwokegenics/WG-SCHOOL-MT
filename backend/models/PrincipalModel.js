//import mongoose from "mongoose";
const mongoose = require("mongoose");

const principalSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["owner", "principal", "teacher", "student"], required: true },
 // schoolCode: { type: String, required: true }, // link to school
}, { timestamps: true });

//export default mongoose.model("User", userSchema);
module.exports = mongoose.model("PrincipalModel", principalSchema);
