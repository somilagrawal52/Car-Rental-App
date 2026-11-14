import React from "react";
import { getCarImageSrc } from "../utils/imageHelper";
import { Calendar, ShieldCheck, CheckCircle2, X } from "lucide-react";

const BookingModal = (props) => {
  const {
    show,
    setShow,
    car,
    price,
    totalPrice,
    days,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    handleBooking,
    bookingLoading,
  } = props;

  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div
        className="bg-white rounded-4 shadow-lg border border-light p-4"
        style={{ maxWidth: "520px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-light">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">Confirm Vehicle Reservation</h5>
              <small className="text-muted">Review booking details before confirming</small>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-light rounded-circle p-2 text-muted"
            onClick={() => setShow(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Vehicle Mini Card */}
        <div className="d-flex align-items-center gap-3 my-3 p-3 bg-light rounded-3">
          <img
            src={getCarImageSrc(car?.image)}
            alt={car?.name}
            className="rounded-3"
            width={90}
            height={60}
            style={{ objectFit: "cover" }}
          />
          <div>
            <h6 className="fw-bold text-dark mb-1">{car?.name}</h6>
            <div className="small text-muted">{car?.category} • {car?.fuel} • {car?.seats || 5} Seats</div>
            <div className="fw-semibold text-primary small">₹{price?.toLocaleString()} / day</div>
          </div>
        </div>

        {/* Date Controls */}
        <div className="row g-3 mb-3">
          <div className="col-6">
            <label className="form-label small fw-bold text-muted">Pickup Date</label>
            <input
              type="date"
              className="form-control widget-input"
              value={pickupDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>
          <div className="col-6">
            <label className="form-label small fw-bold text-muted">Return Date</label>
            <input
              type="date"
              className="form-control widget-input"
              value={returnDate}
              min={pickupDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        </div>

        {/* Inclusions checklist */}
        <div className="p-3 bg-success bg-opacity-10 rounded-3 mb-3">
          <div className="d-flex align-items-center gap-2 text-success fw-bold small mb-1">
            <CheckCircle2 size={16} />
            <span>Zero Security Deposit Protection Activated</span>
          </div>
          <div className="text-muted small">
            Includes free roadside assistance, doorstep vehicle handover, and unlimited km driving.
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="p-3 bg-light rounded-3 mb-4">
          <div className="d-flex justify-content-between small text-muted mb-1">
            <span>Duration:</span>
            <span className="fw-semibold text-dark">{days} Day{days > 1 ? "s" : ""}</span>
          </div>
          <div className="d-flex justify-content-between small text-muted mb-2">
            <span>Insurance & Roadside Assist:</span>
            <span className="text-success fw-semibold">FREE (₹0)</span>
          </div>
          <div className="d-flex justify-content-between border-top border-secondary border-opacity-25 pt-2">
            <span className="fw-bold text-dark">Total Amount:</span>
            <span className="fw-extrabold text-primary fs-5">
              ₹{totalPrice?.toLocaleString() || (days * (price || 1500)).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-secondary-custom flex-grow-1"
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary-custom flex-grow-1 d-flex align-items-center justify-content-center gap-2"
            onClick={handleBooking}
            disabled={bookingLoading}
          >
            {bookingLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status"></span>
                <span>Confirming...</span>
              </>
            ) : (
              <span>Confirm Reservation</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
