import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControl,
  Grid,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from 'react';
import { CourseDetailInterface } from "../interfaces/ICourseDetail";
import { CourseServiceInterface } from '../interfaces/ICourseService';
import { GetCourseServiceBYUID, GetCourseDetailByID } from '../services/HttpClientService';
import '../App.css';
import BG from "../images/bg-course-service.jpg";

function Home() {
  const [CourseService, setCourseService] = useState<CourseServiceInterface>({})
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface>()
  const uid = localStorage.getItem("uid")
  const UFirstName = localStorage.getItem("firstname") + ""
  const ULastName = localStorage.getItem("lastname") + ""
  const UserName = UFirstName + " " + ULastName

  const getCourseService = async () => {
    let res = await GetCourseServiceBYUID();
    if (res) {
      setCourseService(res);
    }
  };

  const getCourseDetail = async () => {
    let res = await GetCourseDetailByID(CourseService.CourseDetailID);
    if (res) {
      setCourseDetail(res);
    }
  };

  useEffect(() => {
    getCourseService();
  }, [uid]);

  useEffect(() => {
    getCourseDetail()
  }, [CourseService]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexFlow: "",
        overflow: "auto",
        alignItems: "center",
        gap: 6,
        height: "92.7vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.15)), url(${BG})`,
      }}
    >
      <Box 
        sx={{
          width: 720,
          height: 720,
          borderRadius: 10,
          backgroundColor: '#E5ECE9',
          boxShadow: 16,
          fontSize: "1.5rem",
          textAlign: "left",
          display: "table",
          marginTop: "3rem",
          padding: "2rem",
        }}
      >
        <Grid container spacing={4} style={{textAlign: "center"}}>
          <Grid item xs={12}>
            <p style={{fontSize: "3rem", fontWeight: "bold"}}>{CourseDetail?.CourseName}</p>
          </Grid>
        </Grid>
        <Divider />
        <Grid container spacing={4} style={{textAlign: "center", margin: "0 20px 0 20px"}}>
          <Grid item xs={12} style={{textAlign: "left"}}>
            category: {CourseDetail?.Description?.CourseType}
          </Grid>
        </Grid>
        

      </Box>
    </Box>
  )
}
  
export default Home