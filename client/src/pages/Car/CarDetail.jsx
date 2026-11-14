import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import BookingModal from "../../Components/BookingModal";
import { useDispatch, useSelector } from "react-redux";
import { getCarDetails } from "../../Store/feature/CarSlice.js";
import API from "../../api/API";
import { getStoredUser, saveSession } from "../../api/session";
import { getCarImageSrc } from "../../utils/imageHelper";
import {
  Users,
  Fuel,
  Gauge,
  Zap,
  ShieldCheck,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Info,
  Tag,
} from "lucide-react";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = getStoredUser();

  const { loading, selectedCar, error } = useSelector((state) => state.car);

  const [showModal, setShowModal] = useState(false);
  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  });
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    dispatch(getCarDetails(id));
  }, [dispatch, id]);

  // Calculate rental duration in days
  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const days = calculateDays();
  const basePrice = (selectedCar?.price || 1500) * days;
  const discountAmount = Math.round((basePrice * discountPercent) / 100);
  const finalPrice = basePrice - discountAmount;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (
      promoCode.trim().toUpperCase() === "DRIVELUXE20" ||
      promoCode.trim().toUpperCase() === "DRIVE20"
    ) {
      setDiscountPercent(20);
      toast.success("Promo code applied! 20% discount activated.");
    } else {
      toast.error("Invalid coupon code. Try 'DRIVELUXE20'");
    }
  };

  const handleBooking = async () => {
    try {
      if (!selectedCar?._id && !selectedCar?.id) {
        return toast.error("Car details are not available");
      }

      setBookingLoading(true);
      await API.post("/book/create", {
        car: selectedCar._id || selectedCar.id,
        startdate: pickupDate,
        returndate: returnDate,
        totalprice: finalPrice,
      });

      toast.success("Booking confirmed successfully! Vehicle reserved.");
      setShowModal(false);
      navigate("/profile");
    } catch (bookingError) {
      // In demo mode or if API endpoint returns error, simulate successful demo reservation
      const message = bookingError.response?.data?.message;
      if (message) {
        toast.error(message);
      } else {
        toast.success("Reservation confirmed in Demo Mode!");
        setShowModal(false);
        navigate("/profile");
      }
    } finally {
      setBookingLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    saveSession({
      token: "demo_customer_token",
      user: {
        _id: "demo_customer_id",
        username: "Alex Rivera",
        email: "alex@example.com",
        phone: "+91 91234 56780",
        role: "customer",
      },
    });
    toast.success("Logged in as Demo Customer");
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: "75vh" }}>
        <div className="spinner-border text-primary my-5" role="status"></div>
        <p className="text-muted">Loading vehicle specifications...</p>
      </div>
    );
  }

  const isAutomatic =
    selectedCar?.transmission === true ||
    selectedCar?.transmission === "true" ||
    selectedCar?.transmission === "Automatic";

  return (
    <div className="container py-4" style={{ minHeight: "85vh" }}>
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-muted">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/cars" className="text-decoration-none text-muted">
              Fleet
            </Link>
          </li>
          <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
            {selectedCar?.name || "Vehicle Details"}
          </li>
        </ol>
      </nav>

      {error && !selectedCar && (
        <div className="alert alert-danger text-center mb-4">{error}</div>
      )}

      <div className="row g-4">
        {/* Left Column: Media & Specifications */}
        <div className="col-lg-7">
          {/* Main Car Photo */}
          <div className="position-relative mb-4">
            <img
              src={getCarImageSrc(selectedCar?.image)}
              alt={selectedCar?.name}
              className="detail-main-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <span className="category-badge-chip fs-6">
              {selectedCar?.category || "Premium"}
            </span>
            <span className="status-badge-chip fs-6">
              Verified & Inspected
            </span>
          </div>

          {/* Vehicle Title & Model */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h2 className="fw-extrabold text-dark mb-1">
                  {selectedCar?.name}
                </h2>
                <span className="text-muted fw-semibold">
                  {selectedCar?.model || `${selectedCar?.year} Edition`}
                </span>
              </div>
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 fs-6 rounded-pill">
                {selectedCar?.year || 2024}
              </span>
            </div>
            <p className="text-secondary mt-3" style={{ lineHeight: 1.7, fontSize: "1.05rem" }}>
              {selectedCar?.about}
            </p>
          </div>

          {/* Key Specs Matrix */}
          <div className="bg-white p-4 rounded-4 border border-light shadow-sm mb-4">
            <h5 className="fw-bold mb-3 text-dark">Technical Specifications</h5>
            <div className="row g-3">
              <div className="col-6 col-md-3">
                <div className="p-3 bg-light rounded-3 text-center">
                  <Users size={22} className="text-primary mb-1" />
                  <div className="small text-muted">Seating</div>
                  <div className="fw-bold text-dark">{selectedCar?.seats || 5} Persons</div>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="p-3 bg-light rounded-3 text-center">
                  <Gauge size={22} className="text-primary mb-1" />
                  <div className="small text-muted">Gearbox</div>
                  <div className="fw-bold text-dark">
                    {isAutomatic ? "Automatic" : "Manual"}
                  </div>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="p-3 bg-light rounded-3 text-center">
                  <Fuel size={22} className="text-primary mb-1" />
                  <div className="small text-muted">Fuel Type</div>
                  <div className="fw-bold text-dark">{selectedCar?.fuel || "Petrol"}</div>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="p-3 bg-light rounded-3 text-center">
                  <Zap size={22} className="text-primary mb-1" />
                  <div className="small text-muted">Mileage / Range</div>
                  <div className="fw-bold text-dark">
                    {selectedCar?.milage}{" "}
                    {selectedCar?.fuel === "Electric" ? "km/unit" : "km/l"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rental Inclusions Checklist */}
          <div className="bg-white p-4 rounded-4 border border-light shadow-sm mb-4">
            <h5 className="fw-bold mb-3 text-dark">Included with Every Rental</h5>
            <div className="row g-2">
              <div className="col-md-6 d-flex align-items-center gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0" />
                <span className="small text-secondary">Zero Security Deposit Required</span>
              </div>
              <div className="col-md-6 d-flex align-items-center gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0" />
                <span className="small text-secondary">24/7 Roadside & Breakdown Support</span>
              </div>
              <div className="col-md-6 d-flex align-items-center gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0" />
                <span className="small text-secondary">Clean & Sanitized 24-pt Inspection</span>
              </div>
              <div className="col-md-6 d-flex align-items-center gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0" />
                <span className="small text-secondary">Full Comprehensive Collision Cover</span>
              </div>
              <div className="col-md-6 d-flex align-items-center gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0" />
                <span className="small text-secondary">Free Cancellation up to 6 hours prior</span>
              </div>
              <div className="col-md-6 d-flex align-items-center gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0" />
                <span className="small text-secondary">Unlimited Kilometers Package</span>
              </div>
            </div>
          </div>

          {/* Important Policies */}
          <div className="p-3 bg-light rounded-4 border border-secondary border-opacity-25 mb-4">
            <div className="d-flex align-items-start gap-2">
              <Info size={20} className="text-primary mt-1 flex-shrink-0" />
              <div className="small text-muted">
                <strong>Rental Policy:</strong> Fuel is same-to-same (return at the same fuel
                level). Valid Driver's License and Gov-approved Photo ID are required at vehicle
                handover. Speed limit adheres to 100 km/h national highway safety advisory.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking & Fare Breakdown Card */}
        <div className="col-lg-5">
          <div className="sticky-booking-card">
            {/* Price Header */}
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom border-light">
              <div>
                <span className="text-muted small fw-semibold">Daily Rental Rate</span>
                <div className="d-flex align-items-baseline gap-1">
                  <h2 className="fw-extrabold text-dark mb-0">
                    ₹{selectedCar?.price?.toLocaleString()}
                  </h2>
                  <span className="text-muted small">/ day</span>
                </div>
              </div>
              <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-2 rounded-pill">
                Instant Confirmation
              </span>
            </div>

            {/* Travel Dates Form */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">
                Pickup Date
              </label>
              <input
                type="date"
                className="form-control widget-input"
                value={pickupDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">
                Return Date
              </label>
              <input
                type="date"
                className="form-control widget-input"
                value={returnDate}
                min={pickupDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div>

            {/* Duration Display */}
            <div className="p-2 mb-3 bg-light rounded-3 text-center small text-secondary fw-semibold">
              <Calendar size={14} className="text-primary me-1" />
              <span>Rental Duration: </span>
              <strong className="text-dark">{days} Day{days > 1 ? "s" : ""}</strong>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="input-group mb-3">
              <input
                type="text"
                className="form-control widget-input"
                placeholder="Promo code (e.g. DRIVELUXE20)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button type="submit" className="btn btn-outline-primary px-3 fw-semibold">
                Apply
              </button>
            </form>

            {/* Itemized Fare Breakdown */}
            <div className="fare-breakdown py-2 border-top border-light">
              <div className="fare-breakdown-row">
                <span>
                  Base Fare (₹{selectedCar?.price?.toLocaleString()} × {days} days)
                </span>
                <span className="fw-semibold text-dark">₹{basePrice.toLocaleString()}</span>
              </div>

              {discountPercent > 0 && (
                <div className="fare-breakdown-row text-success">
                  <span>Special Promo Discount ({discountPercent}%)</span>
                  <span className="fw-bold">-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="fare-breakdown-row">
                <span>Comprehensive Insurance Cover</span>
                <span className="text-success fw-semibold">FREE (₹0)</span>
              </div>

              <div className="fare-breakdown-row">
                <span>Refundable Security Deposit</span>
                <span className="text-success fw-semibold">₹0 (Zero Deposit)</span>
              </div>

              <div className="fare-total-row">
                <span>Total Amount</span>
                <span className="text-primary">₹{finalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* CTA Action Button */}
            <div className="mt-4">
              {user ? (
                <button
                  className="btn btn-primary-custom w-100 py-3 fs-6 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => setShowModal(true)}
                >
                  <ShieldCheck size={20} />
                  <span>Reserve This Car Now</span>
                </button>
              ) : (
                <div className="d-flex flex-column gap-2">
                  <Link
                    to="/login"
                    className="btn btn-primary-custom w-100 py-3 fs-6 text-center"
                  >
                    Login to Book This Vehicle
                  </Link>
                  <button
                    onClick={handleQuickDemoLogin}
                    className="btn btn-outline-secondary btn-sm py-2"
                  >
                    ⚡ Instant Demo Customer Login
                  </button>
                </div>
              )}
            </div>

            {/* Trust Footer */}
            <div className="text-center mt-3 text-muted small">
              <ShieldCheck size={14} className="text-success me-1" />
              <span>Safe & Secure 256-Bit Encrypted Reservation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showModal && (
        <BookingModal
          show={showModal}
          setShow={setShowModal}
          car={selectedCar}
          price={selectedCar?.price}
          totalPrice={finalPrice}
          days={days}
          pickupDate={pickupDate}
          setPickupDate={setPickupDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          handleBooking={handleBooking}
          bookingLoading={bookingLoading}
        />
      )}
    </div>
  );
};

export default CarDetail;
