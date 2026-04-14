import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import BookingModal from "../../Components/BookingModal";
import { useDispatch, useSelector } from "react-redux";
import { getCarDetails } from "../../Store/feature/CarSlice.js";
import API from "../../api/API";
import { getStoredUser } from "../../api/session";

const CarDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const user = getStoredUser();
  const { loading, selectedCar, error } = useSelector((state) => state.car);
  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleBooking = async () => {
    try {
      if (!selectedCar?._id) {
        return toast.error("Car details are not available");
      }

      setBookingLoading(true);
      await API.post("/book/create", {
        car: selectedCar._id,
        startdate: pickupDate,
        returndate: returnDate,
      });
      toast.success("Booking created successfully");
      setShow(false);
    } catch (bookingError) {
      toast.error(
        bookingError.response?.data?.message || "Unable to create booking"
      );
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getCarDetails(id));
  }, [dispatch, id]);

  return (
    <>
      {error && <p className="text-center text-danger mt-4">{error}</p>}
      {loading ? (
        <h2 className="text-center">Loading...</h2>
      ) : (
        <>
          <div className="row my-4" style={{ minHeight: "70vh" }}>
            <div className="col-md-6">
              <img
                src={`data:image/png;base64,${selectedCar?.image}`}
                alt="car-image"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h2>{selectedCar?.name}</h2>
              <p>{selectedCar?.about}</p>
              <table className="table w-75">
                <tbody>
                  <tr>
                    <th scope="row">year</th>
                    <td>{selectedCar?.year}</td>
                  </tr>
                  <tr>
                    <th scope="row">Model</th>
                    <td>{selectedCar?.model}</td>
                  </tr>
                  <tr>
                    <th scope="row">Category</th>
                    <td>{selectedCar?.category}</td>
                  </tr>
                  <tr>
                    <th scope="row">Fuel</th>
                    <td>{selectedCar?.fuel}</td>
                  </tr>
                  <tr>
                    <th scope="row">Seats</th>
                    <td>{selectedCar?.seats}</td>
                  </tr>
                  <tr>
                    <th scope="row">Milage</th>
                    <td>{selectedCar?.milage}</td>
                  </tr>
                  <tr>
                    <th scope="row">Transmission</th>
                    <td>{selectedCar?.transmission ? "Automatic" : "Manual"}</td>
                  </tr>
                </tbody>
              </table>
              <h4>Price:RS {selectedCar?.price}/- per day</h4>
              {!user ? (
                <Link to={"/login"} className="btn btn-warning mb-3 mt-2">
                  Please login to book
                </Link>
              ) : (
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setShow(!show)}
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
          {show && (
            <BookingModal
              show={show}
              setShow={setShow}
              price={selectedCar?.price}
              pickupDate={pickupDate}
              setPickupDate={setPickupDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              handleBooking={handleBooking}
              bookingLoading={bookingLoading}
            />
          )}
        </>
      )}
    </>
  );
};

export default CarDetail;
