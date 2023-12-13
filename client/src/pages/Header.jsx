import React from "react";
import { Link } from "react-router-dom";


function Header() {
  return (
  
      <div className="flex  justify-center gap-10">
        <Link to="/">Welcome to the Blog</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

      </div>
   
  );
}

export default Header;
