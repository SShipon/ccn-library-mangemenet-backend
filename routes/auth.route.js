const express = require("express");
const {
  register,
  login,
  getAllUsers,
  updateUserRole,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", verifyToken, getAllUsers);
router.patch("/update-role/:id", verifyToken, updateUserRole);

module.exports = router;
