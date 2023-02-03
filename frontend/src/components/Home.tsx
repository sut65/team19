import {
  Box,
  Button,
  CardMedia,
  Divider,
  Grid,
} from "@mui/material";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { CourseDetailInterface } from "../interfaces/ICourseDetail";
import { CourseServiceInterface } from '../interfaces/ICourseService';
import { PaymentInterface } from "../interfaces/IPayment";
import { GetCourseServiceByUidAndStatus, GetCourseDetailByID, GetPaymentByUID, UpdateCourseService } from '../services/HttpClientService';
import { addDays } from '@progress/kendo-date-math';
import '../App.css';
import BG from "../images/bg-course-service.jpg";

function Home() {
  const [CourseService, setCourseService] = useState<CourseServiceInterface>()
  const [Payment, setPayment] = useState<PaymentInterface>()
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface>()
  const [HasCourseService, setHasCourseService] = useState(true)
  let TempDate, TempTimeZone: any, TempHour: any, TempMinute: any, TempSecond: any, TempTime, TimeZone
  let TempPaymentDate: Date | null | undefined, CalDayLeft, years, months, days, day
  let temp1: Date
  const [PDate, setPDate] = useState<string>()
  const [DayLeft, setDayLeft] = useState<number>(1)
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

  const UpdateStatus = async () => {
    let data = {
      ID: convertType(CourseService?.ID),
      CRegisterDate: CourseService?.CRegisterDate,
      Agreement: CourseService?.Agreement,
      Status: "Expired",
      RefundMessage: CourseService?.RefundMessage,
      MemberID: convertType(CourseService?.MemberID),
      CourseDetailID: convertType(CourseDetail?.ID),
      TrainerID: convertType(CourseService?.TrainerID),
    };
    await UpdateCourseService(data);
  }

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
    // console.log((Payment?.PaymentDate)?.getTime())
    if (Payment?.PaymentDate !== undefined) {
      temp1 = new Date(Payment.PaymentDate + "")
      if (temp1 !== undefined) {
        [TempDate, TempTimeZone] = (temp1 + "").split(" GMT")
        setPDate(TempDate)
        TimeZone = TempTimeZone.split("")
        console.log(Number(TimeZone[0] + TimeZone[1] + TimeZone[2] + "." + TimeZone[3] + TimeZone[4]))
        if (TempDate !== undefined) {
          [day, months, days, years, TempTime] = TempDate.split(" ");
          if (TempTime !== undefined) {
            console.log(TempTime);
            [TempHour, TempMinute, TempSecond] = TempTime.split(":")
            console.log(Number(TempHour))
            const addTimezone = Number(TimeZone[0] + TimeZone[1] + TimeZone[2] + "." + TimeZone[3] + TimeZone[4])
            if (TempHour !== undefined) {
              TempPaymentDate = new Date(Date.UTC(Number(years), SearchMonth(months), Number(days), Number(TempHour) - addTimezone, Number(TempMinute), Number(TempSecond)))
              CalDayLeft = addDays(TempPaymentDate, CourseDuration)
              setDayLeft((CalDayLeft.getTime() - Date.now()) / (1000 * 3600 * 24))
              console.log(DayLeft)
              if (DayLeft <= 0) {
                UpdateStatus();
              }
            }
          }
        }
      }
    }
  }, [Payment]);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const SearchMonth = (months: string): number => {
    let numMonth = -1
    if (months === "Jan") {
      return numMonth = 0;
    } else if (months === "Feb") {
      return numMonth = 1;
    } else if (months === "Mar") {
      return numMonth = 2;
    } else if (months === "Apr") {
      return numMonth = 3;
    } else if (months === "May") {
      return numMonth = 4;
    } else if (months === "Jun") {
      return numMonth = 5;
    } else if (months === "Jul") {
      return numMonth = 6;
    } else if (months === "Aug") {
      return numMonth = 7;
    } else if (months === "Sep") {
      return numMonth = 8;
    } else if (months === "Oct") {
      return numMonth = 9;
    } else if (months === "Nov") {
      return numMonth = 10;
    } else if (months === "Dec") {
      return numMonth = 11;
    } else {
      return numMonth = -1;
    }
  };

  return (
    <div>
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
                  height="528"
                  image={CourseDetail?.CoverPage}
                  sx={{boxShadow: 12, borderRadius: 10}}
                />
              </Grid>
              <Grid item xs={6} style={{fontSize: "1.2rem"}}>
                <Grid item xs={12}>
                  <Box 
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 10,
                      backgroundColor: '#F1DBBF',
                      boxShadow: 12,
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
                      textAlign: "left",
                      display: "table",
                      marginTop: "16px",
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
                      textAlign: "left",
                      display: "table",
                      marginTop: "16px",
                    }}
                  >
                    <Grid container spacing={4} style={{textAlign: "left", margin: "0 1rem 1.5rem 0.6rem"}}>
                      <Grid item xs={12} >
                        Date: {PDate}
                      </Grid>
                      <Grid item xs={12} >
                        Day left: {Math.floor(DayLeft)} day
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} style={{display: "flex", justifyContent: "space-between"}}>
                  <Link
                    to={`update-course`} // รอแก้เป็นรีวิว
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
                        backgroundColor: "#C27664",
                        padding: "6px 28px",
                        fontSize: "16px",
                        marginTop: "16px",
                      }}
                    >
                      Refund
                    </Button>
                  </Link>
                  <Link
                    to={`update-course`} // รอแก้เป็นรีวิว
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
                        marginTop: "16px",
                        display: "flex"
                      }}
                    >
                      Update
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </div>
    
  )
}
  
export default Home