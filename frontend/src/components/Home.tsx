import {
  Box,
  CardMedia,
  Divider,
  Grid,
} from "@mui/material";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CourseDetailInterface } from "../interfaces/ICourseDetail";
import { CourseServiceInterface } from '../interfaces/ICourseService';
import { PaymentInterface } from "../interfaces/IPayment";
import { GetCourseServiceByUidAndStatus, GetCourseDetailByID, GetPaymentByUID } from '../services/HttpClientService';
import { addDays } from '@progress/kendo-date-math';
import '../App.css';
import BG from "../images/bg-course-service.jpg";

function Home() {
  const [CourseService, setCourseService] = useState<CourseServiceInterface>()
  const [Payment, setPayment] = useState<PaymentInterface>()
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface>()
  const [HasCourseService, setHasCourseService] = useState(true)
  let TempDate, TempTimeAndZone: any, TempSecondAndZone: any,  TempHour: any, TempMinute: any, TempSecond, days: any, Time
  let TempPaymentDate: Date | null | undefined, CalDayLeft
  const [PDate, setPDate] = useState<string>()
  const [Hour, setHour] = useState<string>()
  const [Minute, setMinute] = useState<string>()
  const [Second, setSecond] = useState<string>()
  const [DayLeft, setDayLeft] = useState<number>(0)
  const [CourseDuration, setCourseDuration] = useState<number>(0)
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
      setCourseDuration(res.Duration.NumberOfDays);
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
    [TempDate, TempTimeAndZone] = (Payment?.PaymentDate + "").split("T")
    setPDate(TempDate)
    if (TempTimeAndZone !== undefined) {
      [TempHour, TempMinute, TempSecondAndZone] = TempTimeAndZone.split(":")
      TempSecond = TempSecondAndZone.split(".")
      setHour(TempHour)
      setMinute(TempMinute)
      setSecond(TempSecond[0])
      let [years, months, DaysAndTime] = (Payment?.PaymentDate + "").split("-")
      if (DaysAndTime !== undefined) {
        [days, Time] = DaysAndTime.split("T")
        TempPaymentDate = new Date(Date.UTC(Number(years), Number(months) - 1, Number(days), Number(TempHour), Number(TempMinute), Number(TempSecond[0]))) // UTC should +7 but in database utc 0
        CalDayLeft = addDays(TempPaymentDate, CourseDuration)
        setDayLeft((CalDayLeft.getTime() - Date.now()) / (1000 * 3600 * 24))
        console.log(DayLeft)
      }
    }
  }, [Payment]);


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
            <Grid item xs={12} style={{textAlign: "center", marginBottom: "-3rem" , marginTop: "-2rem"}}>
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
                    backgroundColor: '#F1DBBF',
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
                    backgroundColor: '#B99B6B',
                    boxShadow: 12,
                    fontSize: "1.5rem",
                    textAlign: "left",
                    display: "table",
                    marginTop: "24px",
                  }}
                >
                  <Grid container spacing={4} style={{textAlign: "left", margin: "0 1rem 1.5rem 0.6rem"}}>
                    <Grid item xs={12} >
                      Rates: {CourseDetail?.Price?.Price} baht
                    </Grid>
                    <Grid item xs={12} >
                      Duration: {Payment?.Duration?.NumberOfDays} day
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
                    backgroundColor: '#698269',
                    boxShadow: 12,
                    fontSize: "1.5rem",
                    textAlign: "left",
                    display: "table",
                    marginTop: "24px",
                  }}
                >
                  <Grid container spacing={4} style={{textAlign: "left", margin: "0 1rem 1.5rem 0.6rem"}}>
                    <Grid item xs={12} >
                      Date: {PDate}, {Hour}:{Minute}:{Second}
                    </Grid>
                    <Grid item xs={12} >
                      Day left: {Math.floor(DayLeft)} day
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