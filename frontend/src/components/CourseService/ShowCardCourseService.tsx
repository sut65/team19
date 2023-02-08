import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Component
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import CardCourseService from "./CardCourseService";
import { Margin } from "@mui/icons-material";
import "../../App.css";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { DescriptionInterface } from "../../interfaces/ICourseType";
import { PriceInterface } from "../../interfaces/IPrice";
import { GetCourseDetail, GetDescription, GetPrice } from "../../services/HttpClientService";

function ShowCardCourseService() {
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface[]>([])
  const [Price, setPrice] = useState<PriceInterface[]>([])
  const [Description, setDescription] = useState<DescriptionInterface[]>([])

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

  const getDescription = async () => {
    let res = await GetDescription();
    if (res) {
      setDescription(res);
    }
  };

  useEffect(() => {
    getCourseDetail();
    getPrice();
    getDescription();
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
                DescriptionID={item.DescriptionID}
                Description={item.Description}
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
