import React from "react";
import { getCarImageSrc } from "../utils/imageHelper";
import { CheckCircle2, Calendar, FileText, Printer, X, ShieldCheck } from "lucide-react";

const BookingDetails = ({ setBookingDetails, booking }) => {
  if (!booking) return null;

  const status = booking?.status?.toLowerCase() || "confirmed";

  const getStatusBadge = () => {
    switch (status) {
      case "confirmed":
        return <span className="badge-status badge-status-confirmed">Confirmed</span>;
      case "completed":
        return <span className="badge-status badge-status-completed">Trip Completed</span>;
      case "canceled":
        return <span className="badge-status badge-status-canceled">Cancelled</span>;
      default:
        return <span className="badge-status badge-status-pending">Pending Review</span>;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-backdrop-custom">
      <div
        className="bg-white rounded-4 shadow-lg border border-light p-4"
        style={{ maxWidth: "560px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-light">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3">
              <FileText size={22} />
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">Reservation Voucher</h5>
              <small className="text-muted">Booking Reference: #{booking._id?.slice(-8) || "REF-7890"}</small>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-light rounded-circle p-2 text-muted"
            onClick={() => setBookingDetails(null)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Status Row */}
        <div className="d-flex justify-content-between align-items-center my-3 p-3 bg-light rounded-3">
          <div>
            <span className="small text-muted d-block">Reservation Status</span>
            {getStatusBadge()}
          </div>
          <div className="text-end">
            <span className="small text-muted d-block">Payment Method</span>
            <span className="fw-semibold text-dark small">Pay on Delivery / Card</span>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="d-flex align-items-center gap-3 p-3 border border-light rounded-3 mb-3">
          <img
            src={getCarImageSrc(booking?.car?.image)}
            alt={booking?.car?.name}
            className="rounded-3"
            width={100}
            height={70}
            style={{ objectFit: "cover" }}
          />
          <div>
            <h6 className="fw-bold text-dark mb-1">{booking?.car?.name || "Premium Vehicle"}</h6>
            <div className="small text-muted">{booking?.car?.category} • {booking?.car?.fuel || "Petrol"}</div>
            <div className="fw-semibold text-primary small">Daily Rate: ₹{booking?.price?.toLocaleString() || booking?.car?.price?.toLocaleString()}</div>
          </div>
        </div>

        {/* Trip Timeline Details */}
        <div className="p-3 bg-light rounded-3 mb-3">
          <div className="row g-2">
            <div className="col-6">
              <span className="small text-muted d-block">Pickup Date</span>
              <strong className="text-dark">
                {booking?.startdate ? new Date(booking.startdate).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "N/A"}
              </strong>
            </div>
            <div className="col-6">
              <span className="small text-muted d-block">Return Date</span>
              <strong className="text-dark">
                {booking?.returndate ? new Date(booking.returndate).toLocaleDateString("en-IN", { dateStyle: "medium" }) : "N/A"}
              </strong>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="p-3 bg-white border border-light rounded-3 mb-4">
          <div className="d-flex justify-content-between small text-muted mb-1">
            <span>Insurance & Roadside Assist:</span>
            <span className="text-success fw-semibold">FREE (Zero Deposit)</span>
          </div>
          <div className="d-flex justify-content-between border-top border-light pt-2">
            <span className="fw-bold text-dark">Total Amount:</span>
            <span className="fw-extrabold text-primary fs-5">
              ₹{booking?.totalprice?.toLocaleString() || (booking?.price || 1500).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-secondary-custom flex-grow-1"
            onClick={() => setBookingDetails(null)}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary-custom flex-grow-1 d-flex align-items-center justify-content-center gap-2"
            onClick={handlePrint}
          >
            <Printer size={16} />
            <span>Print Voucher</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
