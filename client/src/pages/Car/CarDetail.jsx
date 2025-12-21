import React, { useState } from "react";
import { useParams } from "react-router";
import carsData from "../../Data/carData.json";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BookingModal from "../../Components/BookingModal";
import { useDispatch, useSelector } from "react-redux";
import { getCarDetails } from "../../Store/feature/CarSlice.js";

const CarDetail = () => {
  const user = true;
  const { id } = useParams();
  const [CarDetails, setCarDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const { cars } = useSelector((state) => state.cars);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getCardInfo = () => {
    setLoading(true);
    try {
      dispatch(getCarDetails(id));
      if (cars) {
        const carInfo = cars?.find((car) => car?._id === id);
        setCarDetails(carInfo);
      }
      setLoading(false);
    } catch (error) {
      console.log("Error fetching car details:", error);
    }
  };

  const handleBooking = () => {
    toast.success("Booking");
    setShow(false);
  };

  useEffect(() => {
    getCardInfo();
  }, [getCardInfo, id]);

  return (
    <>
      {loading ? (
        <h2 className="text-center">Loading...</h2>
      ) : (
        <>
          <div className="row my-4" style={{ minHeight: "70vh" }}>
            <div className="col-md-6">
              <img
                src={`data:image/png;base64,${CarDetails?.image}`}
                alt="car-image"
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-6">
              <h2>{CarDetails.name}</h2>
              <p>{CarDetails.about}</p>
              <table className="table w-75">
                <tbody>
                  <tr>
                    <th scope="row">year</th>
                    <td>{CarDetails.year}</td>
                  </tr>
                  <tr>
                    <th scope="row">Model</th>
                    <td>{CarDetails.model}</td>
                  </tr>
                  <tr>
                    <th scope="row">Category</th>
                    <td>{CarDetails.category}</td>
                  </tr>
                  <tr>
                    <th scope="row">Fuel</th>
                    <td>{CarDetails.fuel}</td>
                  </tr>
                  <tr>
                    <th scope="row">Seats</th>
                    <td>{CarDetails.seats}</td>
                  </tr>
                  <tr>
                    <th scope="row">Milage</th>
                    <td>{CarDetails.milage}</td>
                  </tr>
                  <tr>
                    <th scope="row">Transmission</th>
                    <td>{CarDetails?.transmission ? "Automatic" : "Manual"}</td>
                  </tr>
                </tbody>
              </table>
              <h4>Price:RS {CarDetails.price}/- per day</h4>
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
              price={CarDetails.price}
              pickupDate={pickupDate}
              setPickupDate={setPickupDate}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              handleBooking={handleBooking}
            />
          )}
        </>
      )}
    </>
  );
};

export default CarDetail;
