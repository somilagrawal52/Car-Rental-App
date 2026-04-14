const Booking = require("../Model/Booking");
const User = require("../Model/User");
const Car = require("../Model/Car");

const createBooking = async (req, res) => {
  try {
    const { car, startdate, returndate } = req.body;

    if (!car || !startdate || !returndate) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const foundCar = await Car.findById(car);
    if (!foundCar) {
      return res.status(404).send({
        success: false,
        message: "Car not found",
      });
    }

    const start = new Date(startdate);
    const end = new Date(returndate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid booking date range",
      });
    }

    const bookingDays = Math.max(
      1,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    );
    const price = foundCar.price;
    const totalprice = bookingDays * price;

    const booking = new Booking({
      user: req.user._id,
      car,
      startdate: start,
      returndate: end,
      totalprice,
      price,
    });
    await booking.save();

    res.status(201).send({
      success: true,
      message: "Booking created",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json({
      success: true,
      message: "All Bookings",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const getById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "No bookings found on this id",
      });
    }

    if (
      req.user.role !== "admin" &&
      booking.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).send({
        success: false,
        message: "Access denied",
      });
    }

    const user = await User.findById(booking.user);
    const car = await Car.findById(booking.car);
    res.status(200).json({
      success: true,
      message: "Successfully got the booking by id",
      booking: {
        id: booking._id,
        Customername: user.username,
        phone: user.phone,
        startdate: booking.startdate,
        returndate: booking.returndate,
        price: car.price,
        totalprice: booking.totalprice,
        status: booking.status,
        bookingTime: booking.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "please provide booking id",
      });
    }
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        $set: { status },
      },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "please provide booking id",
      });
    }

    if (req.user.role !== "admin" && req.user._id.toString() !== id.toString()) {
      return res.status(403).send({
        success: false,
        message: "Access denied",
      });
    }

    const booking = await Booking.find({ user: id }).populate("car");

    res.status(200).send({
      success: true,
      message: "here is your booking",
      totalBooking: booking.length,
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const booking = await Booking.find({ user: req.user._id }).populate("car");

    res.status(200).send({
      success: true,
      message: "here is your booking",
      totalBooking: booking.length,
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createBooking,
  getAllBooking,
  getById,
  updateBookingStatus,
  getUserBooking,
  getMyBookings,
};
