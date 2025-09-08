
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

// Make a "virtual" relationship for populate
/////////////////////////
schoolSchema.virtual("principal", {
  ref: "PrincipalModel",
  localField: "_id",
  foreignField: "school",
  justOne: true,
});

schoolSchema.set("toObject", { virtuals: true });
schoolSchema.set("toJSON", { virtuals: true });

///////////////////////

module.exports = mongoose.model("Schools", schoolSchema);
