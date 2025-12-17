const Booking = require("../Model/Booking");
const User = require("../Model/User");
const Car = require("../Model/Car");

const createBooking = async (req, res) => {
  try {
    const { user, car, startdate, returndate, totalprice, price } = req.body;

    if (!car || !user || !startdate || !returndate || !price || !totalprice) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const booking = new Booking({
      user,
      car,
      startdate,
      returndate,
      totalprice,
      price,
    });
    await booking.save();

    res.status(200).send({
      success: true,
      message: "Booking crreated",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Internal server error",
      error,
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
      success: true,
      message: "Internal server error",
      error,
    });
  }
};

const getById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return es.status(404).send({
        success: false,
        message: "No bookings found on this id",
      });
    }

    const user = await User.findById({ _id: booking.user });
    const car = await Car.findById({ _id: booking.car });
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
      success: true,
      message: "Internal server error",
      error,
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "please provide booking id",
      });
    }
    const { status } = req.body;
    const updatedStatus = await Booking.findByIDAndUpdate(
      id,
      {
        $set: { status },
      },
      { returnOriginal: false }
    );
    res.status(200).send({
      success: true,
      message: "booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Internal server error",
      error,
    });
  }
};

const getUserBooking = async (req, res) => {
  try {
    const { id } = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "please provide booking id",
      });
    }
    const user = await User.findById({ _id: id });
    const booking = await Booking.find({ user: user._id });
    const car = await Car.find({ _id: booking[0].car });

    res.status(200).send({
      success: true,
      message: "here is your booking",
      totalBooking: booking.length,
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Internal server error",
      error,
    });
  }
};

module.exports = {
  createBooking,
  getAllBooking,
  getById,
  updateBookingStatus,
  getUserBooking,
};
