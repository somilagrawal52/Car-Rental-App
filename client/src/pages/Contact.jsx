import React from "react";

const Contact = () => {
  return (
    <>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <img
          src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202004/Emergency_helpline_number_2_0.png?size=690:388"
          alt="Help Line"
          height={300}
          width={500}
        />
        <h2>For Any Assistance</h2>
        <h2 className="mt-3">
          <i className="fa-solid fa-phone-volume"></i>1234567890
        </h2>
        <h2 className="mt-3">
          <i className="fa-solid fa-envelope"></i>Help@gmail.com
        </h2>
      </div>
    </>
  );
};

export default Contact;
