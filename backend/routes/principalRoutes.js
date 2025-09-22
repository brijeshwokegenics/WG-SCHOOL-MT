const express = require("express");
const router = express.Router();

const {getPrincipalDetails} = require("../controllers/principalController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me",authMiddleware(["principal"]),getPrincipalDetails);

module.exports = router;