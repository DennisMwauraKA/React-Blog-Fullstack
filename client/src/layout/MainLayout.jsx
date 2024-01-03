import React from "react";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <main>
      <Header />
      <Outlet />
      <ToastContainer />
    </main>
  );
}

export default MainLayout;
