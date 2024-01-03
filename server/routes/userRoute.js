const express = require("express");
const router = express.Router();
const {
  createLogin,
  createRegister,
  Logout,
  getProfile,
} = require("../controllers/userController");

router.post("/register", createRegister);
router.post("/login", createLogin);
router.post("/logout", Logout);
router.get("/profile", getProfile);
module.exports = router;
