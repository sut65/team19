import React, { useEffect, useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import './App.css';

// Components
import Navbar from "./components/Navbar";
import ShowCardBlog from "./components/blog/ShowCardBlog";
import Article from "./components/blog/Article";

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
