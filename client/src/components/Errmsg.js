import React from "react";
import "./err.css";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-box">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Oops! Page Not Found</h2>
        <p className="error-text">
          Looks like this page got lost in the code 🐞
        </p>

        <button className="error-btn" onClick={() => navigate("/")}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error404;
