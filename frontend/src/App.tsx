import React, { useEffect, useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import ShowCardBlog from "./components/blog/ShowCardBlog";
import Article from "./components/blog/Article";
import SignIn from "./components/SignIn";
import CreateArticle from "./components/blog/CreateArticle";
import UpdateArticle from "./components/blog/UpdateArticle";
import Register from "./components/Register";
import Home from "./components/Home";
import ShowCardCourseService from "./components/CourseService/ShowCardCourseService";
import FoodDisplay from "./components/FoodInformation/FoodDisplay";
import CreateFood from "./components/FoodInformation/CreateFood";
import CreateNutrientUI from "./components/Nutrient/CreateNutrient";
import NutrientDisplayUI from "./components/Nutrient/NutrientDisplay";
import BodyDisplay from "./components/BodyRecord/BodyDisplay"
import ShowReview from "./components/review/ShowReview";
import CreateReview from "./components/review/CreateReview";
import RegisterCourse from "./components/CourseService/RegisterCourse";
import LoginRole from "./pages/LoginRole";
import User from "./pages/login/User";
import Trainer from "./pages/login/Trainer";
import Admin from "./pages/login/Admin";
import Payment from "./components/Payment/Payment";
import UpdateFood from "./components/FoodInformation/UpdateFood";

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

  // if (!token) {
  //   return <LoginRole />;
  // }

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginRole />} />
        {/* Routes Admin */}
        <Route path="admin" element={<Admin />}>
          <Route path="food-display" element={<FoodDisplay />}></Route>
          <Route
            path="food-display/create-food"
            element={<CreateFood />}
          ></Route>
          <Route
            path="nutrient-display/create-nutrient"
            element={<CreateNutrientUI />}
          ></Route>
          <Route
            path="nutrient-display"
            element={<NutrientDisplayUI />}
          ></Route>
        </Route>

        {/* Routes Trainer */}
        <Route path="trainer" element={<Trainer />}></Route>
        
        {/* Routes User */}
        <Route path="user" element={<User />}>
          <Route path="home" element={<Home />} />
          <Route path="create-article" element={<CreateArticle />} />
          <Route path="articles" element={<ShowCardBlog />} />
          <Route path="article/:id" element={<Article />} />
          <Route path="register-course" element={<ShowCardCourseService  />} />
          <Route path="register-course/:id" element={<RegisterCourse  />} />
          <Route path="payment/:id" element={<Payment  />} />
          <Route path="article/create-article" element={<CreateArticle />} />
          <Route path="article/:id/update-article" element={<UpdateArticle />} />
          <Route path="register" element={<Register />}></Route>
          <Route path="BodyRecord" element={<BodyDisplay />}></Route>
          <Route
            path="article/:id/update-article"
            element={<UpdateArticle />}
          />
          <Route path="register" element={<Register />}></Route>
          <Route path="create-review" element={<CreateReview />} />
          <Route path="reviews" element={<ShowReview />} />
          <Route path="/food-display/update-food/:id" element={<UpdateFood />}></Route>
        </Route>
        {/* <Route path="/" element={<Navbar />}> */}
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
