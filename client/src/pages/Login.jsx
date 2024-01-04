import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post(
        "https://react-blog-server-seven.vercel.app/api/login",
        { email, password },
        { withCredentials: true, }
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success(`Logged in  successfully`);
        setRedirect(true);

        navigate("/");
      } else {
        toast.error(`Internal server error. Please try again later.`);
      }
    } catch (error) {
      console.error(error);

      toast.error("Invalid credentials!! Please try again");
    }
  };

  return (
    <>
      {redirect && navigate("/")}
      <div className="w-[100%] h-screen flex justify-center  items-center">
        <form
          className="flex flex-col justify-center md:w-[50%] w-[90%] p-5 md:p-0 gap-4 items-center border-red-900 bg-cyan-600 h-[60%] rounded-3xl"
          onSubmit={handleLogin}
        >
          <div className="w-[100%] flex flex-col gap-4 items-center ">
            <div>
              <h1 className="text-xl capitalize font-bold text-white">
                Login to Your Account
              </h1>
            </div>

            <input
              type="text"
              placeholder="Enter your email"
              className="outline-none md:w-[50%] w-[90%] p-1 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your Password "
              className="outline-none md:w-[50%]  w-[90%] p-1 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-white w-[100px] h-[30px] text-xl rounded mt-5"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
