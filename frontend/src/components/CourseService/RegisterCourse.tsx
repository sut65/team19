import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// Component
import Box from "@mui/material/Box";
import { Button, CardMedia, FormControl, Grid, Select, SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Clock from 'react-live-clock';

import "../../App.css";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { TrainerInterface } from "../../interfaces/ITrainer";
import { CourseServiceInterface } from "../../interfaces/ICourseService";
import { GetTrainer, CreateCourseService } from "../../services/HttpClientService";

const apiUrl = `http://localhost:8080`;
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RegisterCourse() {
  const [CourseService, setCourseService] = useState<CourseServiceInterface>({ CRegisterDate: new Date() })
  const [CourseDetail, setCourseDetail] = useState<CourseDetailInterface>()
  const [Trainer, setTrainer] = useState<TrainerInterface[]>([])
  const [MemberID, setMemberID] = useState<string>()
  const [Agreement, setAgreement] = useState<string>("Disagree")
  const [message, setAlertMessage] = React.useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [DisButton, setDisButton] = useState(false);
  const [showText, setShowText] = useState(false);
  const UFirstName = localStorage.getItem("firstname") + ""
  const ULastName = localStorage.getItem("lastname") + ""
  const UserName = UFirstName + " " + ULastName
  const NowDate = Date.now()
  
  const navigate = useNavigate();
  const params = useParams();
  const uid = localStorage.getItem("uid")
  
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked === false) {
      setAgreement("Agree")
    }
    else {
      setAgreement("Disagree")
    }
    setDisButton(!DisButton)
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
      navigate(`/user/payment/${params.id}`)
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof CourseService;
    setCourseService({
      ...CourseService,
      [name]: event.target.value,
    });
  };

  const getTrainer = async () => {
    let res = await GetTrainer();
    if (res) {
    setTrainer(res);
    }
  };

  async function SelectCourseDetail() {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/course_detail/${params.id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCourseDetail(res.data)
          setMemberID(uid + "")
          return res.data;
        } else {
          return false;
        }
      });
    return res;
  }

  useEffect(() => {
    getTrainer();
    SelectCourseDetail();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function Submit() {
    let data = {
      CRegisterDate: CourseService.CRegisterDate,
      Agreement: Agreement,
      Status: "Active",
      MemberID: convertType(MemberID),
      CourseDetailID: convertType(CourseDetail?.ID),
      TrainerID: convertType(CourseService.TrainerID),
    };
    let res = await CreateCourseService(data);
    if (res.status) {
      setSuccess(true);
      setAlertMessage("ลงทะเบียนคอร์สสำเร็จ กำลังเข้าสู่หน้าชำระเงิน");
    } else {
      setError(true);
      setAlertMessage(res.message);
    }
    console.log(JSON.stringify(data))
  }

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
                  Category: {CourseDetail?.Description?.CourseType}
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: "1.2rem" }}
              variant="h5"
              style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
            >
              {CourseDetail?.Description?.Description}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2} style={{marginBottom: "2rem"}}>
              Goal: {CourseDetail?.Description?.Goal}
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
            <Link
              to={`/user/reviews/${params.id}`} // รอแก้เป็นรีวิว
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
                Read review
              </Button>
            </Link>
          </Box>
        </Card>

        <Box sx={{ fontSize: "1.5rem", width: "55%" }}>
          <Grid container spacing={4} sx={{ display: "flex", alignItems: "center"}} >
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
                  Registration Course
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
                  value={CourseService.TrainerID + ""}
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

            <Grid item xs={6} sx={{ textAlign: 'right', fontWeight: "bold" }}>
              Date
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={CourseService.CRegisterDate}
                    onChange={(newValue) => {
                      setCourseService({
                        ...CourseService,
                        CRegisterDate: newValue,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={new Date(NowDate)}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>

            <Grid item xs={6} ></Grid>
            <Grid item xs={6} >
              <Button onClick={() => setShowText(!showText)} style={{
                color: "#fff",
                borderRadius: 20,
                backgroundColor: "#384648",
                padding: "6px 28px",
              }}
              >
                Agreement
              </Button>
            </Grid>

            <Grid item xs={1.5} ></Grid>
            {showText && <Grid item xs={10.5} style={{ fontSize: "1rem", color: "#343934", paddingLeft: "9%", marginTop: "-20px" }}>
              1) เว็บไซต์นี้มีการเก็บข้อมูลส่วนตัวของสมาชิก <br></br>
              2) ไม่รับผิดชอบการกระทำนอกเหนือคำแนะนำของคอร์สและเทรนเนอร์ <br></br>
              3) เมื่ออ่านครบทุกข้อแล้ว<u>กด "Agree" เพื่อยินยอมข้อตกลง</u> และกด Register เพื่อดำเนินการต่อ

            </Grid>}

            <Grid item xs={6} ></Grid>
            {showText && <Grid item xs={6} sx={{ textAlign: 'left', fontWeight: "bold" }}>
              <FormControlLabel control={
                <Checkbox 
                  color="default"
                  checked={checked}
                  onChange={handleCheck}
                  inputProps={{ 'aria-label': 'controlled' }}
                  />
                }
                label="Agreement"
              />
            </Grid>}
            
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
                onClick={Submit}
                // disabled={!DisButton}
              >
                Register
              </Button>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </div>
  )
}
  
export default RegisterCourse;