import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../../api/API";
import { saveSession } from "../../api/session";
import { Mail, Lock, Car, ShieldCheck, User, Sparkles, ArrowRight } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please enter email and password");
    }

    try {
      setLoading(true);
      const { data } = await API.post("/user/login", { email, password });
      saveSession({ token: data.token, user: data.user });
      toast.success("Login Successful! Welcome back.");
      navigate("/profile");
    } catch (error) {
      // If server is not responding, fallback for demo credentials
      if (email === "admin@cardrive.com" && password === "admin123") {
        saveSession({
          token: "demo_admin_token",
          user: {
            _id: "demo_admin_id",
            username: "DriveLuxe Admin",
            email: "admin@cardrive.com",
            phone: "+91 98765 43210",
            role: "admin",
          },
        });
        toast.success("Welcome, Fleet Admin! (Demo Mode)");
        navigate("/profile");
      } else if (email === "alex@example.com" && password === "user123") {
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
        toast.success("Welcome, Alex! (Demo Mode)");
        navigate("/profile");
      } else {
        toast.error(error.response?.data?.message || "Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (role) => {
    if (role === "admin") {
      setEmail("admin@cardrive.com");
      setPassword("admin123");
    } else {
      setEmail("alex@example.com");
      setPassword("user123");
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
              <h3 className="fw-extrabold text-dark mb-1">Welcome Back</h3>
              <p className="text-muted small">Access your reservations, invoices & profile</p>
            </div>

            {/* Quick Demo Fill Buttons */}
            <div className="p-3 bg-light rounded-3 mb-4 border border-light">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="small fw-bold text-dark d-flex align-items-center gap-1">
                  <Sparkles size={14} className="text-warning" />
                  <span>Quick Demo Access</span>
                </span>
                <small className="text-muted">1-Click Auto Fill</small>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                  onClick={() => fillDemo("customer")}
                >
                  <User size={13} />
                  <span>Customer Demo</span>
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                  onClick={() => fillDemo("admin")}
                >
                  <ShieldCheck size={13} />
                  <span>Admin Demo</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Mail size={16} className="text-muted" />
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-start-0"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Lock size={16} className="text-muted" />
                  </span>
                  <input
                    type="password"
                    className="form-control bg-light border-start-0"
                    placeholder="Enter password"
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
                {loading ? "Authenticating..." : "Sign In to DriveLuxe"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            {/* Register link */}
            <div className="text-center mt-4 text-muted small">
              Don't have an account yet?{" "}
              <Link to="/register" className="text-primary fw-bold text-decoration-none">
                Register Free
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
