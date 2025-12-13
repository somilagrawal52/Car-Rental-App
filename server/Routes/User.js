const express = require("express");
const router = express.Router();
const User = require("../Model/User");
const { registerUser, login, updateUser } = require("../Controller/User");
const { checkforauth } = require("../Middleware/Auth");

router.post("/register", registerUser);
router.post("/login", login);
router.patch("/update/:id", checkforauth, updateUser);

module.exports = router;
