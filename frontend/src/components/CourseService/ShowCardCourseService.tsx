import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Component
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import CardCourseService from "./CardCourseService";
import { Margin } from "@mui/icons-material";
import "../../App.css";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { CourseTypeInterface } from "../../interfaces/ICourseType";
import { PriceInterface } from "../../interfaces/IPrice";
import { GetCourseDetail, GetCourseType, GetPrice } from "../../services/HttpClientService";

function ShowCardCourseService() {
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface[]>([])
  const [Price, setPrice] = useState<PriceInterface[]>([])
  const [CourseType, setCourseType] = useState<CourseTypeInterface[]>([])

  const getCourseDetail = async () => {
    let res = await GetCourseDetail();
    if (res) {
      setCourseDetail(res);
    }
  };

  const getPrice = async () => {
    let res = await GetPrice();
    if (res) {
      setPrice(res);
    }
  };

  const getCourseType = async () => {
    let res = await GetCourseType();
    if (res) {
      setCourseType(res);
    }
  };

  useEffect(() => {
    getCourseDetail();
    getPrice();
    getCourseType();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "1024px",
        margin: "3rem auto",
      }}
    >
      {/* Button Write */}
      <Box sx={{
        // mt: "5rem",
        display: "flex",
        justifyContent: "flex-end"
      }}>
      </Box>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {CourseDetail.map((item) => {
          return (
            <Grid item xs={6} sm={4} md={4} key={item.ID}>
              <CardCourseService
                ID={item.ID}
                CourseName={item.CourseName}
                CoverPage={item.CoverPage}
                Description={item.Description}
                Goal={item.Goal}
                CourseTypeID={item.CourseTypeID}
                CourseType={item.CourseType}
                AdminID={item.AdminID}
                Admin={item.Admin}
                PriceID={item.PriceID}
                Price={item.Price}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default ShowCardCourseService;
