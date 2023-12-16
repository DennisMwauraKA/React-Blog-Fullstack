import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/profile",{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUsername(userInfo.username)
      })
    })
  }, []);

  return (
    <div className="flex  justify-center gap-10">
      <nav>
        {username && (
          <>
            <Link to="/create post">Create New Post</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/">Welcome to the Blog</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Header;
