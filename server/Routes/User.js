const express = require("express");
const router = express.Router();
const {
  registerUser,
  login,
  getCurrentUser,
  updateUser,
} = require("../Controller/User");
const { checkforauth } = require("../Middleware/Auth");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", checkforauth, getCurrentUser);
router.patch("/update/:id", checkforauth, updateUser);

module.exports = router;
