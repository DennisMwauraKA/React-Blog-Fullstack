import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import MainLayout from "./layout/MainLayout";
import Post from "./pages/Post";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route  index element={<Post />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
