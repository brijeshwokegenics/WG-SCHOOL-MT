const express = require("express");
const { upload } = require("../config/cloudinary.js");
const Principal = require("../models/PrincipalModel"); // adjust path
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

// Single image upload and save to DB
// router.post("/upload-logo", authMiddleware(["principal"]), upload.single("logo"), async (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//   try {
//     // Make sure you identify the principal correctly
//     const principalId = req.user.id || req.user._id;// from auth middleware
//     console.log("printing prin id....",principalId )
//     const principal = await Principal.findById(principalId);
//     if (!principal) return res.status(404).json({ error: "Principal not found" });

//     // Save Cloudinary URL in DB
//     principal.schoolLogo = req.file.path;
//     await principal.save();

//     res.json({
//       success: true,
//       imageUrl: req.file.path, // Cloudinary URL
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });



router.post(
  "/upload-logo",
  authMiddleware(["principal"]),
  upload.single("logo"),
  async (req, res) => {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded" });

    try {
      const principalId = req.user.id || req.user._id; // from auth middleware
      console.log("Printing principal ID...", principalId);

      // Find the principal and populate school reference
      const principal = await Principal.findById(principalId).populate("school");
      if (!principal) return res.status(404).json({ error: "Principal not found" });

      if (!principal.school)
        return res.status(400).json({ error: "School not associated with principal" });

      // Update school's logo field
      principal.school.schoolLogo = req.file.path;
      await principal.school.save();

      res.json({
        success: true,
        imageUrl: req.file.path, // Cloudinary URL
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);



// Multiple images upload
router.post("/uploads", upload.array("images", 5), (req, res) => {
  const urls = req.files.map(file => file.path);
  res.json({
    success: true,
    imageUrls: urls,
  });
});

module.exports = router;
