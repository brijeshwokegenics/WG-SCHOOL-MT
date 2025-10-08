const express = require("express");
const router = express.Router();

const {getPrincipalDetails, editPrincipalDetails} = require("../controllers/principalController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/me",authMiddleware(["principal"]),getPrincipalDetails);

router.put("/edit",authMiddleware(["principal"]),editPrincipalDetails);





module.exports = router;