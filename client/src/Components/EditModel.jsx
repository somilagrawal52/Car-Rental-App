import React from "react";
import { User, Mail, Phone, Lock, X, Check } from "lucide-react";

const EditModel = ({
  editModel,
  setEditModel,
  uname,
  setUname,
  email,
  setEmail,
  phone,
  setPhone,
  password,
  setPassword,
  handleUpdate,
}) => {
  if (!editModel) return null;

  return (
    <div className="modal-backdrop-custom">
      <div
        className="bg-white rounded-4 shadow-lg border border-light p-4"
        style={{ maxWidth: "480px", width: "100%", maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-light">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-3">
              <User size={22} />
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-dark">Edit Account Profile</h5>
              <small className="text-muted">Update your contact and credentials</small>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-light rounded-circle p-2 text-muted"
            onClick={() => setEditModel(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Inputs */}
        <div className="my-3">
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <User size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                placeholder="Enter full name"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <Mail size={16} className="text-muted" />
              </span>
              <input
                type="email"
                className="form-control bg-light border-start-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Phone Number</label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <Phone size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">
              New Password (Leave empty to keep current)
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <Lock size={16} className="text-muted" />
              </span>
              <input
                type="password"
                className="form-control bg-light border-start-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2 pt-2 border-top border-light">
          <button
            type="button"
            className="btn btn-secondary-custom flex-grow-1"
            onClick={() => setEditModel(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary-custom flex-grow-1 d-flex align-items-center justify-content-center gap-2"
            onClick={handleUpdate}
          >
            <Check size={16} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModel;
