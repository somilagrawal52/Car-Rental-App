const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBooking,
  getById,
  updateBookingStatus,
  getUserBooking,
} = require("../Controller/Booking");
const { checkforauth, AdminAuth } = require("../Middleware/Auth");

router.post("/create", checkforauth, createBooking);
router.get("/get-all", checkforauth, getAllBooking);
router.get("/get-details/:id", checkforauth, AdminAuth, getById);
router.patch(
  "/update-status/:id",
  checkforauth,
  AdminAuth,
  updateBookingStatus
);
router.get("/user-booking/:id", checkforauth, AdminAuth, getUserBooking);

module.exports = router;
