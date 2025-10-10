// // models/TestModel.js
// const mongoose = require("mongoose");

// const questionSchema = new mongoose.Schema({
//   questionText: { type: String, required: true },
//   options: [String], // Only used if type === 'mcq'
//   correctAnswer: { type: String, required: true },
// });

// const testSchema = new mongoose.Schema({
//   testName: { type: String, required: true },
//   subject: { type: String },
//   classLevel: { type: String, required: true },
//   section: { type: String, required: true },
//   type: { type: String, enum: ["mcq", "trueFalse"], required: true },
//   duration: { type: Number }, // in minutes
//   marks:{ type: String},
//   questions: [questionSchema],
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
//   scheduledAt: { type: Date }, // when test will be visible to students
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Test", testSchema);


const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  type: {
    type: String,
    enum: ["mcq", "trueFalse", "match"], //  added match type
    required: true,
  },

  // --- For MCQ ---
  options: [String],
  correctAnswer: { type: String },

  // --- For True/False ---
  trueFalseAnswer: { type: Boolean },

  // --- For Match the Following ---
  pairs: [
    {
      left: { type: String },
      right: { type: String },
    },
  ],
});

const testSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  subject: { type: String },
  classLevel: { type: String, required: true },
  section: { type: String, required: true },
  type: {
    type: String,
    enum: ["mcq", "trueFalse", "match"], // support at test level
    required: true,
  },
  duration: { type: Number },
  marks: { type: String },
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  scheduledAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Test", testSchema);

