const PrincipalModel = require("../models/PrincipalModel");
const SchoolModel = require("../models/Schools");

exports.getPrincipalDetails = async (req, res) => {
  // GET /api/principal/me → principal + school details

  try {
    const principal = await PrincipalModel.findById(req.user.id).populate("school");
    console.log("get principal details called");
    console.log(principal);

    if (!principal) {
      return res.status(404).json({ message: "Principal not found" });
    }

    res.json({
      principal: {
        name: principal.fullName,
        email: principal.email,
        schoolName: principal.school?.schoolName || "N/A",
        schoolCode: principal.school?.schoolCode || "N/A",
        city: principal.school?.city || "N/A",
        state: principal.school?.state || "N/A",
        schoolLogo: principal.school?.schoolLogo
      },
    });

  } catch (err) {
    console.error("Error fetching principal:", err);
    res.status(500).json({ message: "Server error" });
  }
}



exports.editPrincipalDetails = async (req, res) => {
  try {
    const { fullName, email, schoolName, city, state, schoolCode } = req.body;

    // update principal
    const principal = await PrincipalModel.findByIdAndUpdate(
      req.user.id,
      { fullName, email },
      { new: true }
    );

    // update school
    if (principal.school) {
      await SchoolModel.findByIdAndUpdate(
        principal.school,
        { schoolName, city, state, schoolCode },
        { new: true }
      );
    }

    const updatedPrincipal = await PrincipalModel.findById(req.user.id).populate("school");

    res.json({ message: "Updated successfully", principal: updatedPrincipal });
  } catch (err) {
    console.error("Error editing principal & school:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
