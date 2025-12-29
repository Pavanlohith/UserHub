// src/components/navbar.js
import { Link } from "react-router-dom";

import { IoLogoChrome } from "react-icons/io";
import { useContext } from 'react';
import { UserContext } from '../App';

function Navbar() {
  const {state,dispatch}=useContext(UserContext);
  const RenderMenu=()=>{
    if(state){
      return(<>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/about">About</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
        <Link className="nav-link" to="/logout">Logout</Link>
      </>);
    }
    else{
      return(<>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/about">About</Link>
        <Link className="nav-link" to="/contact">Contact</Link>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/signup">Signup</Link>
      </>);
    }
  };  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><IoLogoChrome />
</Link>
        <div className="navbar-nav">
          <RenderMenu />
          {/* <Link className="nav-link" to="/">Home</Link>
          <Link className="nav-link" to="/about">About</Link>
          <Link className="nav-link" to="/contact">Contact</Link>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/signup">Signup</Link>
        <Link className="nav-link" to="/Logout">LogOut</Link> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
