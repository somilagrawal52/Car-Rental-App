import React, { useState } from "react";
import register from "../../assets/User Interface.gif";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import API from "../../api/API";
import { saveSession } from "../../api/session";

const Register = () => {
  const [uname, setuname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!uname || !email || !password || !phonenumber) {
        return toast.error("All fields are required");
      }

      setLoading(true);
      await API.post("/user/register", {
        username: uname,
        email,
        password,
        phone: phonenumber,
      });

      const loginResponse = await API.post("/user/login", { email, password });
      saveSession({
        token: loginResponse.data.token,
        user: loginResponse.data.user,
      });

      setuname("");
      setemail("");
      setpassword("");
      setPhonenumber("");
      toast.success("Registration Successful");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-7">
            <img
              src={register}
              alt="auth"
              className="rounded"
              height={"100%"}
              width={"100%"}
            />
          </div>
          <div className="col-md-5 rounded-3 p-4">
            <h3 className="mb-3 text-center text-dark mt-3">
              Registration Form
            </h3>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                value={uname}
                onChange={(e) => setuname(e.target.value)}
                className="form-control"
                id="exampleInputName"
                aria-describedby="nameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword"
                aria-describedby="passwordHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPhoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
                className="form-control"
                id="exampleInputPhoneNumber"
                aria-describedby="phoneNumberHelp"
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register Now"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
