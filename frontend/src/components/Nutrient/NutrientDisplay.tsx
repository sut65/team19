import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { Link } from "react-router-dom";
import { 
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Avatar,
} from '@mui/material';

// Image Import
import FoodIcon from "../../images/FoodIcon.png"
import AddIcon from "../../images/AddIcon.png"

import { NutrientInterface } from '../../interfaces/INutrient';

function NutrientDisplayUI() {

    const [nutrients, setNutrients] = useState<NutrientInterface[]>([]);

    //Fetch API
    const fetchNutrient = async () => {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        };
        fetch(`http://localhost:8080/nutrients`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            console.log("Api", res.data);
            res.data && setNutrients(res.data);
        });
    };

    useEffect(() => {
        fetchNutrient();
    }, []);

    return(

        <Container>

            {/* ส่วนหัว */}
            <Stack direction="row" spacing={2}>

                <Avatar src={FoodIcon} />

                <h1>ข้อมูลสารอาหารที่มีอยู่</h1>

                <Avatar src={FoodIcon} />

            </Stack>

                <h1> </h1>

            <Stack direction="row" spacing={2}>

                {/* ปุ่มเพิ่มข้อมูล */}
                <Link
                    to="/nutrient-display/create-nutrient"
                    style={{
                    textDecoration: "none",
                    }}
                >
                    <Button variant="contained" color="success">
                        <Avatar src={AddIcon} />
                        เพิ่มสารอาหาร
                    </Button>
                </Link>

            </Stack>

            <h1> </h1>

            {/* ตารางแสดงข้อมูล */}
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ไอดี</TableCell>
                  <TableCell align="center">ชื่ออาหาร</TableCell>
                  <TableCell align="center">แคลอรี่</TableCell>
                  <TableCell align="center">สารอาหารหลัก</TableCell>
                  <TableCell align="center">ความคิดเห็น</TableCell>
                  <TableCell align="center">วันที่ทำการเพิ่ม</TableCell>
                  <TableCell align="center">ผู้ดูแลที่ทำการเพิ่ม</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {nutrients.map((nutrients) => (
                  <TableRow key={nutrients.ID}>
                    <TableCell align="right">{nutrients.ID}</TableCell>
                    <TableCell align="center">{nutrients.FoodInformation?.Name}</TableCell>
                    <TableCell align="center">{nutrients.TotalCalorie}</TableCell>
                    <TableCell align="center">{nutrients.MostNutrient?.Name}</TableCell>
                    <TableCell align="center">{nutrients.Comment}</TableCell>
                    <TableCell align="center">{nutrients.Date}</TableCell>
                    <TableCell align="center">{nutrients.Admin?.Name}</TableCell>
                    {/* <TableCell align="center">
                      <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button onClick={() => UpdateUser(user.id)}>Edit</Button>
                        <Button onClick={() => UserDelete(user.id)}>Del</Button>
                      </ButtonGroup>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Container>

    )

}

export default NutrientDisplayUI