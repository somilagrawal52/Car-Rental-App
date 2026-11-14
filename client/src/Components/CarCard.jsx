import React from "react";
import { Link } from "react-router-dom";
import { Users, Fuel, Gauge, Zap, ArrowRight, Star } from "lucide-react";
import { getCarImageSrc } from "../utils/imageHelper";

const CarCard = ({ car }) => {
  if (!car) return null;

  const carId = car._id || car.id;
  const isAutomatic =
    car.transmission === true ||
    car.transmission === "true" ||
    car.transmission === "Automatic";

  return (
    <div className="col-lg-4 col-md-6 col-12 mb-4">
      <div className="car-card-modern">
        {/* Car Image Container */}
        <div className="car-image-container">
          <img
            src={getCarImageSrc(car.image)}
            alt={car.name}
            className="car-img-main"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <span className="category-badge-chip">{car.category || "Car"}</span>
          <span className="status-badge-chip">
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                background: "#fff",
                borderRadius: "50%",
                marginRight: "4px",
              }}
            ></span>
            Ready to Drive
          </span>
        </div>

        {/* Card Body */}
        <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
          <div>
            {/* Title & Rating */}
            <div className="d-flex justify-content-between align-items-start mb-1">
              <div>
                <h5 className="fw-bold mb-0 text-dark" style={{ fontSize: "1.15rem" }}>
                  {car.name}
                </h5>
                <small className="text-muted fw-semibold">
                  {car.model || `${car.year} Model`}
                </small>
              </div>
              <div className="d-flex align-items-center gap-1 bg-warning bg-opacity-10 text-warning px-2 py-1 rounded-2">
                <Star size={13} fill="#f59e0b" stroke="#f59e0b" />
                <span className="fw-bold" style={{ fontSize: "0.8rem", color: "#b45309" }}>
                  4.9
                </span>
              </div>
            </div>

            {/* Description Excerpt */}
            <p className="text-secondary small mt-2 mb-2" style={{ lineHeight: 1.4 }}>
              {car.about?.length > 85 ? `${car.about.substring(0, 85)}...` : car.about}
            </p>

            {/* Specs Grid */}
            <div className="specs-grid">
              <div className="spec-item">
                <Users size={15} className="spec-icon" />
                <span>{car.seats || 5} Seats</span>
              </div>
              <div className="spec-item">
                <Gauge size={15} className="spec-icon" />
                <span>{isAutomatic ? "Automatic" : "Manual"}</span>
              </div>
              <div className="spec-item">
                <Fuel size={15} className="spec-icon" />
                <span>{car.fuel || "Petrol"}</span>
              </div>
              <div className="spec-item">
                <Zap size={15} className="spec-icon" />
                <span>
                  {car.milage} {car.fuel === "Electric" ? "km/unit" : "km/l"}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing & CTA Button */}
          <div className="d-flex justify-content-between align-items-center pt-2 border-top border-light mt-2">
            <div>
              <span className="card-price-value">₹{car.price?.toLocaleString()}</span>
              <span className="card-price-unit"> / day</span>
              <div style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: "600" }}>
                Zero Deposit
              </div>
            </div>

            <Link
              to={`/cars/${carId}`}
              className="btn btn-primary-custom btn-sm d-flex align-items-center gap-1"
            >
              <span>Book</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
