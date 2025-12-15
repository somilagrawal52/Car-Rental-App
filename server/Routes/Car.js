const express = require("express");
const router = express.Router();
const { addCar, getAllCars } = require("../Controller/Car");
const { checkforauth, AdminAuth } = require("../Middleware/Auth");

router.post("/add-car", checkforauth, AdminAuth, addCar);
router.get("/all-cars", AdminAuth, getAllCars);

module.exports = router;
