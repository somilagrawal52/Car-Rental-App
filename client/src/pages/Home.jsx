import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllCars } from "../Store/feature/CarSlice";
import CarCard from "../Components/CarCard";
import {
  Car,
  Shield,
  Zap,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Key,
  Smartphone,
  Navigation,
} from "lucide-react";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.car);

  // Quick Search Form State
  const [pickupCity, setPickupCity] = useState("Delhi NCR");
  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (new Date(returnDate) < new Date(pickupDate)) {
      toast.error("Return date must be after pickup date");
      return;
    }
    navigate(`/cars?category=${selectedCategory}`);
  };

  const categories = ["All", "Luxury", "SUV", "Sedan", "Electric", "Hatchback"];

  const filteredCars =
    selectedCategory === "All"
      ? cars?.slice(0, 6)
      : cars?.filter((c) => c.category?.toLowerCase() === selectedCategory.toLowerCase())?.slice(0, 6);

  const testimonials = [
    {
      name: "Rohit Sharma",
      role: "Corporate Executive",
      comment: "Rented the BMW 3 Series for a 3-day client summit in Mumbai. Car was spotless, delivered right at Terminal 2, and the zero-deposit policy made expense approval effortless!",
      rating: 5,
      car: "BMW 3 Series",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Pooja Hegde",
      role: "Travel Blogger",
      comment: "Booked the Mahindra Thar 4x4 for our Himachal roadtrip. The booking took literally 2 minutes on my phone, and 24/7 roadside assistance gave us total peace of mind.",
      rating: 5,
      car: "Mahindra Thar 4x4",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
    {
      name: "Arjun Verma",
      role: "Tech Entrepreneur",
      comment: "Drove the Tesla Model 3 for a weekend trip to Pune. Immaculate vehicle, smooth handover, and excellent transparent rates with zero hidden charges. Highly recommended!",
      rating: 5,
      car: "Tesla Model 3",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-wrapper">
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="hero-tagline">
                <Sparkles size={16} />
                <span>Next-Gen Premium Self-Drive Rentals</span>
              </div>
              <h1 className="hero-title">
                Find, Book & Drive <br />
                <span style={{ color: "#60a5fa" }}>Your Dream Car</span> Today.
              </h1>
              <p className="hero-subtitle">
                Experience the open road with 500+ verified vehicles. Enjoy doorstep delivery,
                zero security deposit, unlimited km packages, and 24/7 roadside assistance.
              </p>
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <Link to="/cars" className="btn btn-primary-custom px-4 py-3">
                  <span>Explore 50+ Fleet Models</span>
                  <ArrowRight size={16} className="ms-2" />
                </Link>
                <div className="d-flex align-items-center gap-2 text-white-50 small">
                  <CheckCircle size={16} className="text-success" />
                  <span>No hidden insurance fees</span>
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block text-center">
              <img
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Car Showcase"
                className="img-fluid rounded-4 shadow-lg"
                style={{
                  border: "2px solid rgba(255,255,255,0.15)",
                  transform: "perspective(1000px) rotateY(-8deg) rotateX(4deg)",
                  transition: "transform 0.5s ease",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SEARCH / BOOKING WIDGET */}
      <div className="container">
        <div className="search-widget-container">
          <form onSubmit={handleSearchSubmit}>
            <div className="row g-3 align-items-end">
              {/* Pickup Location */}
              <div className="col-lg-3 col-md-6">
                <label className="widget-label">
                  <MapPin size={14} className="text-primary" />
                  <span>Pickup City</span>
                </label>
                <select
                  className="form-select widget-input"
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                >
                  <option value="Delhi NCR">Delhi NCR & Airport</option>
                  <option value="Mumbai">Mumbai & Navi Mumbai</option>
                  <option value="Bangalore">Bengaluru (All Hubs)</option>
                  <option value="Goa">Goa (North & South)</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune City</option>
                </select>
              </div>

              {/* Pickup Date */}
              <div className="col-lg-2 col-md-6 col-6">
                <label className="widget-label">
                  <Calendar size={14} className="text-primary" />
                  <span>Pickup Date</span>
                </label>
                <input
                  type="date"
                  className="form-control widget-input"
                  value={pickupDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                />
              </div>

              {/* Return Date */}
              <div className="col-lg-2 col-md-6 col-6">
                <label className="widget-label">
                  <Calendar size={14} className="text-primary" />
                  <span>Return Date</span>
                </label>
                <input
                  type="date"
                  className="form-control widget-input"
                  value={returnDate}
                  min={pickupDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                />
              </div>

              {/* Vehicle Category */}
              <div className="col-lg-3 col-md-6">
                <label className="widget-label">
                  <Car size={14} className="text-primary" />
                  <span>Vehicle Category</span>
                </label>
                <select
                  className="form-select widget-input"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories (Show All)</option>
                  <option value="Luxury">Luxury & Executive</option>
                  <option value="SUV">SUVs & Off-Roaders</option>
                  <option value="Sedan">Premium Sedans</option>
                  <option value="Electric">Electric & Hybrid (EV)</option>
                  <option value="Hatchback">Compact City Cars</option>
                </select>
              </div>

              {/* CTA Button */}
              <div className="col-lg-2 col-md-6">
                <button
                  type="submit"
                  className="btn btn-primary-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                >
                  <span>Search Fleet</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 3. FEATURED FLEET SHOWCASE */}
      <section className="container my-5 pt-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <span className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>
              Curated Vehicles
            </span>
            <h2 className="fw-extrabold text-dark mt-1">Explore Our Premium Fleet</h2>
            <p className="text-muted mb-0">
              Hand-picked models equipped with automatic transmission, GPS, and full sanitization.
            </p>
          </div>

          {/* Category Chips */}
          <div className="d-flex gap-2 flex-wrap mt-3 mt-md-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`category-filter-pill ${
                  selectedCategory === cat ? "active" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid */}
        <div className="row">
          {filteredCars && filteredCars.length > 0 ? (
            filteredCars.map((car) => <CarCard key={car._id || car.id} car={car} />)
          ) : (
            <div className="text-center py-5">
              <Car size={40} className="text-muted mb-2" />
              <p className="text-muted">No vehicles found in this category.</p>
            </div>
          )}
        </div>

        {/* Browse All CTA */}
        <div className="text-center mt-3">
          <Link to="/cars" className="btn btn-secondary-custom px-4 py-2 fw-semibold">
            <span>View All Available Vehicles ({cars?.length || 10}+ Cars)</span>
            <ArrowRight size={16} className="ms-2" />
          </Link>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION / WHY CHOOSE US */}
      <section className="bg-white py-5 border-top border-bottom border-light">
        <div className="container my-4">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>
              The DriveLuxe Difference
            </span>
            <h2 className="fw-bold text-dark mt-1">Why Travelers Choose Us</h2>
            <p className="text-muted">
              We engineered the car rental experience from scratch to eliminate long queues,
              hidden fees, and paperwork headaches.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="feature-box">
                <div className="feature-icon-wrapper">
                  <Shield size={26} />
                </div>
                <h5 className="fw-bold mb-2">Zero Security Deposit</h5>
                <p className="text-muted small mb-0">
                  Rent high-end vehicles without locking up your hard-earned funds. No tedious deposit refund waiting periods.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-box">
                <div className="feature-icon-wrapper">
                  <Navigation size={26} />
                </div>
                <h5 className="fw-bold mb-2">Doorstep Delivery</h5>
                <p className="text-muted small mb-0">
                  Have your sanitized car delivered directly to your home, office, or airport terminal on exact schedule.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-box">
                <div className="feature-icon-wrapper">
                  <Clock size={26} />
                </div>
                <h5 className="fw-bold mb-2">24/7 Roadside Assist</h5>
                <p className="text-muted small mb-0">
                  Travel with 100% peace of mind. Free towing, flat tyre assistance, and vehicle replacement across all cities.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="feature-box">
                <div className="feature-icon-wrapper">
                  <Zap size={26} />
                </div>
                <h5 className="fw-bold mb-2">Instant Digital KYC</h5>
                <p className="text-muted small mb-0">
                  Upload your driver's license once and get approved in under 3 minutes with zero physical paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="container my-5 py-4">
        <div className="text-center mb-5">
          <span className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>
            Effortless Process
          </span>
          <h2 className="fw-bold text-dark mt-1">Rent In 3 Simple Steps</h2>
        </div>

        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 border border-light shadow-sm h-100">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold"
                style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}
              >
                1
              </div>
              <h5 className="fw-bold mb-2">Choose Your Vehicle</h5>
              <p className="text-muted small mb-0">
                Browse our curated fleet of sedans, luxury cars, SUVs, or eco EVs matching your trip requirement.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 border border-light shadow-sm h-100">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold"
                style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}
              >
                2
              </div>
              <h5 className="fw-bold mb-2">Select Dates & Confirm</h5>
              <p className="text-muted small mb-0">
                Pick your travel dates, review transparent fee breakdown, and secure reservation instantly.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 border border-light shadow-sm h-100">
              <div
                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold"
                style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}
              >
                3
              </div>
              <h5 className="fw-bold mb-2">Hit The Open Road</h5>
              <p className="text-muted small mb-0">
                Receive the keys at your doorstep or airport. Enjoy unlimited memories with 24/7 on-road support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROMO STRIP BANNER */}
      <section className="container my-5">
        <div className="promo-strip">
          <div className="row align-items-center">
            <div className="col-lg-8 mb-3 mb-lg-0">
              <span className="badge bg-warning text-dark px-3 py-2 fw-bold text-uppercase mb-2">
                Limited Time Offer
              </span>
              <h3 className="fw-bold text-white mb-2">
                Get Flat 20% Off Your First Roadtrip Adventure
              </h3>
              <p className="text-white-50 mb-0">
                Book any vehicle for 3+ days and enjoy free airport delivery + complimentary sanitization kit.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="d-inline-flex flex-column align-items-lg-end gap-2">
                <span className="small text-white-50">Apply Promo Code at Checkout:</span>
                <span className="promo-code-box">DRIVELUXE20</span>
                <Link to="/cars" className="btn btn-warning fw-bold px-4 py-2 mt-2">
                  Claim Offer Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>
              Rider Stories
            </span>
            <h2 className="fw-bold text-dark mt-1">Loved by 50,000+ Travelers</h2>
            <p className="text-muted">Real stories from roadtrippers, business travelers, and families.</p>
          </div>

          <div className="row g-4">
            {testimonials.map((t, idx) => (
              <div key={idx} className="col-md-4">
                <div className="p-4 bg-white rounded-4 border border-light shadow-sm h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex gap-1 text-warning mb-3">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />
                      ))}
                    </div>
                    <p className="text-muted small fst-italic mb-4" style={{ lineHeight: 1.6 }}>
                      "{t.comment}"
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3 pt-3 border-top border-light">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="rounded-circle"
                      width={44}
                      height={44}
                      style={{ objectFit: "cover" }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0 text-dark">{t.name}</h6>
                      <small className="text-muted">{t.role} • {t.car}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section className="container my-5 py-4 text-center">
        <div className="p-5 rounded-4 bg-white border border-light shadow-card">
          <h2 className="fw-bold text-dark mb-3">Ready to Start Your Journey?</h2>
          <p className="text-muted max-w-600 mx-auto mb-4">
            Choose from the country's finest fleet of self-drive vehicles. Instant confirmation,
            flexible cancellation, and unmatched customer support.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/cars" className="btn btn-primary-custom px-4 py-3">
              <span>Browse All Vehicles</span>
              <ArrowRight size={16} className="ms-2" />
            </Link>
            <Link to="/contact" className="btn btn-secondary-custom px-4 py-3">
              Talk to Our Fleet Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
