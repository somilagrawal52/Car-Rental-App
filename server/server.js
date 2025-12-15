const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./Config/db");
const userRoutes = require("./Routes/User");
const carRoutes = require("./Routes/Car");

connectDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/car", carRoutes);

app.get("/", (req, res) => {
  res.send("Car Rental Service API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.DEV_MODE} mode`
  );
});
