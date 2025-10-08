// backend/models/StudentModel.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            default: "student",
        },
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },

        //roll number and dob are login credientials for student

        //roll number used as email for login
        rollNumber: {
            type: String,
            required: [true, "Roll number is required"],
            trim: true,
        },

        //dob used as password for login
        dob: {
            type: Date,
            required: [true, "Date of birth is required"],
        },

        classLevel: {
            type: String,
            required: true,
            enum: Array.from({ length: 12 }, (_, i) => i + 1), // Validates class 1 to 12
        },

        section: {
            type: String,
            uppercase: true,
            maxlength: 2,
        },

        // Link student to the school (added field)
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Schools", // must match your School model name
            required: true,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
