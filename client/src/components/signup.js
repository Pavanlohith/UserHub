import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_BACKEND_URI;
console.log("API:", API);

const Signup = () => {
  const navigate = useNavigate();  // ✅ Define before using
  const [user, setUser] = useState({  // ✅ user defined here
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
    profiledescription: ""
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (event) => {
    event.preventDefault();
    const { name, email, phone, work, password, cpassword, profiledescription } = user;

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          work,
          password,
          cpassword,
          profiledescription
        }),
      });

      const data = await res.json();
      console.log("Response:", res.status, data);

      if (res.status === 201) {
        window.alert("Registration successful!");
        navigate("/login"); 
      } else {
        window.alert(data.error || "Invalid registration");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      window.alert("Something went wrong!");
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
      <div className="signup-box p-4 rounded-4 shadow-lg">
        <h2 className="text-center mb-4 text-primary fw-bold">Sign Up</h2>
        <form method="POST" onSubmit={PostData}>
          <div className="form-group mb-4">
            <input
              type="text"
              name="name"
              className="underline-input"
              value={user.name}
              onChange={handleInputs}
              placeholder="Full Name"
              required
            />
          </div>

          <div className="form-group mb-4">
            <input
              type="email"
              name="email"
              className="underline-input"
              value={user.email}
              onChange={handleInputs}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="form-group mb-4">
            <input
              type="number"
              name="phone"
              className="underline-input"
              value={user.phone}
              onChange={handleInputs}
              placeholder="Phone Number"
              required
            />
          </div>

          <div className="form-group mb-4">
            <input
              type="text"
              name="work"
              className="underline-input"
              value={user.work}
              onChange={handleInputs}
              placeholder="Profession"
              required
            />
          </div>

          <div className="form-group mb-4">
            <input
              type="password"
              name="password"
              className="underline-input"
              value={user.password}
              onChange={handleInputs}
              placeholder="Password"
              required
            />
          </div>

          <div className="form-group mb-4">
            <input
              type="password"
              name="cpassword"
              className="underline-input"
              value={user.cpassword}
              onChange={handleInputs}
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="text"
              name="profiledescription"
              className="underline-input"
              value={user.profiledescription}
              onChange={handleInputs}
              placeholder="Profile Description"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
