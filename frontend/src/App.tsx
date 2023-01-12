import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ShowCardBlog from "./components/ShowCardBlog";

function App() {
  return (
    <div>
      <Navbar />
      <ShowCardBlog />
    </div>
  );
}

export default App;
