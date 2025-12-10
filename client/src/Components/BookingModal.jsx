import React from "react";

const BookingModal = (props) => {
  const {
    show,
    setShow,
    price,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    handleBooking,
  } = props;

  const calculateTotal = () => {
    if (pickupDate && returnDate) {
      const days = Math.max(
        1,
        Math.ceil(new Date(returnDate) - new Date(pickupDate)) /
          (1000 * 60 * 60 * 24)
      );
      return days * price;
    }
    return price;
  };
  return (
    <>
      <div className="modal d-flex" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h5 className="modal-title">Select Your Journey</h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShow(!show)}
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Pickup Date
                </label>
                <input
                  type="date"
                  name=""
                  id=""
                  className="form-control"
                  defaultValue={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Return Date
                </label>
                <input
                  type="date"
                  name=""
                  id=""
                  className="form-control"
                  defaultValue={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
              <p>Price: RS {price}/- per day</p>
              <p>Note: please return before 10 PM</p>
              <h4>Total: RS {calculateTotal()}/-</h4>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShow(!show)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleBooking}
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
