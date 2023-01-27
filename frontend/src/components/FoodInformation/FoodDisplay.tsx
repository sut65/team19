import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
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
  } from '@mui/material';

import { 
  Link,
  useParams,
 } from "react-router-dom";

import FoodIcon from "../../images/FoodIcon2.png"
import AddIcon from "../../images/AddIcon.png"

//Interface
import { FoodInformationInterface } from '../../interfaces/IFoodInformation';
import { DeleteFoodInformation, GetFoodInformations } from '../../services/HttpClientService';

function FoodDisplay() {
  const { id } = useParams();
  const [foodinformations, setFoodInformations] = useState<FoodInformationInterface[]>([]);

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

  const DeleteFood = async (id : string) => {
    let res = await DeleteFoodInformation(id);
    if (res) {
      window.location.href = "/food-display";
    }
  }

  useEffect(() => {
    fetchFoodInformation();
  }, []);

  return (
    <Container>
        {/* Header */}
        <Stack direction="row" spacing={2}>

        <Avatar src={FoodIcon} />

        <h1>ข้อมูลอาหารทั้งหมดในระบบ</h1>

        <Avatar src={FoodIcon} />
        
        </Stack>

        <h1> </h1>
        
        <Stack direction="row" spacing={2}>

          {/* ปุ่มเพิ่มข้อมูล */}
          <Link
            to="/food-display/create-food"
            style={{
              textDecoration: "none",
            }}
          >
            <Button variant="contained" color="success">
              เพิ่มข้อมูลอาหาร
              <Avatar src={AddIcon} />
            </Button>
          </Link>
        
        </Stack>
        
        <h1> </h1>
  
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
              </TableRow>
            </TableHead>
              <TableBody>
                {foodinformations.map((foodinformations) => (
                  <TableRow key={foodinformations.ID}>
                    <TableCell align="right">{foodinformations.ID}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Avatar src={foodinformations.Image} />
                      </Box>
                    </TableCell>
                    <TableCell align="center">{foodinformations.Name}</TableCell>
                    <TableCell align="center">{foodinformations.MainIngredient?.Name}</TableCell>
                    <TableCell align="center">{foodinformations.FoodType?.Name}</TableCell>
                    <TableCell align="center">{foodinformations.Datetime}</TableCell>
                    <TableCell align="center">{foodinformations.Admin?.Name}</TableCell>
                    {/* ปุ่มลบข้อมูล */}
                    <TableCell align="right">
                      <Button onClick={() => DeleteFood(foodinformations.ID+"")}>ลบข้อมูล</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>

      </Container>
  );
}

export default FoodDisplay;