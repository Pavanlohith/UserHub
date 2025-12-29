import React, { useEffect, useState, useContext } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "./about.css";

const About = () => {
  const navigate = useNavigate();
  const { state } = useContext(UserContext);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const callAboutPage = async () => {
    try {
      if (!state) {
        // If user is not logged in, no need to fetch
        setUserData(null);
        return;
      }

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/about`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      });

      if (res.status !== 200) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setUserData(data);

    } catch (err) {
      console.log("Error fetching About:", err);
      // Optional: redirect if fetch fails
      // navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, [state]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="about-container d-flex justify-content-center align-items-center vh-100">
      <div className="about-box p-4 rounded shadow-lg bg-white">
        <h2 className="text-center mb-4">
          {userData ? userData.name : "Please login to see profile"}
        </h2>

        <Tabs
          defaultActiveKey="about"
          id="about-tabs"
          className="mb-3 justify-content-center"
        >
          <Tab eventKey="about" title="About">
            {userData ? (
              <>
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
              </>
            ) : (
              <p style={{ textAlign: "center" }}>Please login to see details</p>
            )}
          </Tab>

          <Tab eventKey="profile" title="Profile">
            <div className="text-center mt-3">
              {userData ? (
                <p>{userData.profiledescription}</p>
              ) : (
                <p>Please login to see profile description</p>
              )}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default About;
