import React from "react";
import "./about.css";
import { Tabs, Tab } from "react-bootstrap";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";


const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); 
const callAboutPage = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/about`, {
      method: "GET",
      headers: {
        Accept: "application/json",
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
    setUserData(data);

    // Optionally set user state if you want to display real data
    // setUserData(data);

  } catch (err) {
    console.log("Error fetching About:", err);
    navigate("/login");
  }
};

  useEffect(()=>{
   callAboutPage();
  },[]);
   if (userData === null) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }
  return (
    <div className="about-container d-flex justify-content-center align-items-center vh-100">
      <div className="about-box p-4 rounded shadow-lg bg-white">
        <h2 className="text-center mb-4">{userData.name}</h2>

        <Tabs defaultActiveKey="about" id="about-tabs" className="mb-3 justify-content-center">
          <Tab eventKey="about" title="About">
            
            <div className="row mb-2">
              <div className="col-md-6 text-muted">Name:</div>
              <div className="col-md-6 fw-semibold">{userData.name}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 text-muted">Email:</div>
              <div className="col-md-6 fw-semibold">{userData.email}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 text-muted">Phone:</div>
              <div className="col-md-6 fw-semibold">{userData.phone}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 text-muted">Profession:</div>
              <div className="col-md-6 fw-semibold">{userData.work}</div>
            </div>
          </Tab>

          <Tab eventKey="profile" title="Profile">
            <div className="text-center mt-3">
              <p>
                I’m Pavan Lohith, a passionate web developer skilled in building
                modern and responsive websites using React, Node.js, and MongoDB.
              </p>
              <p>
                I love exploring new technologies, contributing to projects, and
                continuously improving my skills.
              </p>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default About;
