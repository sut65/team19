import React, { useEffect, useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import './App.css';

// Components
import Navbar from "./components/Navbar";
import ShowCardBlog from "./components/ShowCardBlog";
import Article from "./components/Article";
import ShowCourse from "./components/ShowCourse";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="article" element={<ShowCardBlog />} />
          <Route path="article/:id" element={<Article />} />
          <Route path="course" element={<ShowCourse />} />
          <Route path="signout" element={<ShowCourse />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
