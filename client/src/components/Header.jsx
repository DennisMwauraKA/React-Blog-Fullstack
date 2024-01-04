import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

function Header() {
  const { info, setInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/profile", {
        withCredentials: true,
      });

      if (response.status === 200) {
        setInfo(response.data.id);
        setAuthenticated(true);
      } else {
        console.error("Error:", response.status, response.statusText);
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://react-blog-server-seven.vercel.app/api/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setInfo(null);
        toast.success("Logged Out");
        navigate("/login");
        setAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    } 
  };

  return (
    <div className="flex justify-center">
      <nav className="sticky top-0 w-[100%] md:w-[60%] lg:w-70%]">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Navigation
            authenticated={authenticated}
            handleLogout={handleLogout}
          />
        )}
      </nav>
    </div>
  );
}

const Navigation = ({ authenticated, handleLogout }) => {
  if (authenticated) {
    return (
      <div className="flex justify-between h-[40px] bg-green-400 items-center mx-2 md:mx-0 lg:mx-0">
        <div className="text-xl">
          <Link to="/create-post">Create New Post</Link>
        </div>
        
        <button onClick={handleLogout} className="text-xl ">Logout</button>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between h-[40px] bg-green-400 items-center mx-2 md:mx-0 lg:mx-0">
        <div className="text-xl">
          <Link to="/">Creative Blog</Link>
        </div>
        <div className="space-x-2 md:space-x-4 text-xl">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
    );
  }
};

export default Header;
