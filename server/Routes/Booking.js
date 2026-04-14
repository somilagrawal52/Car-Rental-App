const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBooking,
  getById,
  updateBookingStatus,
  getUserBooking,
  getMyBookings,
} = require("../Controller/Booking");
const { checkforauth, AdminAuth } = require("../Middleware/Auth");

router.post("/create", checkforauth, createBooking);
router.get("/get-all", checkforauth, AdminAuth, getAllBooking);
router.get("/my-bookings", checkforauth, getMyBookings);
router.get("/get-details/:id", checkforauth, getById);
router.patch(
  "/update-status/:id",
  checkforauth,
  AdminAuth,
  updateBookingStatus
);
router.get("/user-booking/:id", checkforauth, getUserBooking);

module.exports = router;
