// const Announcement = require("../models/AnnouncementModel");

// // Add Announcement
// const addAnnouncement = async (req, res) => {
//   try {
//     const { audience, title, body } = req.body;

//     if (!title || !body) {
//       return res.status(400).json({ message: "Title and body are required" });
//     }

//     const announcement = await Announcement.create({
//       audience: audience || "all",
//       title,
//       body,
//       createdBy: req.user.id,
//     });

//     return res.status(201).json({
//       message: "Announcement added successfully",
//       announcement,
//     });
//   } catch (err) {
//     console.error("Error in adding announcements:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Get All Announcements
// const getAllAnnouncement = async (req, res) => {
//   try {
//     const announcements = await Announcement.find()
//       .sort({ createdAt: -1 })
//       .populate("createdBy", "fullName email"); // optional: show principal info

//     return res.status(200).json({ announcements });
//   } catch (err) {
//     console.error("Error fetching announcements:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Get Announcement by ID
// const getAnnouncementById = async (req, res) => {
//   try {
//     const announcement = await Announcement.findById(req.params.id)
//       .populate("createdBy", "fullName email");

//     if (!announcement) {
//       return res.status(404).json({ message: "Announcement not found" });
//     }

//     return res.status(200).json({ announcement });
//   } catch (err) {
//     console.error("Error fetching announcement:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// // Delete Announcement
// const deleteAnnouncement = async (req, res) => {
//   try {
//     const announcement = await Announcement.findByIdAndDelete(req.params.id);

//     if (!announcement) {
//       return res.status(404).json({ message: "Announcement not found" });
//     }

//     return res.status(200).json({ message: "Announcement deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting announcement:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   addAnnouncement,
//   getAllAnnouncement,
//   getAnnouncementById,
//   deleteAnnouncement,
// };

////////////////////



const AnnouncementModel = require("../models/AnnouncementModel");
const PrincipalModel = require("../models/PrincipalModel");

// const StudentModel = require("../models/StudentModel"); //  Commented out for now

// Create Announcement (only principal can create)
exports.addAnnouncement = async (req, res) => {
  try {
    // Find principal with their school
    const principal = await PrincipalModel.findById(req.user.id).populate("school");
    if (!principal) return res.status(404).json({ message: "Principal not found" });

    const { title, body, audience } = req.body;
    if (!title || !body) return res.status(400).json({ message: "Title and body are required" });

    const announcement = await AnnouncementModel.create({
      title,
      body,
      audience: audience || "all",
      createdBy: req.user.id,
      school: principal.school._id, // link announcement to principal's school
    });

    return res.status(201).json({ message: "Announcement added successfully", announcement });
  } catch (err) {
    console.error("Error creating announcement:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

//  Get all announcements for principal's school (for principal dashboard)
exports.getAllAnnouncement = async (req, res) => {
  try {
    const principal = await PrincipalModel.findById(req.user.id).populate("school");
    if (!principal) return res.status(404).json({ message: "Principal not found" });

    const announcements = await AnnouncementModel.find({ school: principal.school._id }).sort({ createdAt: -1 });
    res.json({ announcements });
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// Get announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await AnnouncementModel.findById(req.params.id).populate("createdBy", "fullName email");
    if (!announcement) return res.status(404).json({ message: "Announcement not found" });

    res.json({ announcement });
  } catch (err) {
    console.error("Error fetching announcement by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await AnnouncementModel.findById(req.params.id);
    if (!announcement) return res.status(404).json({ message: "Announcement not found" });

    // Only the principal who created it can delete
    if (announcement.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await announcement.deleteOne();
    res.json({ message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Error deleting announcement:", err);
    res.status(500).json({ message: "Server error" });
  }
};
