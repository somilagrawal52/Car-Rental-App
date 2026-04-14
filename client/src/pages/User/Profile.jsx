import React, { useEffect, useState } from "react";
import EditModel from "../../Components/EditModel";
import BookingDetails from "../../Components/BookingDetails";
import API from "../../api/API";
import { getStoredToken, saveSession } from "../../api/session";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [editModel, setEditModel] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const loadProfile = async () => {
    try {
      setLoading(true);
      const [{ data: userResponse }, { data: bookingResponse }] = await Promise.all([
        API.get("/user/me"),
        API.get("/book/my-bookings"),
      ]);

      setUser(userResponse.user);
      setBookings(bookingResponse.booking);
      setUname(userResponse.user.username);
      setEmail(userResponse.user.email);
      setPhone(userResponse.user.phone);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        username: uname,
        email,
        phone,
      };

      if (password) {
        payload.password = password;
      }

      const { data } = await API.patch(`/user/update/${user._id}`, payload);
      setUser(data.updatedUser);
      saveSession({
        token: getStoredToken(),
        user: data.updatedUser,
      });
      setPassword("");
      setEditModel(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!getStoredToken()) {
    return (
      <div className="container mt-5 text-center" style={{ minHeight: "70vh" }}>
        <h4>Please login to view your account.</h4>
      </div>
    );
  }

  return (
    <>
      <div className="container" style={{ minHeight: "70vh" }}>
        <div className="mt-5">
          {loading ? (
            <p>Loading profile...</p>
          ) : (
            <>
              <p>Name: {user?.username}</p>
              <p>Email: {user?.email}</p>
              <p>Phone: {user?.phone}</p>
            </>
          )}
          <button
            className="btn btn-warning"
            onClick={() => setEditModel(!editModel)}
            disabled={!user}
          >
            Edit Details
          </button>
        </div>
        <div className="mt-3">
          <h4>Your Bookings</h4>
          <table className="table mt-3 text-center">
            <thead>
              <tr className="bg-dark text-light">
                <th>Car Name</th>
                <th>Journey Date</th>
                <th>Status</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length ? (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking?.car?.name}</td>
                    <td>{booking?.startdate?.slice(0, 10)}</td>
                    <td>{booking?.status}</td>
                    <td>
                      <i
                        className="fa-solid fa-eye text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => setBookingDetails(booking)}
                      ></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {editModel && (
        <EditModel
          editModel={editModel}
          setEditModel={setEditModel}
          uname={uname}
          setUname={setUname}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          password={password}
          setPassword={setPassword}
          handleUpdate={handleUpdate}
        />
      )}
      {bookingDetails && (
        <BookingDetails
          bookingDetails={bookingDetails}
          setBookingDetails={() => setBookingDetails(null)}
          booking={bookingDetails}
        />
      )}
    </>
  );
};

export default Profile;
