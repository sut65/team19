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
import { useNavigate } from "react-router-dom";
import { CourseDetailInterface } from "../interfaces/ICourseDetail";
import { CourseServiceInterface } from '../interfaces/ICourseService';
import { PaymentInterface } from "../interfaces/IPayment";
import { GetCourseServiceByUidAndStatus, GetCourseDetailByID, GetPaymentByUID } from '../services/HttpClientService';
import '../App.css';
import BG from "../images/bg-course-service.jpg";

function Home() {
  const [CourseService, setCourseService] = useState<CourseServiceInterface>()
  const [Payment, setPayment] = useState<PaymentInterface>()
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface>()
  const [HasCourseService, setHasCourseService] = useState(true)
  const uid = localStorage.getItem("uid")
  const UFirstName = localStorage.getItem("firstname") + ""
  const ULastName = localStorage.getItem("lastname") + ""
  const UserName = UFirstName + " " + ULastName
  const navigate = useNavigate();

  const getCourseServiceByUidAndStatus = async () => {
    let res = await GetCourseServiceByUidAndStatus();
    if (res) {
      setCourseService(res);
      setHasCourseService(false)
    } else {
      setHasCourseService(true)
      navigate(`/user/register-course`)
    }
  };

  const getPaymentByUID = async () => {
    let res = await GetPaymentByUID();
    if (res) {
      setPayment(res);
    } else {
      navigate(`/user/payment/${CourseService?.ID}`)
    }
  };

  const getCourseDetail = async () => {
    let res = await GetCourseDetailByID(CourseService?.CourseDetailID);
    if (res) {
      setCourseDetail(res);
    }
  };

  useEffect(() => {
    getCourseServiceByUidAndStatus();
  }, [uid]);

  useEffect(() => {
    getCourseDetail();
    if (CourseService !== undefined) {
      getPaymentByUID();
    }
  }, [CourseService]);

  useEffect(() => {
    console.log(CourseService?.Status)
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
      {HasCourseService
      ? (<div></div>
      )
      : (
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
          <Grid container spacing={4}>
            <Grid item xs={12} style={{textAlign: "center", marginBottom: "-3rem"}}>
              <p style={{fontSize: "3rem", fontWeight: "bold"}}>{CourseDetail?.CourseName}</p>
            </Grid>
            <Grid item xs={6} style={{color: "grey"}}>
              Member: {UserName}
            </Grid>
            <Grid item xs={6} style={{textAlign: "right", color: "grey"}}>
              Trainer: {CourseService?.Trainer?.Name}
            </Grid>
          </Grid>
          <Divider />
          <Grid container spacing={4} sx={{marginTop: "0"}}>
            <Grid item xs={6}>
              <CardMedia
                component="img"
                height="480"
                image={CourseDetail?.CoverPage}
                sx={{boxShadow: 12, borderRadius: 10}}
              />
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12}>
                <Box 
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    backgroundColor: '#F0EBE3',
                    boxShadow: 12,
                    fontSize: "1.5rem",
                    textAlign: "left",
                    display: "table",
                  }}
                >
                  <Grid container spacing={4} style={{textAlign: "left", margin: "0 1rem 1.5rem 0.6rem"}}>
                    <Grid item xs={12} >
                      Category: {CourseDetail?.Description?.CourseType}
                    </Grid>
                    <Grid item xs={12} >
                      Goal: {CourseDetail?.Description?.Goal}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box 
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    backgroundColor: '#E4DCCF',
                    boxShadow: 12,
                    fontSize: "1.5rem",
                    textAlign: "left",
                    display: "table",
                    marginTop: "100px",
                  }}
                >
                  <Grid container spacing={4} style={{textAlign: "left", margin: "0 1rem 1.5rem 0.6rem"}}>
                    <Grid item xs={12} >
                      Course rates: {CourseDetail?.Price?.Price} บาท
                    </Grid>
                    <Grid item xs={12} >
                      Course Duration: {CourseDetail?.Price?.Duration}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}
  
export default Home