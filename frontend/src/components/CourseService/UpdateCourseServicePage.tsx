import { Alert, Box, Button, Card, CardContent, CardMedia, Divider, FormControl, Grid, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Link, useNavigate } from "react-router-dom";
import Clock from 'react-live-clock';
// Component
import "../../App.css";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { CourseServiceInterface } from "../../interfaces/ICourseService";
import { TrainerInterface } from "../../interfaces/ITrainer";
import { GetCourseServiceByUidAndStatus, GetTrainer, GetCourseDetailByID, UpdateCourseService } from "../../services/HttpClientService";

function UpdateCourseServicePage() {
  const [CourseService, setCourseService] = useState<CourseServiceInterface>()
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface>()
  const [Trainer, setTrainer] = useState<TrainerInterface[]>([])
  const [RefundMessage, setRefundMessage] = useState<string>("")
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = React.useState("");
  const [CDate, setCDate] = useState<string>()
  const uid = localStorage.getItem("uid")
  const navigate = useNavigate();
  const UFirstName = localStorage.getItem("firstname") + ""
  const ULastName = localStorage.getItem("lastname") + ""
  const UserName = UFirstName + " " + ULastName
  let TempDate, TempTimeZone: any, TempHour: any, TempMinute: any, TempSecond: any, TempTime, TimeZone
  let TempPaymentDate: Date | null | undefined, CalDayLeft, years, months, days, day
  let temp1: Date

  const getCourseServiceByUidAndStatus = async () => {
    let res = await GetCourseServiceByUidAndStatus();
    if (res) {
      setCourseService(res);
    }
  };

  const getTrainer = async () => {
    let res = await GetTrainer();
    if (res) {
      setTrainer(res);
    }
  };

  const getCourseDetail = async () => {
    let res = await GetCourseDetailByID(CourseService?.CourseDetailID);
    if (res) {
      setCourseDetail(res);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof CourseService;
    setCourseService({
      ...CourseService,
      [name]: event.target.value,
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);

    if (success === true) {
      navigate(`/user`);
    }
  };

  const UpdateButton = async () => {
    let data = {
      ID: convertType(CourseService?.ID),
      CRegisterDate: CourseService?.CRegisterDate,
      Agreement: CourseService?.Agreement,
      Status: CourseService?.Status,
      RefundMessage: RefundMessage,
      MemberID: convertType(CourseService?.MemberID),
      CourseDetailID: convertType(CourseDetail?.ID),
      TrainerID: convertType(CourseService?.TrainerID),
    };
    let res = await UpdateCourseService(data);
    console.log(res)
    if (res.status) {
      setSuccess(true);
      setAlertMessage("Update successful");
    } else {
      setError(true)
      setAlertMessage(res.message)
    }
    console.log(JSON.stringify(data))
  }

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

  useEffect(() => {
    getCourseServiceByUidAndStatus();
    getTrainer();
  }, [uid])

  useEffect(() => {
    getCourseDetail();
    if (CourseService?.CRegisterDate !== undefined) {
      temp1 = new Date(CourseService?.CRegisterDate + "")
      if (temp1 !== undefined) {
        [TempDate, TempTimeZone] = (temp1 + "").split(" GMT")
        setCDate(TempDate)
        TimeZone = TempTimeZone.split("")
        if (TempDate !== undefined) {
          [day, months, days, years, TempTime] = TempDate.split(" ");
          if (TempTime !== undefined) {
            [TempHour, TempMinute, TempSecond] = TempTime.split(":");
            const addTimezone = Number(TimeZone[0] + TimeZone[1] + TimeZone[2] + "." + TimeZone[3] + TimeZone[4]);
            if (TempHour !== undefined) {
              setCDate(new Date(Date.UTC(Number(years), SearchMonth(months), Number(days), Number(TempHour) - addTimezone, Number(TempMinute), Number(TempSecond))) + "")
            }
          }
        }
      }
    }
  }, [CourseService])

  return (
    <div>
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
      <Box sx={{ margin: "3rem 16% 0 10%", display: 'flex', justifyContent: "space-between" }}>
        <Card
          sx={{
            maxWidth: 600,
            height: "100%",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
          >
          <CardMedia
            component="img"
            height="400"
            image={CourseDetail?.CoverPage}
            alt="green iguana"
          />
          <CardContent>
            <Box
              sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "0.5rem"
                  }}  
              >
              <Typography
                  mb={2}
                  gutterBottom
                  variant="h3"
                  component="div"
                  // color={"#3b82f6"}
                  style={{ textTransform: "capitalize", fontSize: "1.6rem" }}
              >
                  <b>{CourseDetail?.CourseName}</b>
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                  Category: {CourseDetail?.CourseType?.TypeName}
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h5"
              style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
            >
              {CourseDetail?.Description}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} style={{marginBottom: "2rem"}}>
              Goal: {CourseDetail?.Goal}
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
                {CourseDetail?.Price?.Price} บาท
              </Typography>
              <Typography 
                  sx={{
                  pl: "16px",
                  fontSize: "0.9rem"
                  }}>
                  ระยะเวลาคอร์ส {CourseDetail?.Price?.Duration}
              </Typography>
            </Box>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", margin: "16px 14px 16px 14px"}}>
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
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
        </Card>

        <Box sx={{ fontSize: "1.5rem", width: "55%" }}>
          <Grid container spacing={4} sx={{ display: "flex", alignItems: "center" }} >
            <Grid item xs={12} sx={{ marginLeft: "20%", fontWeight: "bold", display: "flex"}}>
              <Grid item xs={9.5}>
                <Button 
                  variant="contained"
                  style={{
                    color: "#fff",
                    borderRadius: 40,
                    backgroundColor: "#384648",
                    padding: "10px 40px",
                    fontSize: "2rem",
                  }}>
                  Change Trainer
                </Button>
              </Grid>
              <Grid item xs={5} sx={{ textAlign: "right", alignSelf: "flex-end" }}>
                <Clock format={'ddd, MM-DD-YYYY HH:mm:ss'} ticking={true} timezone={'Asia/bangkok'}
                  style={{ fontWeight: "normal", fontSize: "1rem" }}/>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ marginLeft: "10%", marginRight: "-10%" }}>
              <Divider>
              </Divider>
            </Grid>
            
            <Grid item xs={6} sx={{ textAlign: 'right', fontWeight: "bold" }}>
              Member
            </Grid>
            <Grid item xs={6}>
              {UserName}
            </Grid>

            <Grid item xs={6} sx={{ textAlign: 'right', fontWeight: "bold" }}>
              Trainer
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <Select
                  native
                  value={CourseService?.TrainerID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "TrainerID",
                  }}
                  color= "success"
                >
                  <option aria-label="None" value="" style={{color: "grey"}} >
                    Please select trainer
                  </option>
                  {Trainer.map((item: TrainerInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sx={{ textAlign: 'right', fontWeight: "bold", alignSelf: "self-start" }}>
              Date
            </Grid>
            <Grid item xs={6} >
              {CDate}
            </Grid>

            <Grid item xs={6} sx={{ textAlign: "right", fontWeight: "bold", alignSelf: "self-start" }}>
              Reason
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="RefundMessage"
                defaultValue=""
                type="string"
                variant="outlined"
                autoComplete="off"
                color="success"
                multiline
                minRows={5}
                required
                onChange={(event) => {setRefundMessage(event.target.value)}}
                style={{
                  minWidth: "100%",
                  minHeight: 200,
                }}
              />
            </Grid>
            
            <Grid item xs={11}></Grid>
            <Grid item xs={1} sx={{ alignItems: 'center'}}>
              <Button
                className="btn-user"
                variant="contained"
                style={{
                  color: "#384648",
                  borderRadius: 20,
                  backgroundColor: "#D3E4CD",
                  padding: "6px 28px",
                }}
                onClick={UpdateButton}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}
  
export default UpdateCourseServicePage;