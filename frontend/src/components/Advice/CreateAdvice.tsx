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
  TextField,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";

import AddAdviceIcon from "../../images/AddAdviceIcon.png";
import AdviceIcon from "../../images/AdviceIcon.png";
import homeBg from "../../images/AdviceBG.jpg";

//Interface
import { BodyInterface } from "../../interfaces/IBody";
import { DailyRoutinesInterface } from "../../interfaces/IDailyRoutines";
import { MemberInterface } from "../../interfaces/IMember";
import { AdviceInterface } from "../../interfaces/IAdvice";
import { Description } from "@mui/icons-material";

function CreateAdvice() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [advice, setAdvice] = useState<AdviceInterface>({});
  const [member, setMember] = useState<MemberInterface[]>([]);
  const [infoBody, setInfoBody] = useState<BodyInterface[]>([]);
  const [dailyRoutines, setDailyRoutines] = useState<DailyRoutinesInterface[]>(
    []
  );
  const [datetime, setDatetime] = useState<Date | string | null>(new Date());

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState({ name: "", src: "" });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setAdvice({ ...advice, [name]: e.target.value });
  };

  const fetchInfoBodyByID = async () => {
    //const id = localStorage.getItem("uid");

    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const res = await (
      await fetch(`http://localhost:8080/bodies`, requestOptions)
    ).json();
    console.log(res);
    setInfoBody(filterID(res.data));
    // fetch(`http://localhost:8080/bodies`, requestOptions)
    //     .then((response) => response.json())
    //     .then((res) => {
    //         console.log("Api", res.data);
    //         setInfoBody(filterID(res.data));
    //     });
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
    const res = await (
      await fetch(`http://localhost:8080/daily_routines`, requestOptions)
    ).json();
    console.log(res);
    setDailyRoutines(filterID(res.data));
    // fetch(`http://localhost:8080/dailyRoutine`, requestOptions)
    //     .then((response) => response.json())
    //     .then((res) => {
    //         console.log("dailyRoutine", res.data);
    //         setdailyRoutine(filterID(res.data));

    //     });
  };

  const filterID = (res: any) => {
    return res
      .filter((v: any) => v.ID === parseInt(id || ""))
      .map((i: any) => i);
  };

  useEffect(() => {
    fetchInfoBodyByID();
    fetchdailyRoutineByID();
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
      <Container sx={{ margin: "3rem" }}>
        {/* Header */}
        <Stack direction="row" spacing={2}>
          <Avatar src={AdviceIcon} />

          <h1>คำแนะนำ</h1>

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
        <TableContainer
          component={Paper}
          sx={{ width: "100%", marginRight: 0 }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell align="center" sx={{ color: "#ec407a" }}>ไอดี</TableCell> */}
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  กิจกรรม
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  ประเภทกิจกรรม
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  ระยะเวลา
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dailyRoutines.map((dailyRoutines) => (
                <TableRow key={dailyRoutines.ID}>
                  <TableCell align="center">
                    {String(dailyRoutines.Description)}
                  </TableCell>
                  <TableCell align="center">
                    {dailyRoutines.TimeStamp?.slice(0, 10).replaceAll("-", ".")}
                  </TableCell>
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
        }}
      >
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
            height: "100%",
          }}
        />
      </Paper>

      {/* </Box> */}
    </Box>
  );
}

export default CreateAdvice;
