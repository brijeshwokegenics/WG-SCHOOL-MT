const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrincipalModel", // or "User" if you use a shared user model
      required: true,
    },


    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schools", // Use your actual school collection name
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
