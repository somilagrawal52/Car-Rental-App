const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBooking,
  getById,
} = require("../Controller/Booking");
const { checkforauth, AdminAuth } = require("../Middleware/Auth");

router.post("/create", checkforauth, createBooking);
router.get("/get-all", checkforauth, getAllBooking);
router.get("/get-details/:id", checkforauth, AdminAuth, getById);

module.exports = router;
