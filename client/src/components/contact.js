import React, { useEffect, useState, useContext } from "react";
import "./contact.css";
import { UserContext } from "../App";

const Contact = () => {
  const { state } = useContext(UserContext); // state = true if user logged in
  const [userData, setUserData] = useState({ name: "", email: "", phone: "", message: "" });

  // Fetch user data if logged in
  const fetchUserData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/getdata`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.status === 200) {
        const data = await res.json();
        setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });
      }
      // If not 200, leave fields empty for manual input
    } catch (err) {
      console.log("User not logged in or fetch failed:", err);
    }
  };

  useEffect(() => {
    if (state) fetchUserData();
  }, [state]);

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = userData;

    if (!message) {
      alert("Please enter a message.");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
        credentials: "include",
      });

      const data = await res.json();
      if (!data) {
        console.log("Message not sent");
      } else {
        alert("Message sent successfully");
        setUserData({ ...userData, message: "" });
      }
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container d-flex justify-content-center mt-5">
        <div className="contact-box text-center p-5 rounded-4 shadow-lg">
          <h2 className="text-primary mb-4 fw-bold">Contact Us</h2>

          <div className="row">
            <div className="col">
              <h5>📞 Phone</h5>
              <p>+91 7207926419</p>
            </div>
            <div className="col">
              <h5>📧 Email</h5>
              <p>pavanlohith006@gmail.com</p>
            </div>
            <div className="col">
              <h5>📍 Address</h5>
              <p>Hyderabad, India</p>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4 mb-5">
        <div className="form-box p-5 rounded-4 shadow-lg bg-white">
          <form method="POST" onSubmit={contactForm}>
            <div className="row mb-3">
              <div className="col-md-4">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={userData.name}
                  onChange={handleInputs}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={userData.email}
                  onChange={handleInputs}
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  value={userData.phone}
                  onChange={handleInputs}
                  placeholder="Your Phone"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <textarea
                rows="4"
                name="message"
                className="form-control"
                value={userData.message}
                onChange={handleInputs}
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary px-5">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
