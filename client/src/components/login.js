import React from 'react';
import { useState } from 'react';
import './signup.css'; // reuse the same CSS for consistent style
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../App';
const Login = () => {
  const {state,dispatch}=useContext(UserContext);
  const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const loginUSer=async(e)=>{
   e.preventDefault();
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/api/signin`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({ email, password }),
});

console.log(res);
   const data=await res.json();
   if(res.status===400 || !data ){
    window.alert("Invaldi credentisls");

   }
   else{
    dispatch({type:"USER",payload:true})
    window.alert("Login succesful");
    navigate("/")
   }
  }
  
  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
      <div className="signup-box p-4 rounded-4 shadow-lg">
        <h2 className="text-center mb-4 text-primary fw-bold" >Login</h2>
        <form method="POST" onSubmit={loginUSer}>
          <div className="form-group mb-4">
            <input
              type="email"
              className="underline-input"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
          </div>

          <div className="form-group mb-4">
            <input
              type="password"
              className="underline-input"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
