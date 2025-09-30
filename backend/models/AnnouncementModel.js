const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    audience: {
      type: String,
      enum: ["all", "teacher", "student"],
      default: "all",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    body: {
      type: String,
      required: [true, "Body is required"],
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Principal who created the announcement
      required: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schools", // Link to the school
      required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Announcement", announcementSchema);
