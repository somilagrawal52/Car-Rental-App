import React from "react";

const BookingDetails = ({ setBookingDetails }) => {
  return (
    <>
      <div className="modal d-flex" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h5 className="modal-title">Your Booking Details</h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setBookingDetails(false)}
              />
            </div>
            <div className="modal-body">
              <p>Journey Date:</p>
              <p>Return Date:</p>
              <p>Car Name:</p>
              <p>Price:</p>
              <p>Booking Status:</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
