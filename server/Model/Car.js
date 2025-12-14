const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Car name is required"],
    },
    category: {
      type: String,
      required: [true, "Car category is required"],
    },
    seats: {
      type: Number,
      default: 4,
    },
    fuel: {
      type: String,
      default: "Petrol",
    },
    year: {
      type: Number,
      required: [true, "Car year is required"],
    },
    model: {
      type: String,
      required: [true, "Car model is required"],
    },
    milage: {
      type: Number,
      default: 10,
    },
    price: {
      type: Number,
      default: 1000,
    },
    transmission: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    about: {
      type: String,
      required: [true, "Car description is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
