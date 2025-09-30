const express = require("express");
const router = express.Router();

const {getPrincipalDetails} = require("../controllers/principalController");
const{uploadLogo}=require("../controllers/uploadLogoController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me",authMiddleware(["principal"]),getPrincipalDetails);

router.post("/upload-logo", uploadLogo);



module.exports = router;