import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import '../../App.css';
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { GetCourseDetail } from "../../services/HttpClientService";

function CardCourseService({
  ID,
  CourseName,
  CoverPage,
  Description,
  Goal,
  CourseTypeID,
  CourseType,
  AdminID,
  Admin,
  PriceID,
  Price,
}: CourseDetailInterface) {
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface[]>([])
  const navigate = useNavigate();

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
        height="300"
        image={CoverPage}
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
          <Typography variant="body2" color="text.secondary" mb={2}>
            Category: {CourseType?.TypeName}
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
          style={{ marginBottom: "1rem" }}
        >
          {Description?.slice(0, 100)}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2} style={{marginBottom: "2rem"}}>
          Goal: {Goal}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="caption"
            fontSize={"1rem"}
            sx={{
              border: "solid 1px #252525",
              borderRadius: "1rem",
              p: "4px 16px",
              fontWeight: "bold",
            }}
          >
            {Price?.Price} บาท
          </Typography>
          <Typography 
            sx={{
              pl: "16px",
              fontSize: "0.9rem"
            }}>
            ระยะเวลาคอร์ส {Price?.Duration}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", margin: "16px 14px 16px 14px"}}>
        <Link
          to={`/user/reviews/${ID}`}
          style={{  
            textDecoration: "none",
          }}
        >
          <Button
            className="btn-user"
            variant="contained"
            style={{
              color: "#384648",
              borderRadius: 20,
              backgroundColor: "#FEF5ED",
              padding: "6px 28px",
              fontSize: "16px",
            }}
          >
            Read review
          </Button>
        </Link>
        <Link
          to={`${ID}`}
          style={{
            textDecoration: "none",
          }}
        >
          <Button
            className="btn-user"
            variant="contained"
            style={{
              color: "#fff",
              borderRadius: 20,
              backgroundColor: "#576F72",
              padding: "6px 28px",
              fontSize: "16px",
            }}
          >
            Select
          </Button>
        </Link>
      </Box>
    </Card>
  );
}

export default CardCourseService;
