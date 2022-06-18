import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
// import AddPost from "./components/AddPost";
// import Post from "./components/Post";
import PostsPage from "./pages/PostsPage";
import Register from "./pages/Register";
import ViewPost from "./pages/ViewPost";
import Navbar from "./UI/Navbar";

function App() {
  const [render, setRender] = useState(false);

  const renderHandler = () => {
    setRender(!render);
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="signin" element={<Login />} />

        <Route
          path="/"
          element={<PostsPage render={render} renderHandler={renderHandler} />}
        />
        <Route path="viewpost/:id" element={<ViewPost />} />
      </Routes>
    </>
  );
}

export default App;
