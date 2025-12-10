import React from "react";
import carsData from "../../Data/carData.json";
import CarCard from "../../Components/CarCard";

const Cars = () => {
  return (
    <>
      <div style={{ minHeight: "80vh", marginTop: "50px" }}>
        <h3 className="text-center mb-1">Explore Our Cars Collection</h3>
        <p className="text-center">click on the car to see specs & price</p>
        <div className="d-flex flex-wrap justify-content-center">
          {carsData.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cars;
