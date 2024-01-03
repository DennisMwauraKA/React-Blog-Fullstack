import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreatePost from "./components/CreatePost";
import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import { Routes, Route, Router } from "react-router-dom";
import { UserContextProvider } from "./components/UserContext";
import PostPage from "./pages/PostPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/create-post" element={<CreatePost />}></Route>
          <Route path="/post-page/:id" element={<PostPage />}></Route>
          <Route path="/edit-page" element={<EditPage/>}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
