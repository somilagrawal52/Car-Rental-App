import React from "react";

const BookingDetails = ({ setBookingDetails, booking }) => {
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
              <p>Journey Date: {booking?.startdate?.slice(0, 10)}</p>
              <p>Return Date: {booking?.returndate?.slice(0, 10)}</p>
              <p>Car Name: {booking?.car?.name}</p>
              <p>Price: RS {booking?.price}</p>
              <p>Total Price: RS {booking?.totalprice}</p>
              <p>Booking Status: {booking?.status}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
