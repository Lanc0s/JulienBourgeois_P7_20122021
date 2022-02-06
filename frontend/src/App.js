import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Post from "./pages/createPost";
import Comment from "./pages/createComment";
import ModifyComment from "./pages/modifyComment";
import ModifyPost from "./pages/modifyPost";
import React from "react";

import axios from "axios";

function App() {
  axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<Post />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/modifyPost" element={<ModifyPost />} />
          <Route path="/modifyComment" element={<ModifyComment />} />
        </Routes>
      </BrowserRouter>
      <div id="logout">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default App;
