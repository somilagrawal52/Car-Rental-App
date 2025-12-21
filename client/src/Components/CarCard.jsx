import React from "react";
import { Link } from "react-router";

const CarCard = ({ car }) => {
  return (
    <>
      <Link
        to={`/cars/${car?._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="card m-2" style={{ width: "18rem" }}>
          <img
            src={`data:image/png;base64,${car?.image}`}
            alt="car-image"
            className="card-img-top"
            style={{
              width: "250px",
              height: "160px",
              objectFit: "cover",
            }}
          />
          <div className="card-body">
            <h5 className="card-title">{car.name}</h5>
            <p className="card-text">{car.about.substring(0, 100)}...</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CarCard;
