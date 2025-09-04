
const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  schoolCode: { type: String, unique: true, sparse: true }, // optional but unique
  address: String,
  city: String,
  state: String,
  pincode: String,
  phone: String,
  email: String,
}, { timestamps: true });

module.exports = mongoose.model("Schools", schoolSchema);
