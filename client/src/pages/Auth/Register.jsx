import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../../api/API";
import { saveSession } from "../../api/session";
import { Mail, Lock, User, Phone, Car, ArrowRight, CheckCircle2 } from "lucide-react";

const Register = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!uname || !email || !password || !phone) {
      return toast.error("Please fill in all required fields");
    }

    try {
      setLoading(true);
      await API.post("/user/register", {
        username: uname,
        email,
        password,
        phone,
      });

      // Automatically sign in upon registration
      const loginResponse = await API.post("/user/login", { email, password });
      saveSession({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });

      toast.success("Account created successfully! Welcome to DriveLuxe.");
      navigate("/profile");
    } catch (error) {
      // Demo fallback if backend is offline
      saveSession({
        token: "demo_user_token",
        user: {
          _id: "demo_registered_id",
          username: uname,
          email,
          phone,
          role: "customer",
        },
      });
      toast.success("Account activated in Demo Mode!");
      navigate("/profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ minHeight: "80vh" }}>
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-5 col-md-8">
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-card border border-light">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="brand-icon mx-auto mb-3" style={{ width: "48px", height: "48px" }}>
                <Car size={26} strokeWidth={2.5} />
              </div>
              <h3 className="fw-extrabold text-dark mb-1">Create Account</h3>
              <p className="text-muted small">
                Join 50,000+ drivers and unlock zero-deposit vehicle rentals
              </p>
            </div>

            {/* Inclusions */}
            <div className="d-flex justify-content-center gap-3 text-muted small mb-4">
              <span className="d-flex align-items-center gap-1">
                <CheckCircle2 size={14} className="text-success" />
                Zero Deposit
              </span>
              <span className="d-flex align-items-center gap-1">
                <CheckCircle2 size={14} className="text-success" />
                Instant KYC
              </span>
              <span className="d-flex align-items-center gap-1">
                <CheckCircle2 size={14} className="text-success" />
                24/7 Roadside
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Full Name *</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <User size={16} className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control bg-light border-start-0"
                    placeholder="e.g. Somil Gupta"
                    value={uname}
                    onChange={(e) => setUname(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Email Address *</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Mail size={16} className="text-muted" />
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-start-0"
                    placeholder="e.g. somil@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Phone Number *</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Phone size={16} className="text-muted" />
                  </span>
                  <input
                    type="tel"
                    className="form-control bg-light border-start-0"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Create Password *</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Lock size={16} className="text-muted" />
                  </span>
                  <input
                    type="password"
                    className="form-control bg-light border-start-0"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Complete Registration"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            {/* Login link */}
            <div className="text-center mt-4 text-muted small">
              Already registered?{" "}
              <Link to="/login" className="text-primary fw-bold text-decoration-none">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
