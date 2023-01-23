import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import '../../App.css';
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { GetCourseDetail } from "../../services/HttpClientService";

function CardRegisterCourse({
  ID,
  CourseName,
  CoverPage,
  DescriptionID,
  Description,
  AdminID,
  Admin,
  PriceID,
  Price,
}: CourseDetailInterface) {
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
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
      className={CourseName}
    >
      <CardMedia
        component="img"
        height="200"
        image={CoverPage}
        alt="green iguana"
      />
      <CardContent>
        <Box
          sx={
            {
              // display: "flex",
              // justifyContent: "space-between",
            }
          }
        >
          <Typography
            sx={{
              color: "#6b7280",
            }}
            gutterBottom
            variant="caption"
            component="div"
            style={{ fontSize: "1rem" }}
          >
            Author : {Admin?.Name}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Category: {Description?.CourseType}
          </Typography>
          <Typography
            mb={2}
            gutterBottom
            variant="h3"
            component="div"
            // color={"#3b82f6"}
            style={{ textTransform: "capitalize", fontSize: "1.6rem" }}
          >
            <b>{CourseName}</b>
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: "1.2rem" }}
          variant="h5"
          style={{ marginBottom: "0.5rem" }}
        >
          {/* {Name.slice(0, 80)} */}
        </Typography>
        <Typography
          variant="caption"
          fontSize={"0.9rem"}
          sx={{
            border: "solid 1px #252525",
            borderRadius: "1rem",
            p: "4px 8px",
          }}
        >
          {/* #{Description.Type} */}
        </Typography>
      </CardContent>
      <Link
        to={`/article/${ID}`}
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          className="btn-user"
          variant="contained"
          style={{
            margin: "0 0 16px 14px",
            color: "#fff",
            borderRadius: 20,
            backgroundColor: "#3b82f6",
            padding: "8px 16px",
            fontSize: "12px",
          }}
        >
          Read more
        </Button>
      </Link>
    </Card>
  );
}

export default CardRegisterCourse;
