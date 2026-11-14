import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Zap,
  Users,
  Award,
  CheckCircle2,
  HeartHandshake,
  ArrowRight,
  Car,
  Clock,
  Sparkles,
} from "lucide-react";

const About = () => {
  const stats = [
    { label: "Cities Nationwide", value: "50+" },
    { label: "Verified Vehicles", value: "500+" },
    { label: "Happy Roadtrips", value: "100k+" },
    { label: "Customer Rating", value: "4.9 ★" },
  ];

  const pillars = [
    {
      icon: <Shield size={28} className="text-primary" />,
      title: "Zero Security Deposit",
      desc: "We believe in trust-first mobility. Rent any vehicle without locking up your hard-earned savings in tedious security deposits.",
    },
    {
      icon: <CheckCircle2 size={28} className="text-success" />,
      title: "24-Point Safety Inspection",
      desc: "Every car undergoes strict mechanical diagnostics, brake analysis, tyre thread inspection, and thorough sanitization before handover.",
    },
    {
      icon: <Clock size={28} className="text-warning" />,
      title: "24/7 Roadside Assistance",
      desc: "No matter where you are, our pan-India towing and technical response network is one tap away to ensure your safety and trip continuity.",
    },
    {
      icon: <Zap size={28} className="text-info" />,
      title: "Electric & Sustainable Future",
      desc: "Pioneering the green transition with an ever-expanding fleet of luxury and compact Electric Vehicles (EVs) for eco-conscious travel.",
    },
  ];

  return (
    <div className="about-page">
      {/* 1. Header Hero */}
      <section className="hero-wrapper text-center py-5">
        <div className="container py-3">
          <div className="hero-tagline mx-auto">
            <Sparkles size={16} />
            <span>Redefining Modern Car Rentals</span>
          </div>
          <h1 className="hero-title max-w-800 mx-auto">
            Empowering Freedom of Travel, <br />
            <span style={{ color: "#60a5fa" }}>One Journey at a Time</span>
          </h1>
          <p className="hero-subtitle mx-auto">
            Founded with a vision to eliminate the friction, hidden fees, and queues of traditional
            car rental agencies. DriveLuxe brings you doorstep delivery, immaculate vehicles, and
            unbeatable customer delight.
          </p>
        </div>
      </section>

      {/* 2. Key Metrics Strip */}
      <div className="container" style={{ marginTop: "-35px", position: "relative", zIndex: 10 }}>
        <div className="bg-white rounded-4 shadow-card p-4 border border-light">
          <div className="row g-3 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="col-6 col-md-3">
                <div className="p-2">
                  <h2 className="fw-extrabold text-primary mb-0">{stat.value}</h2>
                  <span className="small text-muted fw-semibold">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Our Story & Purpose */}
      <section className="container my-5 py-4">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <span className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>
              Our Story
            </span>
            <h2 className="fw-bold text-dark mt-1 mb-3">
              Built by Roadtrippers, Designed for Modern Explorers
            </h2>
            <p className="text-secondary" style={{ lineHeight: 1.7 }}>
              We started DriveLuxe after experiencing the frustrations of outdated car rental companies:
              surprise extra charges, unwashed interiors, sluggish verification, and endless deposit refund delays.
            </p>
            <p className="text-secondary" style={{ lineHeight: 1.7 }}>
              Today, DriveLuxe is one of the fastest-growing self-drive mobility platforms in the country.
              Whether you need an executive luxury sedan for an important meeting, an off-road SUV for mountain terrain,
              or an eco-friendly EV for city commutes, our technology ensures your car is ready in minutes.
            </p>
            <div className="d-flex gap-3 mt-4">
              <Link to="/cars" className="btn btn-primary-custom px-4 py-2">
                Explore The Fleet
              </Link>
              <Link to="/contact" className="btn btn-secondary-custom px-4 py-2">
                Contact Our Team
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80"
              alt="Roadtrip Lifestyle"
              className="img-fluid rounded-4 shadow-card"
            />
          </div>
        </div>
      </section>

      {/* 4. Core Pillars */}
      <section className="bg-white py-5 border-top border-bottom border-light">
        <div className="container py-3">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>
              Our Promise
            </span>
            <h2 className="fw-bold text-dark mt-1">The Core Pillars We Stand By</h2>
            <p className="text-muted">
              We never compromise on safety, transparency, or the standard of our fleet.
            </p>
          </div>

          <div className="row g-4">
            {pillars.map((p, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="feature-box h-100">
                  <div className="feature-icon-wrapper">{p.icon}</div>
                  <h5 className="fw-bold text-dark mb-2">{p.title}</h5>
                  <p className="text-muted small mb-0" style={{ lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Strip */}
      <section className="container my-5 py-4 text-center">
        <div className="p-5 rounded-4 bg-primary text-white shadow-card">
          <h2 className="fw-bold mb-3">Join The Future of Self-Drive Mobility</h2>
          <p className="text-white-50 max-w-600 mx-auto mb-4">
            Experience the freedom of driving premium cars without the burden of ownership.
          </p>
          <Link to="/cars" className="btn btn-light text-primary fw-bold px-4 py-3 rounded-3">
            <span>Browse Available Vehicles</span>
            <ArrowRight size={16} className="ms-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
