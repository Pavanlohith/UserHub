import React, { useEffect, useState, useContext } from 'react';
import './home.css';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { state } = useContext(UserContext);
  const [username, setUsername] = useState(null); 
  const navigate = useNavigate();

  const userHomepage = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/about`, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      });

      if (res.status !== 200) {
        throw new Error("Unauthorized");
      }

      const data = await res.json();
      setUsername(data.name);
    } catch (err) {
      console.log("Error fetching About:", err);
      setUsername(null); 
    }
  };

  useEffect(() => {
    if (!state) {
    
      setUsername(null);
    } else {
      userHomepage();
    }
  }, [state]);

  if (!state || username === null) {
    return <h2 style={{ textAlign: "center" }}>Please Login</h2>;
  }

  return (
    <div className="home-container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1 className="home-title">Hi, I’m <span className="highlight">{username}</span></h1>
        <p className="home-subtitle">A passionate web developer exploring the world of React and Node.js.</p>
      </div>
    </div>
  );
};

export default Home;
