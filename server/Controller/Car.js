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

    let carImage = null;
    if (req.file) {
      carImage = req.file.buffer.toString("base64");
    } else if (image) {
      carImage = image;
    }

    if (!carImage) {
      return res.status(400).json({
        success: false,
        message: "Please provide an image (file upload or image URL)",
      });
    }

    const newCar = new Car({
      name,
      category,
      seats: seats ? Number(seats) : 4,
      fuel: fuel || "Petrol",
      year: Number(year),
      model,
      milage: milage ? Number(milage) : 12,
      price: price ? Number(price) : 1500,
      transmission: transmission === true || transmission === "true" || transmission === "Automatic",
      image: carImage,
      about,
      status: status !== undefined ? (status === true || status === "true") : true,
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
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({
      success: true,
      message: "car details fetched successfully",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
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
      { new: true, runValidators: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

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
