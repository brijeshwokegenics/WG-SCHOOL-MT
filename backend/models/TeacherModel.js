const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "teacher",
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    // Link teacher to the principal who created them
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrincipalModel",
      required: true,
    },

        // ✅ Link teacher to the school (added field)
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schools", // must match your School model name
      required: true,
    },
    
    classLevel: {
      type: String,
      enum: ["Primary(1-5)", "Middle(6-8)", "Secondary(9-10)", "Senior(11-12)"],
      required: true,
    },
    // New field: Subject taught by the teacher
    subject: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
