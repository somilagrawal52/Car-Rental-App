import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  HelpCircle,
  Send,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Reservation Query",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you! Our concierge team will reach out to you within 15 minutes.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Reservation Query",
        message: "",
      });
      setSubmitting(false);
    }, 600);
  };

  const faqs = [
    {
      q: "What documents are required to rent a vehicle?",
      a: "All you need is an original government-issued Driver's License (held for at least 1 year) and a valid ID proof (Aadhaar Card, Passport, or Voter ID). Digital verification takes under 3 minutes.",
    },
    {
      q: "Is there really zero security deposit?",
      a: "Yes! At DriveLuxe, we offer zero deposit rentals on verified customer profiles. Your funds stay in your account with zero deduction holds.",
    },
    {
      q: "What is your fuel policy?",
      a: "We operate on a simple Same-to-Same fuel policy. The fuel level provided at vehicle handover is the level you return the vehicle with. If returned with less fuel, local market fuel rates apply.",
    },
    {
      q: "Can I receive delivery at the airport terminal?",
      a: "Absolutely! We provide dedicated airport terminal delivery and collection across Delhi T1/T2/T3, Mumbai T2, Bengaluru Terminal, Goa Dabolim & MOPA, and Hyderabad.",
    },
    {
      q: "What happens if the vehicle has a flat tyre or breakdown?",
      a: "Our 24/7 Roadside Assistance network covers all major highways and cities. Simply call our toll-free hotline (+91 1800-419-2020) and a service van or replacement vehicle will be dispatched immediately.",
    },
  ];

  return (
    <div className="contact-page">
      {/* 1. Hero Header */}
      <section className="hero-wrapper text-center py-5">
        <div className="container py-3">
          <div className="hero-tagline mx-auto">
            <Clock size={16} />
            <span>24/7 Dedicated Concierge & Fleet Care</span>
          </div>
          <h1 className="hero-title max-w-800 mx-auto">
            We’re Always Here to <br />
            <span style={{ color: "#60a5fa" }}>Support Your Journey</span>
          </h1>
          <p className="hero-subtitle mx-auto">
            Need assistance with an existing booking, airport delivery request, or corporate fleet inquiry?
            Our support concierges are available 24 hours a day, 7 days a week.
          </p>
        </div>
      </section>

      {/* 2. Quick Contact Cards Strip */}
      <div className="container" style={{ marginTop: "-35px", position: "relative", zIndex: 10 }}>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-card border border-light text-center h-100">
              <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle d-inline-flex mb-3">
                <Phone size={24} />
              </div>
              <h5 className="fw-bold text-dark mb-1">24/7 Roadside Hotline</h5>
              <p className="text-muted small mb-2">Toll-free emergency & booking assist</p>
              <a href="tel:18004192020" className="fw-bold text-primary text-decoration-none">
                +91 1800-419-2020
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-card border border-light text-center h-100">
              <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle d-inline-flex mb-3">
                <MessageSquare size={24} />
              </div>
              <h5 className="fw-bold text-dark mb-1">WhatsApp Concierge</h5>
              <p className="text-muted small mb-2">Instant messaging & booking updates</p>
              <span className="fw-bold text-success">+91 98765-43210</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 bg-white rounded-4 shadow-card border border-light text-center h-100">
              <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle d-inline-flex mb-3">
                <Mail size={24} />
              </div>
              <h5 className="fw-bold text-dark mb-1">Email Concierge</h5>
              <p className="text-muted small mb-2">Corporate rentals & invoice inquiries</p>
              <a
                href="mailto:concierge@driveluxe.com"
                className="fw-bold text-dark text-decoration-none"
              >
                concierge@driveluxe.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Form and Office Locations */}
      <section className="container my-5 py-3">
        <div className="row g-5">
          {/* Inquiry Form */}
          <div className="col-lg-7">
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
              <span className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>
                Send A Message
              </span>
              <h3 className="fw-bold text-dark mt-1 mb-2">How Can We Help You?</h3>
              <p className="text-muted small mb-4">
                Fill in the details below and our team will get in touch promptly.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Full Name *</label>
                    <input
                      type="text"
                      className="form-control widget-input"
                      placeholder="e.g. Somil Gupta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Email Address *</label>
                    <input
                      type="email"
                      className="form-control widget-input"
                      placeholder="e.g. somil@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Phone Number</label>
                    <input
                      type="text"
                      className="form-control widget-input"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Inquiry Subject</label>
                    <select
                      className="form-select widget-input"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="Reservation Query">Reservation / Booking Query</option>
                      <option value="Corporate Fleet">Corporate / Long-Term Rental</option>
                      <option value="Airport Pickup">Airport Delivery Request</option>
                      <option value="Feedback">Feedback / Suggestions</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold text-muted">Your Message *</label>
                    <textarea
                      className="form-control widget-input"
                      rows={4}
                      placeholder="Tell us about your trip plans, dates, or specific vehicle requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary-custom px-4 py-2 d-inline-flex align-items-center gap-2"
                      disabled={submitting}
                    >
                      <Send size={16} />
                      <span>{submitting ? "Sending..." : "Submit Inquiry"}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Regional Hubs Info */}
          <div className="col-lg-5">
            <div className="bg-light p-4 rounded-4 border border-light h-100">
              <h5 className="fw-bold text-dark mb-3">Our Core Hub Locations</h5>
              <p className="text-muted small mb-4">
                Self-drive hubs with 24/7 key-dispatch & collection desks.
              </p>

              <div className="d-flex flex-column gap-3">
                <div className="p-3 bg-white rounded-3 border border-light shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <MapPin size={16} className="text-primary" />
                    <strong className="text-dark">Delhi NCR Hub</strong>
                  </div>
                  <small className="text-muted d-block">
                    Aerocity Horizon Tower & IGI Terminal 3 Hub, New Delhi 110037
                  </small>
                </div>

                <div className="p-3 bg-white rounded-3 border border-light shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <MapPin size={16} className="text-primary" />
                    <strong className="text-dark">Mumbai Hub</strong>
                  </div>
                  <small className="text-muted d-block">
                    Bandra Kurla Complex (BKC) & Chhatrapati Shivaji Airport T2
                  </small>
                </div>

                <div className="p-3 bg-white rounded-3 border border-light shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <MapPin size={16} className="text-primary" />
                    <strong className="text-dark">Bengaluru Hub</strong>
                  </div>
                  <small className="text-muted d-block">
                    Indiranagar 100ft Rd & Kempegowda International Airport Terminal
                  </small>
                </div>

                <div className="p-3 bg-white rounded-3 border border-light shadow-sm">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <MapPin size={16} className="text-primary" />
                    <strong className="text-dark">Goa Coastal Hub</strong>
                  </div>
                  <small className="text-muted d-block">
                    Panaji Waterfront & Manohar International Airport (MOPA)
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) Accordion */}
      <section className="bg-white py-5 border-top border-light">
        <div className="container py-3">
          <div className="text-center max-w-700 mx-auto mb-5">
            <span className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: "1px" }}>
              Got Questions?
            </span>
            <h2 className="fw-bold text-dark mt-1">Frequently Asked Questions</h2>
            <p className="text-muted">Everything you need to know before booking your ride.</p>
          </div>

          <div className="accordion max-w-800 mx-auto" id="contactFaqAccordion">
            {faqs.map((faq, idx) => (
              <div key={idx} className="accordion-item border-0 mb-3 rounded-3 shadow-sm overflow-hidden">
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <button
                    className={`accordion-button fw-bold text-dark ${idx !== 0 ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${idx}`}
                    aria-expanded={idx === 0 ? "true" : "false"}
                    aria-controls={`collapse${idx}`}
                  >
                    {faq.q}
                  </button>
                </h2>
                <div
                  id={`collapse${idx}`}
                  className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                  aria-labelledby={`heading${idx}`}
                  data-bs-parent="#contactFaqAccordion"
                >
                  <div className="accordion-body text-secondary small" style={{ lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
