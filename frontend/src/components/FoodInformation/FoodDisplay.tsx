import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ButtonGroup from '@mui/material';

import { FoodInformationInterface } from '../../interfaces/IFoodInformation';

function FoodDisplay( 
) {
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

  // const FoodInformationDelete = id => {
  //   var data = {
  //     'id': id
  //   }
    
  //   fetch(`http://localhost:8080/food_informations`, requestOptions, {
  //     method: 'DELETE',
  //     headers: {
  //       Accept: 'application/form-data',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       alert(result['message'])
  //       if (result['status'] === 'ok') {
  //         GetFoodInformations();
  //       }
  //     }
  //   )
  // }

  useEffect(() => {
    fetchFoodInformation();
  }, []);

  return (
    <Container>
        {/* Header */}
        <Box
            display={"flex"}
            sx={{
            }
            }>
            <h1>ข้อมูลอาหารทั้งหมด</h1>
            <h2> </h2>
        </Box>
        
        
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
            </Button>
          </Link>
        
        {/* ปุ่มลบข้อมูล */} 
          <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
          ลบข้อมูลอาหาร
          </Button>

        </Stack>
        
        <Box
            display={"flex"}
            sx={{
            }
            }>
            <h1> </h1>
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
  );
}

export default FoodDisplay;