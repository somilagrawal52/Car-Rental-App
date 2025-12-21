import React, { useState } from "react";
import EditModel from "../../Components/EditModel";

const Profile = () => {
  const [editModel, setEditModel] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(false);

  return (
    <>
      <div className="container" style={{ minHeight: "70vh" }}>
        <div className="mt-5">
          <p>Name:</p>
          <p>Email:</p>
          <p>Phone:</p>
          <button
            className="btn btn-warning"
            onClick={() => setEditModel(!editModel)}
          >
            Edit Details
          </button>
        </div>
        <div className="mt-3">
          <h4>Your Bookings</h4>
          <table className="table mt-3 text-center">
            <tr className="bg-dark text-light">
              <th>Car Name</th>
              <th>Journy Date</th>
              <th>Status</th>
              <th>View Details</th>
            </tr>
            <tr>
              <td>Honda City</td>
              <td>01-10-2025</td>
              <td>Pending</td>
              <td>
                <i
                  className="fa-solid fa-eye text-primary"
                  style={{ cursor: "pointer" }}
                ></i>
              </td>
            </tr>
          </table>
        </div>
      </div>
      {editModel && <EditModel editModel={editModel} setEditModel={setEditModel}/>}
    </>
  );
};

export default Profile;
