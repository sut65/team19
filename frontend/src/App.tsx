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
import Register from "./components/Member/Register";
import Home from "./components/Home";
import ShowCardCourseService from "./components/CourseService/ShowCardCourseService";
import FoodDisplay from "./components/FoodInformation/FoodDisplay";
import CreateFood from "./components/FoodInformation/CreateFood";
import CreateDailyRoutines from "./components/DailyRoutines/CreateDailyRoutines";
import CreateNutrientUI from "./components/Nutrient/CreateNutrient";
import NutrientDisplayUI from "./components/Nutrient/NutrientDisplay";
import BodyDisplay from "./components/BodyRecord/BodyDisplay";
import DailyRoutinesDisplay from "./components/DailyRoutines/DailyRoutinesDisplay";
import BodyUpdate from "./components/BodyRecord/BodyUpdate";
import BodyRecord from "./components/BodyRecord/BodyRecord";
import ShowReview from "./components/review/ShowReview";
import CreateReview from "./components/review/CreateReview";
import RegisterCourse from "./components/CourseService/RegisterCourse";
import LoginRole from "./pages/LoginRole";
import User from "./pages/login/User";
import Trainer from "./pages/login/Trainer";
import Admin from "./pages/login/Admin";
import Payment from "./components/payment/Payment";
import UpdateFood from "./components/FoodInformation/UpdateFood";
import PaymentHistory from "./components/payment/PaymentHistory";
import CreateBehaviors from "./components/Behavior/CreateBehavior";
import DisplayBehavior from "./components/Behavior/DisplayBehavior";
import UpdateReview from "./components/review/UpdateReview";
import ApplyTrainer from "./components/Trainer/ApplyTrainer";
import ProfileTrainer from "./components/Trainer/ProfileTrainer";
import UpdateNutrient from "./components/Nutrient/UpdateNutrient";
import CreateCourseDetail from "./components/CourseDetail/CreateCourseDetail";
import CourseDetail from "./components/CourseDetail/CourseDetail";
import ShowCardCourseDetail from "./components/CourseDetail/ShowCardCourseDetail";
import UpdateCourseDetail from "./components/CourseDetail/UpdateCourseDetail";
import RegisterMember from "./components/Member/Register";
import ProfileMember from "./components/Member/ProfileMember";
import UpdateCourseServicePage from "./components/CourseService/UpdateCourseServicePage";
import UpdateMember from "./components/Member/UpdateMember";
import { UpdateMem } from "./services/HttpClientService";
import UpdateBehavior from "./components/Behavior/UpdateBehavior";
import AdviceDisplay from "./components/Advice/AdviceDisplay";
import CreateAdvice from "./components/Advice/CreateAdvice";
import UpdateAdvice from "./components/Advice/UpdateAdvice";
import UpdateDailyRoutines from "./components/DailyRoutines/UpdateDailyRoutines";

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
        {/* path ไม่ต้องใส่ / ด้วยเพราะมันอยู่ครอบด้วย LoginRole ที่เป็น root อยู่แล้ว */}
        <Route path="/" element={<LoginRole />} />
        <Route path="/register-member" element={<RegisterMember />}></Route>
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
          <Route
            path="food-display/update-food/:id"
            element={<UpdateFood />}
          ></Route>
          <Route
            path="nutrient-display/update-nutrient/:id"
            element={<UpdateNutrient />}
          ></Route>

          {/* course_detail */}
          <Route path="course" element={<ShowCardCourseDetail />}></Route>
          <Route path="create-course" element={<CreateCourseDetail />}></Route>
          <Route path="course_detail/:id" element={<CourseDetail />}></Route>
          <Route
            path="course_detail/:id/update-course"
            element={<UpdateCourseDetail />}
          ></Route>
        </Route>

        {/* Routes Trainer */}
        <Route path="trainer" element={<Trainer />}></Route>
        <Route path="apply" element={<ApplyTrainer />}></Route>
        <Route path="trainer/profile" element={<ProfileTrainer />}></Route>
        <Route path="update-advice/:id" element={<UpdateAdvice />}></Route>
        <Route path="create-advice/:id" element={<CreateAdvice />}></Route>
        <Route
          path="trainer/advice-display"
          element={<AdviceDisplay />}
        ></Route>

        {/* Routes User */}
        <Route path="user" element={<User />}>
          <Route path="" element={<Home />} />
          <Route path="create-article" element={<CreateArticle />} />
          <Route path="articles" element={<ShowCardBlog />} />
          <Route path="article/:id" element={<Article />} />
          <Route path="register-course" element={<ShowCardCourseService />} />
          <Route path="register-course/:id" element={<RegisterCourse />} />
          <Route path="update-course" element={<UpdateCourseServicePage />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="article/create-article" element={<CreateArticle />} />
          <Route
            path="article/:id/update-article"
            element={<UpdateArticle />}
          />
          <Route path="register-course" element={<ShowCardCourseService />} />
          <Route path="register-course/:id" element={<RegisterCourse />} />
          <Route path="payment/:id" element={<Payment />} />
          <Route path="register" element={<Register />}></Route>
          <Route path="body-display" element={<BodyDisplay />}></Route>
          <Route
            path="body-display/body-update/:id"
            element={<BodyUpdate />}
          ></Route>
          <Route
            path="body-display/body-record"
            element={<BodyRecord />}
          ></Route>
          <Route
            path="daily-routines-display"
            element={<DailyRoutinesDisplay />}
          ></Route>
          <Route
            path="daily-routines/create-dailyroutines"
            element={<CreateDailyRoutines />}
          ></Route>
          <Route
            path="daily-routines/update-dailyroutines/:id"
            element={<UpdateDailyRoutines />}
          ></Route>
          <Route path="reviews/:id" element={<ShowReview />} />
          <Route path="reviews/:id/create" element={<CreateReview />} />
          <Route
            path="reviews/:slug/update-review/:id"
            element={<UpdateReview />}
          />
          <Route path="behavior-display" element={<DisplayBehavior />} />
          <Route
            path="behavior-display/create-behavior"
            element={<CreateBehaviors />}
          />
          <Route
            path="behavior-display/update-behavior/:id"
            element={<UpdateBehavior />}
          />
          <Route path="profile-member" element={<ProfileMember />}></Route>
          <Route
            path="profile-member/update-member/:id"
            element={<UpdateMember />}
          ></Route>
        </Route>
        {/* <Route path="/" element={<Navbar />}> */}
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
