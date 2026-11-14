import React, { useEffect, useState } from "react";
import EditModel from "../../Components/EditModel";
import BookingDetails from "../../Components/BookingDetails";
import API from "../../api/API";
import { getStoredToken, getStoredUser, saveSession } from "../../api/session";
import { getCarImageSrc } from "../../utils/imageHelper";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Calendar,
  Eye,
  PlusCircle,
  Car,
  Settings,
  Sparkles,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [editModel, setEditModel] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [user, setUser] = useState(getStoredUser());
  const [bookings, setBookings] = useState([]);
  const [allAdminBookings, setAllAdminBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings"); // 'bookings', 'admin-fleet', 'admin-bookings', 'settings'

  // Profile Edit fields
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // New Car Form State (Admin)
  const [newCar, setNewCar] = useState({
    name: "",
    category: "SUV",
    seats: 5,
    fuel: "Petrol",
    year: 2024,
    model: "2024 Edition",
    milage: 16,
    price: 3000,
    transmission: true,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    about: "Brand new vehicle added to fleet with comprehensive insurance and GPS.",
  });
  const [addingCar, setAddingCar] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const token = getStoredToken();
      if (!token) return;

      try {
        const [{ data: userResponse }, { data: bookingResponse }] =
          await Promise.all([
            API.get("/user/me"),
            API.get("/book/my-bookings"),
          ]);

        if (userResponse?.user) {
          setUser(userResponse.user);
          setUname(userResponse.user.username);
          setEmail(userResponse.user.email);
          setPhone(userResponse.user.phone);
        }
        if (bookingResponse?.booking) {
          setBookings(bookingResponse.booking);
        }
      } catch (err) {
        // Fallback for demo users
        const stored = getStoredUser();
        if (stored) {
          setUser(stored);
          setUname(stored.username || "");
          setEmail(stored.email || "");
          setPhone(stored.phone || "");
        }
        // Demo bookings fallback
        setBookings([
          {
            _id: "book_demo_101",
            car: {
              name: "Mercedes-Benz C-Class",
              category: "Luxury",
              fuel: "Petrol",
              price: 6500,
              image:
                "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
            },
            startdate: new Date().toISOString(),
            returndate: new Date(Date.now() + 86400000 * 3).toISOString(),
            status: "confirmed",
            price: 6500,
            totalprice: 19500,
          },
          {
            _id: "book_demo_102",
            car: {
              name: "Mahindra Thar 4x4",
              category: "SUV",
              fuel: "Diesel",
              price: 3200,
              image:
                "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80",
            },
            startdate: new Date(Date.now() - 86400000 * 15).toISOString(),
            returndate: new Date(Date.now() - 86400000 * 12).toISOString(),
            status: "completed",
            price: 3200,
            totalprice: 9600,
          },
        ]);
      }

      // If user is Admin, load all bookings
      const currentUser = getStoredUser();
      if (currentUser?.role === "admin") {
        try {
          const { data: allB } = await API.get("/book/get-all");
          if (allB?.bookings) {
            setAllAdminBookings(allB.bookings);
          }
        } catch (e) {
          // Provide demo admin bookings
          setAllAdminBookings([
            {
              _id: "admin_b_01",
              user: { username: "Pooja Hegde", phone: "9876543210" },
              car: { name: "Audi Q7 Quattro", price: 7200 },
              startdate: new Date().toISOString(),
              returndate: new Date(Date.now() + 86400000 * 4).toISOString(),
              totalprice: 28800,
              status: "confirmed",
            },
            {
              _id: "admin_b_02",
              user: { username: "Rohit Sharma", phone: "9988776655" },
              car: { name: "Tesla Model 3", price: 5200 },
              startdate: new Date(Date.now() - 86400000 * 5).toISOString(),
              returndate: new Date(Date.now() - 86400000 * 2).toISOString(),
              totalprice: 15600,
              status: "completed",
            },
          ]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = { username: uname, email, phone };
      if (password) payload.password = password;

      if (user?._id && !user._id.startsWith("demo_")) {
        const { data } = await API.patch(`/user/update/${user._id}`, payload);
        setUser(data.updatedUser);
        saveSession({ token: getStoredToken(), user: data.updatedUser });
      } else {
        const updated = { ...user, username: uname, email, phone };
        setUser(updated);
        saveSession({ token: getStoredToken(), user: updated });
      }

      setPassword("");
      setEditModel(false);
      toast.success("Profile information updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update profile");
    }
  };

  const handleAddCarSubmit = async (e) => {
    e.preventDefault();
    try {
      setAddingCar(true);
      await API.post("/car/add-car", newCar);
      toast.success(`Successfully added ${newCar.name} to the active fleet!`);
      // Reset form
      setNewCar({
        name: "",
        category: "SUV",
        seats: 5,
        fuel: "Petrol",
        year: 2024,
        model: "2024 Edition",
        milage: 16,
        price: 3000,
        transmission: true,
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
        about: "New vehicle ready for instant bookings.",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Fleet vehicle registered in demo mode!");
    } finally {
      setAddingCar(false);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await API.patch(`/book/update-status/${bookingId}`, { status: newStatus });
      toast.success(`Booking status changed to ${newStatus}`);
      setAllAdminBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
    } catch (e) {
      // Demo update
      toast.success(`Booking status set to ${newStatus}`);
      setAllAdminBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!getStoredToken()) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "75vh" }}>
        <div className="p-5 bg-white rounded-4 shadow-sm border border-light max-w-500 mx-auto">
          <Car size={48} className="text-primary mb-3" />
          <h4 className="fw-bold text-dark">Access Your Account</h4>
          <p className="text-muted">Please sign in to view your reservations and settings.</p>
          <a href="/login" className="btn btn-primary-custom px-4 py-2">
            Sign In Now
          </a>
        </div>
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="container py-5" style={{ minHeight: "85vh" }}>
      {/* 1. Profile Banner Header */}
      <div className="p-4 bg-white rounded-4 shadow-sm border border-light mb-4">
        <div className="row align-items-center">
          <div className="col-md-8 d-flex align-items-center gap-3">
            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
              style={{ width: "64px", height: "64px", fontSize: "1.7rem" }}
            >
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h4 className="fw-extrabold text-dark mb-0">{user?.username}</h4>
                <span
                  className={`badge ${
                    isAdmin ? "bg-primary" : "bg-success"
                  } rounded-pill px-3 py-1 small`}
                >
                  {isAdmin ? "Fleet Administrator" : "Verified Customer"}
                </span>
              </div>
              <div className="text-muted small mt-1 d-flex flex-wrap gap-3">
                <span className="d-flex align-items-center gap-1">
                  <Mail size={14} className="text-primary" />
                  {user?.email}
                </span>
                <span className="d-flex align-items-center gap-1">
                  <Phone size={14} className="text-primary" />
                  {user?.phone || "+91 98765 43210"}
                </span>
              </div>
            </div>
          </div>

          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <button
              className="btn btn-secondary-custom btn-sm px-3 py-2 d-inline-flex align-items-center gap-1"
              onClick={() => setEditModel(true)}
            >
              <Settings size={15} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* KPI Quick Stats Row */}
        <div className="row g-3 mt-3 pt-3 border-top border-light">
          <div className="col-4">
            <div className="p-2 bg-light rounded-3 text-center">
              <span className="small text-muted d-block">Total Trips</span>
              <strong className="text-dark fs-5">{bookings?.length || 2}</strong>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 bg-light rounded-3 text-center">
              <span className="small text-muted d-block">Status Tier</span>
              <strong className="text-primary fs-6 d-flex align-items-center justify-content-center gap-1">
                <Award size={16} />
                <span>Silver Member</span>
              </strong>
            </div>
          </div>
          <div className="col-4">
            <div className="p-2 bg-light rounded-3 text-center">
              <span className="small text-muted d-block">Safety Rating</span>
              <strong className="text-success fs-5">100%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="d-flex gap-2 mb-4 border-bottom border-light pb-2 flex-wrap">
        <button
          className={`btn ${
            activeTab === "bookings" ? "btn-primary-custom" : "btn-light"
          } btn-sm px-3 py-2 fw-semibold rounded-pill`}
          onClick={() => setActiveTab("bookings")}
        >
          My Reservations ({bookings?.length || 0})
        </button>

        {isAdmin && (
          <>
            <button
              className={`btn ${
                activeTab === "admin-bookings" ? "btn-primary-custom" : "btn-light"
              } btn-sm px-3 py-2 fw-semibold rounded-pill`}
              onClick={() => setActiveTab("admin-bookings")}
            >
              All Client Bookings ({allAdminBookings?.length || 0})
            </button>

            <button
              className={`btn ${
                activeTab === "admin-fleet" ? "btn-primary-custom" : "btn-light"
              } btn-sm px-3 py-2 fw-semibold rounded-pill d-flex align-items-center gap-1`}
              onClick={() => setActiveTab("admin-fleet")}
            >
              <PlusCircle size={15} />
              <span>Add Vehicle to Fleet</span>
            </button>
          </>
        )}
      </div>

      {/* 3. Tab Contents */}
      {/* TAB A: My Bookings */}
      {activeTab === "bookings" && (
        <div className="bg-white rounded-4 shadow-sm border border-light p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0">Your Reserved Trips</h5>
            <small className="text-muted">Click on voucher icon to view details or print receipt</small>
          </div>

          {bookings && bookings.length > 0 ? (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead className="bg-light">
                  <tr className="text-muted small text-uppercase">
                    <th>Vehicle</th>
                    <th>Dates</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th className="text-center">Voucher</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={getCarImageSrc(booking?.car?.image)}
                            alt="Car"
                            className="rounded-3"
                            width={55}
                            height={40}
                            style={{ objectFit: "cover" }}
                          />
                          <div>
                            <div className="fw-bold text-dark">
                              {booking?.car?.name || "Premium Car"}
                            </div>
                            <small className="text-muted">
                              {booking?.car?.category || "Vehicle"}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="small text-dark fw-semibold">
                          {booking?.startdate
                            ? new Date(booking.startdate).toLocaleDateString("en-IN", {
                                dateStyle: "medium",
                              })
                            : "Today"}{" "}
                          -{" "}
                          {booking?.returndate
                            ? new Date(booking.returndate).toLocaleDateString("en-IN", {
                                dateStyle: "medium",
                              })
                            : "3 Days"}
                        </div>
                      </td>

                      <td>
                        <span className="fw-bold text-dark">
                          ₹{booking?.totalprice?.toLocaleString() || "4,500"}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`badge-status badge-status-${
                            booking?.status?.toLowerCase() || "confirmed"
                          }`}
                        >
                          {booking?.status || "Confirmed"}
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          onClick={() => setBookingDetails(booking)}
                          className="btn btn-sm btn-outline-primary rounded-circle p-2"
                          title="View Reservation Voucher"
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <Car size={40} className="text-muted mb-2" />
              <h6 className="fw-bold text-dark">No Bookings Found</h6>
              <p className="text-muted small">You haven't reserved any vehicles yet.</p>
              <a href="/cars" className="btn btn-primary-custom btn-sm">
                Explore Available Fleet
              </a>
            </div>
          )}
        </div>
      )}

      {/* TAB B: Admin - All Bookings */}
      {isAdmin && activeTab === "admin-bookings" && (
        <div className="bg-white rounded-4 shadow-sm border border-light p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark mb-0">All Customer Reservations (Fleet Admin)</h5>
            <small className="text-muted">Update reservation statuses across the company</small>
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="bg-light">
                <tr className="text-muted small text-uppercase">
                  <th>Client</th>
                  <th>Vehicle</th>
                  <th>Duration</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allAdminBookings.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <div className="fw-bold text-dark">
                        {b.user?.username || "Verified Customer"}
                      </div>
                      <small className="text-muted">{b.user?.phone || "No phone"}</small>
                    </td>

                    <td>
                      <div className="fw-semibold text-dark">{b.car?.name || "Vehicle"}</div>
                    </td>

                    <td>
                      <div className="small text-muted">
                        {b.startdate?.slice(0, 10)} to {b.returndate?.slice(0, 10)}
                      </div>
                    </td>

                    <td>
                      <span className="fw-bold text-dark">
                        ₹{b.totalprice?.toLocaleString() || "6,000"}
                      </span>
                    </td>

                    <td>
                      <span className={`badge-status badge-status-${b.status || "confirmed"}`}>
                        {b.status || "confirmed"}
                      </span>
                    </td>

                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={b.status || "confirmed"}
                        onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="completed">Complete</option>
                        <option value="canceled">Cancel</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB C: Admin - Add Vehicle to Fleet */}
      {isAdmin && activeTab === "admin-fleet" && (
        <div className="bg-white rounded-4 shadow-sm border border-light p-4">
          <h5 className="fw-bold text-dark mb-1">Add New Vehicle to Showroom Fleet</h5>
          <p className="text-muted small mb-4">
            Register new cars with high-resolution image URLs, specifications, and daily rates.
          </p>

          <form onSubmit={handleAddCarSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted">Car Brand & Model</label>
                <input
                  type="text"
                  className="form-control widget-input"
                  placeholder="e.g. BMW M340i xDrive"
                  value={newCar.name}
                  onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label small fw-bold text-muted">Category</label>
                <select
                  className="form-select widget-input"
                  value={newCar.category}
                  onChange={(e) => setNewCar({ ...newCar, category: e.target.value })}
                >
                  <option value="Luxury">Luxury</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Electric">Electric</option>
                  <option value="Hatchback">Hatchback</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label small fw-bold text-muted">Year</label>
                <input
                  type="number"
                  className="form-control widget-input"
                  value={newCar.year}
                  onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label small fw-bold text-muted">Daily Rental Rate (₹)</label>
                <input
                  type="number"
                  className="form-control widget-input"
                  value={newCar.price}
                  onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label small fw-bold text-muted">Fuel Type</label>
                <select
                  className="form-select widget-input"
                  value={newCar.fuel}
                  onChange={(e) => setNewCar({ ...newCar, fuel: e.target.value })}
                >
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label small fw-bold text-muted">Transmission</label>
                <select
                  className="form-select widget-input"
                  value={newCar.transmission}
                  onChange={(e) => setNewCar({ ...newCar, transmission: e.target.value === "true" })}
                >
                  <option value="true">Automatic</option>
                  <option value="false">Manual</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label small fw-bold text-muted">Seats</label>
                <input
                  type="number"
                  className="form-control widget-input"
                  value={newCar.seats}
                  onChange={(e) => setNewCar({ ...newCar, seats: e.target.value })}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold text-muted">
                  Vehicle Image URL (Direct Unsplash / Cloudinary link)
                </label>
                <input
                  type="url"
                  className="form-control widget-input"
                  value={newCar.image}
                  onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label small fw-bold text-muted">About Vehicle / Highlights</label>
                <textarea
                  className="form-control widget-input"
                  rows={3}
                  value={newCar.about}
                  onChange={(e) => setNewCar({ ...newCar, about: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="col-12 text-end">
                <button
                  type="submit"
                  className="btn btn-primary-custom px-4 py-2"
                  disabled={addingCar}
                >
                  {addingCar ? "Saving Vehicle..." : "Save Vehicle to Fleet"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Edit Profile Modal */}
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

      {/* Booking Voucher Modal */}
      {bookingDetails && (
        <BookingDetails
          booking={bookingDetails}
          setBookingDetails={setBookingDetails}
        />
      )}
    </div>
  );
};

export default Profile;
