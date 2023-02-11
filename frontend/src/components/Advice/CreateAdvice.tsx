import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Stack,
  TextField, Snackbar, Select, SelectChangeEvent, Typography, Grid, FormControl,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import AddAdviceIcon from "../../images/AddAdviceIcon.png";
import AdviceIcon from "../../images/AdviceIcon.png";
import homeBg from "../../images/AdviceBG.jpg";

//Interface
import { BodyInterface } from "../../interfaces/IBody";
import { DailyRoutinesInterface } from "../../interfaces/IDailyRoutines";
import { MemberInterface } from "../../interfaces/IMember";
import { AdviceInterface } from "../../interfaces/IAdvice";
import { Description } from "@mui/icons-material";import { createAdvice, GetCourseServiceBYUID, GetTrainer, GetTrainerByID } from '../../services/HttpClientService';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TrainerInterface } from '../../interfaces/ITrainer';
import { CourseServiceInterface } from '../../interfaces/ICourseService';
import { Clock } from '@mui/x-date-pickers/ClockPicker/Clock';
import { DatePicker } from '@mui/x-date-pickers';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function CreateAdvice() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [advice, setAdvice] = useState<AdviceInterface>({});
  const [courseService, setCourseService] = useState<CourseServiceInterface>({});
  const [infoBody, setInfoBody] = useState<BodyInterface[]>([]);
  const [dailyRoutines, setDailyRoutines] = useState<DailyRoutinesInterface[]>(
    []
  );
  const [trainer, setTrainer] = useState<TrainerInterface>({});
    const NowDate = Date.now();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);


  // console.log("infoBody", infoBody[0]);
    // console.log("dailyActivities", dailyActivities[0]);


    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof advice;
        setAdvice({
            ...advice,
            [name]: event.target.value,
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        console.log(name);
        setAdvice({ ...advice, [name]: e.target.value });
    };

    const fetchTrainerByID = async () => {
        let res = await GetTrainerByID();
        res && setTrainer(res);
    }

    const fetchCourseServiceByID = async () => {
        let res = await GetCourseServiceBYUID();
        res && setCourseService(res);
    }


  const fetchInfoBodyByID = async () => {
    //const id = localStorage.getItem("uid");

        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        const res = await (await fetch(`http://localhost:8080/bodies`, requestOptions)).json();
        console.log(res.data);
        setInfoBody(filterID(res.data));
    };

  const fetchdailyRoutineByID = async () => {
    //const id = localStorage.getItem("uid");

        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };
        //พอ async แล้วเราจะรอให้ fetch เสร็จก่อนแล้วค่อย return กลับมา ทำที่ละหนึ่ง
        const res = await (await fetch(`http://localhost:8080/dailyactivities`, requestOptions)).json();
        console.log(res);
        setDailyRoutines(filterID(res.data));
    };

    const filterID = (res: any) => {
        return res.filter((v: any) => v.MemberID === parseInt(id || "")).map((i: any) => i);
    }


    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    // insert data to db
    const submit = async () => {
        let newData = {
            CourseServiceID: Number(courseService.ID),
            BodyID: Number(infoBody.map(i => i.ID)),
            DailyActivitiesID: Number(dailyRoutines.map(i => i.ID)),
            Advice: advice.Advice,
            RecordingDate: advice.RecordingDate,
        };

        let res = await createAdvice(newData);
        res ? setSuccess(true) : setError(true);
        window.location.href = "/trainer/advice-display"

        console.log(newData);
    };



    useEffect(() => {
        fetchCourseServiceByID();
        fetchInfoBodyByID();
        fetchdailyRoutineByID();
        fetchTrainerByID();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "auto",
                gap: 6,
                height: "100vh",
                width: "100vw",
                backgroundSize: "cover",
                color: "#f5f5f5",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${homeBg})`,
            }}
        >
            {/* Alert */}
            <Snackbar
                open={success}
                autoHideDuration={1000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    บันทึกข้อมูลสำเร็จ
                </Alert>
            </Snackbar>

            <Snackbar
                open={error}
                autoHideDuration={1000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="error">
                    บันทึกข้อมูลไม่สำเร็จ
                </Alert>
            </Snackbar>
            <Container sx={{ margin: "3rem" }}>
                {/* Header */}
                <Stack direction="row" spacing={2}>

                    <Avatar src={AdviceIcon} />

                    <h1>ระบบให้คำแนะนำ</h1>

          <Avatar src={AdviceIcon} />
        </Stack>

        <h1> </h1>

        {/* ตาราง body*/}
        <TableContainer
          component={Paper}
          sx={{ width: "100%", marginRight: 0, mb: "2rem" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ color: "#ec407a" }}>
                  ไอดี
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  ส่วนสูง
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  น้ำหนัก
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  สะโพก
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  ต้นแขน
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  ต้นขา
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  เอวคอด
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  เอวสะดือ
                </TableCell>
                <TableCell align="center" sx={{ color: "#4db6ac" }}>
                  BMI
                </TableCell>
                <TableCell align="center" sx={{ color: "#78909c" }}>
                  Date
                </TableCell>
                <TableCell align="center" sx={{ color: "#78909c" }}>
                  Note
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {infoBody.map((infoBody) => (
                <TableRow key={infoBody.ID}>
                  <TableCell align="center">{infoBody.ID}</TableCell>
                  <TableCell align="center">
                    {String(infoBody.Height)}
                  </TableCell>
                  <TableCell align="center">
                    {String(infoBody.Weight)}
                  </TableCell>
                  <TableCell align="center">{String(infoBody.Hip)}</TableCell>
                  <TableCell align="center">
                    {String(infoBody.UpperArm)}
                  </TableCell>
                  <TableCell align="center">{String(infoBody.Thigh)}</TableCell>
                  <TableCell align="center">
                    {String(infoBody.NarrowWaist)}
                  </TableCell>
                  <TableCell align="center">
                    {String(infoBody.NavelWaist)}
                  </TableCell>
                  <TableCell align="center">{String(infoBody.Bmi)}</TableCell>
                  <TableCell align="center">
                    {infoBody.CreatedAt?.slice(0, 10).replaceAll("-", ".")}
                  </TableCell>
                  <TableCell align="center">{infoBody.Note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

                {/* ตาราง Daily Activities*/}
                <TableContainer component={Paper} sx={{ width: "100%", marginRight: 0 }}>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow >
                                <TableCell align="center" sx={{ color: "#ec407a" }}>ไอดี</TableCell>
                                <TableCell align="center" sx={{ color: "#3f51b5" }}>กิจกรรม</TableCell>
                                <TableCell align="center" sx={{ color: "#3f51b5" }}>ประเภทกิจกรรม</TableCell>
                                <TableCell align="center" sx={{ color: "#3f51b5" }}>ระยะเวลา</TableCell>
                                {/* <TableCell align="center" sx={{ color: "#3f51b5" }}>Date</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {dailyRoutines.map((dailyRoutines) => (
                                <TableRow key={dailyRoutines.ID}>
                                    <TableCell align="center" >{dailyRoutines.ID}</TableCell>
                                    <TableCell align="center" >{String(dailyRoutines.Name)}</TableCell>
                                    <TableCell align="center">{String(dailyRoutines.Activity?.ActivityType)}</TableCell>
                                    <TableCell align="center">{String(dailyRoutines.TimeStamp)}</TableCell>
                                    {/* <TableCell align="center">{dailyRoutines.Date?.slice(0, 10).replaceAll("-", ".")}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>


            {/* <Box
                sx={{
                    position: "relative",
                    width: "50%",
                    mx: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                    mb: "10rem",
                }}
            > */}
            <Paper
            sx={{
                position: "relative",
                width: "50%",
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                mb: "10rem",
                
            }}>
                <TextField
                    id="advice"
                    name="Advice"
                    value={advice.Advice}
                    onChange={handleInputChange}
                    multiline
                    placeholder="เขียนคำแนะนำ"
                    minRows={2}
                    sx={{
                        fontSize: "1.5rem",
                        minWidth: "100%",
                        height:"100%",
                    }}
                />
            </Paper>


            {/* </Box> */}



        </Box>
    );
}

export default CreateAdvice;
