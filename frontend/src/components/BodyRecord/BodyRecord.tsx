import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Avatar,Button,Stack,} from "@mui/material";
import { Link,useParams,} from "react-router-dom";

import EnvironmentIcon from "../../images/environmentIcon.png"
import Body from "../../images/Body.png"
import exercise from "../../images/exercies.jpg"

//Interface
import { FoodInformationInterface } from '../../interfaces/IFoodInformation';
import { BodyInterface } from '../../interfaces/IBody';
import { DeleteFoodInformation, GetFoodInformations } from '../../services/HttpClientService';
import { DeleteInfoBody, GetInfoBody } from '../../services/HttpClientService';

function BodyRecord() {
  const { id } = useParams();
  const [infoBody, setInfoBody] = useState<BodyInterface[]>([]);


  const fetchInfoBody = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    fetch(`http://localhost:8080/bodies`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log("Api", res.data);
        res.data && setInfoBody(res.data);
    });
  };

  const DeleteBody = async (id : string) => {
    let res = await DeleteInfoBody(id);
    if (res) {
      window.location.href = "/BodyRecord";
    }
  }

  useEffect(() => {
    fetchInfoBody();
  }, []);

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 6,
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      backgroundSize: "cover",
      color: "#f5f5f5",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${exercise})`,
    }}
  >
    <Container sx ={{marginRight:65}}>
        {/* Header */}
        <Stack direction="row" spacing={2}>

        <Avatar src={EnvironmentIcon} />

        <h1>บันทึกการเปลี่ยนแปลงร่างกาย</h1>

        <Avatar src={EnvironmentIcon} />
        
        </Stack>

        <h1> </h1>
        
        <Stack direction="row" spacing={2}>

          {/* ปุ่มเพิ่มข้อมูล */}
          <Link
            to="/food-display/create-food"
            style={{textDecoration: "none",}}
            >
            <Button variant="contained" color="info">
              บันทึกข้อมูลร่างกาย
              <Avatar src={Body} />
            </Button>
          </Link>
        
        </Stack>
        
        <h1> </h1>
  
        {/* ตาราง */}
        <TableContainer component={Paper} sx ={{width:1500,marginRight:200}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">ไอดี</TableCell>
                <TableCell align="center">ส่วนสูง</TableCell>
                <TableCell align="center">น้ำหนัก</TableCell>
                <TableCell align="center">สะโพก</TableCell>
                <TableCell align="center">ต้นแขนซ้าย</TableCell>
                <TableCell align="center">ต้นแขนขวา</TableCell>
                <TableCell align="center">ต้นขาซ้าย</TableCell>
                <TableCell align="center">ต้นขาขวา</TableCell>
                <TableCell align="center">เอวคอด</TableCell>
                <TableCell align="center">เอวสะดือ</TableCell>
                <TableCell align="center">BMI</TableCell>
                <TableCell align="center">Note</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {infoBody.map((infoBody) => (
                  <TableRow key={infoBody.ID}>
                    <TableCell align="right">{infoBody.ID}</TableCell>
                    <TableCell align="center">{String(infoBody.Hieght)+" cm"}</TableCell>
                    <TableCell align="center">{String(infoBody.Weight)+" cm"}</TableCell>
                    <TableCell align="center">{String(infoBody.Hip)+" cm"}</TableCell>
                    <TableCell align="center">{String(infoBody.UpperArmLeft)+" cm"}</TableCell>
                    <TableCell align="center">{String(infoBody.UpperArmLeft)+" cm"}</TableCell>
                    <TableCell align="center">{String(infoBody.LeftThigh)+" cm"}</TableCell>
                    <TableCell align="center">{String(infoBody.RightThigh)+" cm"}</TableCell>
                    <TableCell align="center">{String(infoBody.NarrowWaist)+" cm"}</TableCell>
                    <TableCell align="center">{String(infoBody.NavelWaist)+" cm"}</TableCell>
                    <TableCell align="center">{String(infoBody.Bmi)+" cm"}</TableCell>
                    <TableCell align="center">{infoBody.Note}</TableCell>
                    {/* ปุ่มลบข้อมูล */}
                    <TableCell align="right">
                      <Button onClick={() => DeleteBody(infoBody.ID+"")}>ลบข้อมูล</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>

      </Container>
      </Box>
  );
}

export default BodyRecord;