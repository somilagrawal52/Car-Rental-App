import React from "react";
import { Link, useLocation } from "react-router-dom";
import { clearSession, getStoredUser, saveSession } from "../api/session";
import { Car, ShieldCheck, User, LogOut, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const Header = () => {
  const user = getStoredUser();
  const location = useLocation();

  const handleLogout = () => {
    clearSession();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const handleQuickDemoLogin = (role) => {
    if (role === "admin") {
      const demoAdmin = {
        _id: "demo_admin_id",
        username: "DriveLuxe Admin",
        email: "admin@cardrive.com",
        phone: "+91 98765 43210",
        role: "admin",
      };
      saveSession({
        token: "demo_admin_token",
        user: demoAdmin,
      });
      toast.success("Switched to Admin Demo Mode");
      window.location.href = "/profile";
    } else {
      const demoCustomer = {
        _id: "demo_customer_id",
        username: "Alex Rivera",
        email: "alex@example.com",
        phone: "+91 91234 56780",
        role: "customer",
      };
      saveSession({
        token: "demo_customer_token",
        user: demoCustomer,
      });
      toast.success("Switched to Customer Demo Mode");
      window.location.href = "/profile";
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg custom-navbar sticky-top py-3">
      <div className="container">
        {/* Brand Logo */}
        <Link className="brand-logo" to="/">
          <div className="brand-icon">
            <Car size={20} strokeWidth={2.5} />
          </div>
          <div>
            <span>Drive</span>
            <span style={{ color: "#2563eb" }}>Luxe</span>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMainContent"
          aria-controls="navbarMainContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarMainContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
            <li className="nav-item">
              <Link
                className={`nav-link-custom ${isActive("/") ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link-custom ${isActive("/cars") ? "active" : ""}`}
                to="/cars"
              >
                Explore Fleet
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link-custom ${isActive("/about") ? "active" : ""}`}
                to="/about"
              >
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link-custom ${isActive("/contact") ? "active" : ""}`}
                to="/contact"
              >
                Contact & Support
              </Link>
            </li>
          </ul>

          {/* User Controls & Demo Pills */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <Link
                  to="/profile"
                  className="d-flex align-items-center gap-2 text-decoration-none text-dark bg-light px-3 py-2 rounded-pill border"
                >
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}
                  >
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="d-flex flex-column text-start">
                    <span className="fw-bold" style={{ fontSize: "0.85rem", lineHeight: 1.2 }}>
                      {user.username?.split(" ")[0]}
                    </span>
                    <span
                      className="badge bg-secondary"
                      style={{ fontSize: "0.65rem", padding: "2px 6px" }}
                    >
                      {user.role === "admin" ? "Fleet Admin" : "Member"}
                    </span>
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm rounded-pill px-3 py-2 d-flex align-items-center gap-1"
                  title="Logout"
                >
                  <LogOut size={15} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <div className="dropdown">
                  <button
                    className="btn btn-sm btn-outline-secondary dropdown-toggle rounded-pill px-3 py-2 d-flex align-items-center gap-1"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Sparkles size={14} className="text-warning" />
                    <span>Demo Login</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 rounded-3 p-2">
                    <li>
                      <button
                        className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                        onClick={() => handleQuickDemoLogin("admin")}
                      >
                        <ShieldCheck size={16} className="text-primary" />
                        <div>
                          <div className="fw-semibold">Admin Mode</div>
                          <small className="text-muted">Manage fleet & bookings</small>
                        </div>
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider my-1" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2"
                        onClick={() => handleQuickDemoLogin("customer")}
                      >
                        <User size={16} className="text-success" />
                        <div>
                          <div className="fw-semibold">Customer Mode</div>
                          <small className="text-muted">Book cars & view dashboard</small>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>

                <Link to="/login" className="btn btn-secondary-custom btn-sm py-2 px-3">
                  Sign In
                </Link>

                <Link to="/register" className="btn btn-primary-custom btn-sm py-2 px-3">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
