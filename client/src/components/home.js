import React from 'react';
import './home.css';
import { useEffect, useState } from 'react';
const Home = () => {
  const [username, setUsername] = useState(null); 
  const userHomepage = async () => {
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
      setUsername(data.name);
  
      // Optionally set user state if you want to display real data
      // setUserData(data);
  
    } catch (err) {
      console.log("Error fetching About:", err);
      
    }
  };
  
    useEffect(()=>{
     userHomepage();
    },[]);
     if (username === null) {
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
