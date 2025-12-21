import React, { useEffect } from "react";
// import carsData from "../../Data/carData.json";
import CarCard from "../../Components/CarCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../Store/feature/CarSlice.js";

const Cars = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.car);

  useEffect(() => {
    const getCars = () => {
      try {
        dispatch(getAllCars());
      } catch (error) {
        console.log(error);
      }
    };
    getCars();
  }, [dispatch]);

  return (
    <>
      <div style={{ minHeight: "80vh", marginTop: "50px" }}>
        <h3 className="text-center mb-1">Explore Our Cars Collection</h3>
        <p className="text-center">click on the car to see specs & price</p>
        <div className="d-flex flex-wrap justify-content-center">
          {cars?.map((car) => (
            <CarCard key={car?._id} car={car} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cars;
