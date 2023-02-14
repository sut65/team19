import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  IconButton,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import "../../App.css";

//Image Import
import DlyIcon from "../../images/DailyRoutines/dlyIcon3.png";
import AddIcon from "../../images/AddIcon.png";
import homeBg from "../../images/MealPlans/MealPlansBackground5.jpg";

//Interface
import { DailyRoutinesInterface } from "../../interfaces/IDailyRoutines";

//API
import { DeleteDailyRoutines } from "../../services/HttpClientService";

function DailyRoutinesDisplay() {
  let navigate = useNavigate();
  const [dailyRoutines, setDailyRoutines] = useState<DailyRoutinesInterface[]>(
    []
  );

  const DeleteDaily = async (id: string) => {
    let res = await DeleteDailyRoutines(id);
    if (res) {
      window.location.href = "/user/daily-routines-display";
    }
  };

  //Fetch API
  const fetchDailyRoutines = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:8080/daily_routines`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("Api", res.data);
        res.data && setDailyRoutines(res.data);
      });
  };

  useEffect(() => {
    fetchDailyRoutines();
  }, []);

  return (
    //ภาพพื้นหลัง
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexFlow: "",
        overflow: "auto",
        alignItems: "center",
        // gap: 1,
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        color: "#f5f5f5",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${homeBg})`,
      }}
    >
      <Box mb={"10rem"}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar src={DlyIcon} />

          <h1>ข้อมูลกิจวัตรประจำวันทั้งหมด</h1>

          <Avatar src={DlyIcon} />
        </Box>
        <Box mb={5}>
          {/* ปุ่มเพิ่มข้อมูล */}
          <Link
            to="/user/daily-routines-display/create-daily_routines"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: 20 }}
            >
              <Avatar src={AddIcon} />
              เพิ่มข้อมูลกิจวัตรประจำวัน
            </Button>
          </Link>
        </Box>

        {/* ตาราง */}
        <TableContainer
          style={{
            width: "1030px",
          }}
          component={Paper}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ padding: 100 }}>
                <TableCell align="right">ID</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">TimeStamp</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">ActivityName</TableCell>

                <TableCell align="center">ActivityType</TableCell>
                <TableCell align="center">BreakFastTime</TableCell>
                <TableCell align="center">LunchTime</TableCell>
                <TableCell align="center">DinnerTime</TableCell>
                <TableCell align="center">WakeUpTime</TableCell>
                <TableCell align="center">BedTime</TableCell>
                <TableCell align="center"> </TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dailyRoutines.map((dailyRoutines) => (
                <TableRow key={dailyRoutines.ID}>
                  <TableCell align="right">{dailyRoutines.ID}</TableCell>
                  <TableCell align="center">
                    {dailyRoutines.Description}
                  </TableCell>
                  <TableCell colSpan={2} align="center">
                    {dailyRoutines.TimeStamp}
                  </TableCell>
                  <TableCell colSpan={1} align="center">
                    {dailyRoutines.Activity?.Name}
                  </TableCell>
                  <TableCell align="center">
                    {dailyRoutines.Activity?.ActivityType}
                  </TableCell>
                  <TableCell align="center">
                    {dailyRoutines.MealTime?.BreakFastTime}
                  </TableCell>
                  <TableCell align="center">
                    {dailyRoutines.MealTime?.LunchTime}
                  </TableCell>
                  <TableCell align="center">
                    {dailyRoutines.MealTime?.DinnerTime}
                  </TableCell>
                  <TableCell align="center">
                    {dailyRoutines.SleepSchedule?.WakeUpTime}
                  </TableCell>
                  <TableCell align="center">
                    {dailyRoutines.SleepSchedule?.BedTime}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      height: "40px",
                    }}
                  >
                    {/* ปุ่มแก้ไขข้อมูล */}
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() =>
                        navigate(`update-food/${dailyRoutines.ID}`)
                      }
                      color="info"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    {/* ปุ่มลบข้อมูล */}
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => DeleteDaily(dailyRoutines.ID + "")}
                      color="error"
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default DailyRoutinesDisplay;
