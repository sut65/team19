import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
} from '@mui/material';

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "../../App.css"

//Iamge Import
import FoodIcon from "../../images/FoodIcon2.png"
import AddIcon from "../../images/AddIcon.png"
import homeBg from "../../images/FoodBG.jpg"

//Interface
import { FoodInformationInterface } from '../../interfaces/IFoodInformation';

//API
import { DeleteFoodInformation } from '../../services/HttpClientService';

function FoodDisplay() {
  let navigate = useNavigate();
  const [foodinformations, setFoodInformations] = useState<FoodInformationInterface[]>([]);

  const DeleteFood = async (id: string) => {
    let res = await DeleteFoodInformation(id);
    if (res) {
      window.location.href = "/admin/food-display";
    }
  }

  //Fetch API
  const fetchFoodInformation = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:8080/food_informations`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("Api", res.data);
        res.data && setFoodInformations(res.data);
      });
  };

  useEffect(() => {
    fetchFoodInformation();
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
        gap: 6,
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        color: "#f5f5f5",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${homeBg})`,
      }}
    >
      <Box mb={"10rem"}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center" }}>

          <Avatar src={FoodIcon} />

          <h1>ข้อมูลอาหารทั้งหมดในระบบ</h1>

          <Avatar src={FoodIcon} />

        </Box>
        <Box mb={5}>

          {/* ปุ่มเพิ่มข้อมูล */}
          <Link
            to="/admin/food-display/create-food"
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="contained" color="success"
              sx={{ borderRadius: 20 }}>
              <Avatar src={AddIcon} />
              เพิ่มข้อมูลอาหาร
            </Button>
          </Link>

        </Box>


        {/* ตาราง */}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ไอดี</TableCell>
                <TableCell align="center">รูปภาพ</TableCell>
                <TableCell align="center">ชื่ออาหาร</TableCell>
                <TableCell align="center">วัตถุดิบหลัก</TableCell>
                <TableCell align="center">ประเภท</TableCell>
                <TableCell align="center">วันที่ทำการเพิ่ม</TableCell>
                <TableCell align="center">ผู้ดูแลที่ทำการเพิ่ม</TableCell>
                <TableCell align="center"> </TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodinformations.map((foodinformations) => (
                <TableRow key={foodinformations.ID}>
                  <TableCell align="right">{foodinformations.ID}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Avatar src={foodinformations.Image}
                        sx={{ width: 110, height: 110 }} />
                    </Box>
                  </TableCell>
                  <TableCell align="center">{foodinformations.Name}</TableCell>
                  <TableCell align="center">{foodinformations.MainIngredient?.Name}</TableCell>
                  <TableCell align="center">{foodinformations.FoodType?.Name}</TableCell>
                  <TableCell align="center">{foodinformations.Datetime}</TableCell>
                  <TableCell align="center">{foodinformations.Admin?.Name}</TableCell>
                  <TableCell align="center">
                    {/* ปุ่มแก้ไขข้อมูล */}
                    <IconButton aria-label="delete" size="large" onClick={() => navigate(`update-food/${foodinformations.ID}`)} color="info">
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                    {/* ปุ่มลบข้อมูล */}
                    <IconButton aria-label="delete" size="large" onClick={() => DeleteFood(foodinformations.ID + "")} color="error">
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

export default FoodDisplay;