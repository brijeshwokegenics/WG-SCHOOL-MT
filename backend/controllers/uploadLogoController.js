// Upload School Logo
const PrincipalModel = require("../models/PrincipalModel");

exports.uploadLogo = async (req, res) => {
 try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Assuming you already have principal logged in (via req.user.id)
    const principalId = req.user.id;

    const updatedPrincipal = await PrincipalModel.findByIdAndUpdate(
      principalId,
      { schoolLogo: req.file.path },
      { new: true }
    );

    res.json({
      message: "Logo uploaded successfully",
      logoPath: req.file.path,
      principal: updatedPrincipal,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload logo" });
  }
}

