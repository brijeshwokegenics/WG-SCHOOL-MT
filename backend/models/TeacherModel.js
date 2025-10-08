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

        // Link teacher to the school (added field)
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schools", // must match your School model name
      required: true,
    },
    

   
     classLevel: {
    type: String,
    required: true,
    enum: Array.from({ length: 12 },  (_, i) => (i + 1).toString()), // Validates class 1 to 12
  },

  section: {
    type: String,
    uppercase: true,
    maxlength: 2,
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
