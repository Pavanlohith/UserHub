import React from "react";
import "./contact.css";
import { useEffect,useState } from "react";
const Contact = () => {

  
  const [userData, setUserData] = useState({name:"",email:"",phone:"",message:""  }); 
const callContact = async () => {
  
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/getdata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // ✅ important
    });

    console.log("Status:", res.status);

    // Check status before parsing JSON
    if (res.status !== 200) {
      throw new Error("Unauthorized");
    }

    const data = await res.json();
    console.log("About Data:", data);
    setUserData({ ...userData, name:data.name,email:data.email,phone:data.phone });

    // Optionally set user state if you want to display real data
    // setUserData(data);

  } catch (err) {
    console.log("Error fetching About:", err);
    
  }
};

  useEffect(()=>{
   callContact();
  },[]);

  if (!userData) {
  return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
}
const handleInputs = (e) => {
   const name = e.target.name;
   const value = e.target.value;

   setUserData({ ...userData, [name]: value });

};
const contactForm = async (e) => {
  e.preventDefault();
  const {name,email,phone,message} = userData;

  const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/contact`, {  
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name,email,phone,message}),
  });
  const data = await res.json();
  if (!data) {
    console.log("Message not sent");
  } else {
    alert("Message sent successfully");
    setUserData({ ...userData, message: "" });
  } 
};
  return (
    <div className="contact-page">

      {/* 🔹 TOP INFO BOX */}
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

      {/* 🔹 CONTACT FORM */}
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
