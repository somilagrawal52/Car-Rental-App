const express = require("express");
const router = express.Router();
const {
  addCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
} = require("../Controller/Car");
const { checkforauth, AdminAuth } = require("../Middleware/Auth");

router.post("/add-car", checkforauth, AdminAuth, addCar);
router.get("/all-cars", AdminAuth, getAllCars);
router.get("/:id", AdminAuth, getCarById);
router.patch("/update-car/:id", checkforauth, AdminAuth, updateCar);
router.delete("/delete-car/:id", checkforauth, AdminAuth, deleteCar);

module.exports = router;
