import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleRegister = async (ev) => {
    ev.preventDefault();
    const register = {
      email: email,
      password: password,
      username: username,
    };
    try {
      const response = await axios.post(
        " https://react-blog-server-seven.vercel.app/api/register",
        register
      );
      console.log(response);
      if (response.status === 200 || 201) {
        toast.success(` Registration Successful`)
        setEmail("");
        setPassword("");
        setUsername("");
      }
    } catch (error) {
      console.log(error); 
      toast.error(`Dear ${username},Registration Failed,Please Try Again `)
    }
  };
  return (
    <div className=" w-[100%] h-screen flex justify-center  items-center">
      <form className="flex flex-col justify-center md:w-[50%] w-[90%] p-5 md:p-0 gap-4 items-center border-red-900 bg-cyan-600 h-[60%] rounded-3xl">
        <div className="w-[100%] flex flex-col gap-4 items-center ">
          <div>
            <h1 className="text-xl capitalize font-bold text-white">
              Register Account
            </h1>
          </div>
          <input
            type="text"
            placeholder="Enter your Username "
            className="outline-none md:w-[50%] w-[90%] p-1 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter your Email "
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
          onClick={handleRegister}
          className="bg-white w-[100px] h-[30px] text-xl rounded mt-5"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
