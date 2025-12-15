const Car = require("../Model/Car");

const addCar = async (req, res) => {
  try {
    const {
      name,
      category,
      seats,
      fuel,
      year,
      model,
      milage,
      price,
      transmission,
      image,
      about,
      status,
    } = req.body;

    if (!name || !category || !year || !model || !about) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCar = new Car({
      name,
      category,
      seats,
      fuel,
      year,
      model,
      milage,
      price,
      transmission,
      image,
      about,
      status,
    });
    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json({
      success: true,
      message: "All Cars",
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addCar, getAllCars };
