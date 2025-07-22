const express = require("express");
const { register, login, updateProfile } = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { models } = require("mongoose");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update-profile", verifyToken, updateProfile);

module.exports = router;
