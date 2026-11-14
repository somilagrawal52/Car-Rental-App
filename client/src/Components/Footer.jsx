import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Phone, Mail, MapPin, Shield, CheckCircle2, Send } from "lucide-react";
import toast from "react-hot-toast";

const Footer = () => {
  const [emailInput, setEmailInput] = useState("");

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!emailInput) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you! You've received a 15% discount coupon in your inbox.");
    setEmailInput("");
  };

  return (
    <footer className="footer-dark mt-5">
      <div className="container">
        {/* Top Feature Badges Row */}
        <div className="row g-3 pb-4 mb-4 border-bottom border-secondary border-opacity-25">
          <div className="col-md-4 d-flex align-items-center gap-3">
            <div className="bg-primary bg-opacity-25 p-3 rounded-circle text-primary">
              <Shield size={22} />
            </div>
            <div>
              <h6 className="text-white mb-0 fw-bold">Zero Security Deposit</h6>
              <small className="text-secondary">Flexible rentals with zero blocked funds</small>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center gap-3">
            <div className="bg-success bg-opacity-25 p-3 rounded-circle text-success">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h6 className="text-white mb-0 fw-bold">100% Sanitized Fleet</h6>
              <small className="text-secondary">24-point pre-delivery inspection check</small>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center gap-3">
            <div className="bg-warning bg-opacity-25 p-3 rounded-circle text-warning">
              <Phone size={22} />
            </div>
            <div>
              <h6 className="text-white mb-0 fw-bold">24/7 Roadside Assist</h6>
              <small className="text-secondary">Instant breakdown & replacement support</small>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="row g-4 py-3">
          {/* Brand Info */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="brand-icon">
                <Car size={20} strokeWidth={2.5} />
              </div>
              <h4 className="text-white fw-bold mb-0">
                Drive<span className="text-primary">Luxe</span>
              </h4>
            </div>
            <p className="text-secondary small pe-lg-4">
              Premium self-drive vehicle rentals for vacations, business trips, and weekend
              escapes. Guaranteed best rates, doorstep delivery, and transparent pricing with
              no hidden surprises.
            </p>
            <div className="d-flex gap-3 text-secondary mt-3">
              <i className="fa-brands fa-facebook fa-lg text-white-50 hover-text-white cursor-pointer"></i>
              <i className="fa-brands fa-x-twitter fa-lg text-white-50 hover-text-white cursor-pointer"></i>
              <i className="fa-brands fa-instagram fa-lg text-white-50 hover-text-white cursor-pointer"></i>
              <i className="fa-brands fa-linkedin fa-lg text-white-50 hover-text-white cursor-pointer"></i>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-white fw-bold mb-3">Fleet Categories</h6>
            <Link to="/cars" className="footer-link">Luxury Sedans</Link>
            <Link to="/cars" className="footer-link">Off-Road SUVs</Link>
            <Link to="/cars" className="footer-link">Electric Vehicles</Link>
            <Link to="/cars" className="footer-link">Family 7-Seaters</Link>
            <Link to="/cars" className="footer-link">City Hatchbacks</Link>
          </div>

          {/* Company */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-white fw-bold mb-3">Company</h6>
            <Link to="/about" className="footer-link">About DriveLuxe</Link>
            <Link to="/cars" className="footer-link">Our Pricing</Link>
            <Link to="/contact" className="footer-link">Contact Support</Link>
            <Link to="/contact" className="footer-link">FAQ & Helpdesk</Link>
            <Link to="/about" className="footer-link">Rental Guidelines</Link>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h6 className="text-white fw-bold mb-3">Get Special Roadtrip Deals</h6>
            <p className="text-secondary small">
              Subscribe to unlock members-only weekend discounts, fuel vouchers, and holiday offers.
            </p>
            <form onSubmit={handleNewsletter} className="d-flex gap-2">
              <input
                type="email"
                className="form-control form-control-sm bg-dark text-white border-secondary"
                placeholder="Enter your email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm px-3 d-flex align-items-center gap-1">
                <Send size={14} />
                <span>Join</span>
              </button>
            </form>
            <div className="mt-3 small text-secondary d-flex align-items-center gap-2">
              <Phone size={14} className="text-primary" />
              <span>24/7 Helpline: +91 1800-419-2020</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 mt-4 border-top border-secondary border-opacity-25 small text-secondary">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} DriveLuxe Technologies Inc. All rights reserved. Built for seamless self-drive mobility.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
