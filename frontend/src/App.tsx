import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import ShowCardBlog from "./components/ShowCardBlog";
import Article from "./components/Article";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="article" element={<ShowCardBlog />} />
          <Route path="article/:id" element={<Article />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
