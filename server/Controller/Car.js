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

const getCarById = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findById(id);
    res.status(200).json({
      success: true,
      message: "car details fetched successfully",
      car,
    });
  } catch (error) {
    console.log(error);
    re.status(500).json({ message: "Internal server error" });
  }
};

const updateCar = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Car ID is required" });
    }
    const updated = req.body;
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { $set: updated },
      { new: true },
      { returnOriginal: false }
    );

    res.status(200).json({
      success: true,
      message: "Car details are updated",
      updatedCar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(400).json({ message: "Car is not deleted" });
    }
    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addCar, getAllCars, getCarById, updateCar, deleteCar };
