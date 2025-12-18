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
const upload = require("../Middleware/Multer");

router.post(
  "/add-car",
  checkforauth,
  AdminAuth,
  upload.single("image"),
  addCar
);
router.get("/all-cars", AdminAuth, getAllCars);
router.get("/:id", AdminAuth, getCarById);
router.patch("/update-car/:id", checkforauth, AdminAuth, updateCar);
router.delete("/delete-car/:id", checkforauth, AdminAuth, deleteCar);

module.exports = router;
