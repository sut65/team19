import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Component
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import CardRegisterCourse from "./CardRegisterCourse";
import { Margin } from "@mui/icons-material";
import "../../App.css";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { GetCourseDetail } from "../../services/HttpClientService";

function ShowCardCourseService() {
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface[]>([])

  const getCourseDetail = async () => {
    let res = await GetCourseDetail();
    if (res) {
      setCourseDetail(res);
    }
  };

  useEffect(() => {
    getCourseDetail();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "1024px",
        margin: "2rem auto",
      }}
    >
      {/* Button Write */}
      <Box sx={{
        // mt: "5rem",
        display: "flex",
        justifyContent: "flex-end"
      }}>
        <Link
          to="/article/create-article"
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            className="btn-user"
            variant="contained"
            style={{
              width: "120px",
              margin: "0 0 16px 14px",
              color: "#fff",
              borderRadius: 20,
              backgroundColor: "#3b82f6",
              padding: "4px 8px",
              fontSize: "1.5rem",
            }}
          >
            Write
          </Button>
        </Link>
      </Box>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {CourseDetail.map((item) => {
          return (
            <Grid item xs={6} sm={4} md={4} key={item.ID}>
              <CardRegisterCourse
                ID={item.ID}
                Name={item.Name}
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
