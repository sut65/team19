import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { 
  Link,
  useNavigate,
  } from "react-router-dom";

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
    IconButton,
} from '@mui/material';

import "../../App.css"

// Image Import
import FoodIcon from "../../images/FoodIcon.png"
import AddIcon from "../../images/AddIcon.png"
import homeBg from "../../images/NutBG.jpg";


//Interface
import { NutrientInterface } from '../../interfaces/INutrient';

//API
import { DeleteNutrient } from '../../services/HttpClientService';

function NutrientDisplayUI() {
    let navigate = useNavigate();
    const [nutrients, setNutrients] = useState<NutrientInterface[]>([]);

    const DeleteNut = async (id : string) => {
      let res = await DeleteNutrient(id);
      if (res) {
        window.location.href = "/admin/nutrient-display";
      }
    }

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
      //ภาพพื้นหลัง
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          height: "100vh",
          width: "100vw",
          overflow: "auto",
          backgroundSize: "cover",
          color: "#f5f5f5",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${homeBg})`,
        }}
      >


        <Box mb={"10rem"}>
            {/* ส่วนหัว */}
          <Box sx={{ display: "flex", alignItems: "center" }}>

            <Avatar src={FoodIcon} />

            <h1>ข้อมูลอาหารสารอาหารทั้งหมด</h1>

            <Avatar src={FoodIcon} />

          </Box>

                <h1> </h1>

            <Stack direction="row" spacing={2}>

                {/* ปุ่มเพิ่มข้อมูล */}
                <Link
                    to="/admin/nutrient-display/create-nutrient"
                    style={{
                    textDecoration: "none",
                    }}
                >
                    <Button variant="contained" color="success"
                    sx = {{ borderRadius: 20 }}>
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
                  <TableCell align="center"> </TableCell>
                  <TableCell align="center"> </TableCell>
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
                    <TableCell align="right">
                       {/* ปุ่มแก้ไขข้อมูล */}
                      <IconButton aria-label="delete" size="large" onClick={() => navigate(`update-nutrient/${nutrients.ID}`)} color="info">
                      <EditIcon fontSize="inherit" />
                      </IconButton>
                      {/* ปุ่มลบข้อมูล */}
                      <IconButton aria-label="delete" size="large" onClick={() => DeleteNut(nutrients.ID + "")} color="error">
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
    
    )

}

export default NutrientDisplayUI