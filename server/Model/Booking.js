const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user is required"],
      ref: "User",
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "car is required"],
      ref: "Car",
    },
    startdate: {
      type: Date,
      required: [true, "start date is required"],
    },
    returndate: {
      type: Date,
      required: [true, "return date is required"],
    },
    totalprice: {
      type: Number,
      required: [true, "total price is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
