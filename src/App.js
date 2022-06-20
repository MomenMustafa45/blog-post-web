import React, { useState, useEffect } from "react";
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
  // useEffect(() => {
  //   const getPosts = collection(dataBase, "posts");
  //   const q = query(getPosts, orderBy("createdtime", "desc"));
  //   onSnapshot(q, (snapshot) => {
  //     const post = snapshot.docs.map((item) => ({
  //       id: item.id,
  //       ...item.data(),
  //     }));
  //     console.log(posts);
  //     setPosts(post);
  //   });
  // }, []);

  useEffect(() => {
    console.log("hello");
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/blog-post-web/" element={<PostsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/viewpost/:id" element={<ViewPost />} />
      </Routes>
    </>
  );
}

export default App;
