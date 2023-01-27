import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Avatar,Button,Stack,} from "@mui/material";
import { Link,useParams,} from "react-router-dom";

import EnvironmentIcon from "../../images/environmentIcon.png"
import Body from "../../images/Body.png"
import exercise from "../../images/exercies.jpg"

//Interface
import { BodyInterface } from '../../interfaces/IBody';
import { DeleteInfoBody, GetInfoBody } from '../../services/HttpClientService';

function BodyDisplay() {
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
      window.location.href = "/BodyDisplay";
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
      alignItems: "center",
      overflow :"auto",
      gap: 6,
      height: "100vh",
      width: "100vw",
      backgroundSize: "cover",
      color: "#f5f5f5",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${exercise})`,
    }}
  >
    <Container sx={{ margin: "3rem" }}>
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
            to="/BodyRecord"
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
        <TableContainer component={Paper} sx ={{width:"100%",marginRight:0}}>
          <Table aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell align="right" width={50} sx ={{color:"#ec407a"}}>ไอดี</TableCell>
                <TableCell align="right" width={100} sx ={{color:"#3f51b5"}}>ส่วนสูง</TableCell>
                <TableCell align="right" width={100} sx ={{color:"#3f51b5"}}>น้ำหนัก</TableCell>
                <TableCell align="right" width={100} sx ={{color:"#3f51b5"}}>สะโพก</TableCell>
                <TableCell align="right" width={100} sx ={{color:"#3f51b5"}}>ต้นแขนซ้าย</TableCell>
                <TableCell align="right" width={100} sx ={{color:"#3f51b5"}}>ต้นแขนขวา</TableCell>
                <TableCell align="right" width={100} sx ={{color:"#3f51b5"}}>ต้นขาซ้าย</TableCell>
                <TableCell align="right" width={100} sx ={{color:"#3f51b5"}}>ต้นขาขวา</TableCell>
                <TableCell align="right" width={100} sx ={{color:"#3f51b5"}}>เอวคอด</TableCell>
                <TableCell align="right" width={100} sx ={{color:"#3f51b5"}}>เอวสะดือ</TableCell>
                <TableCell align="right" sx ={{color:"#4db6ac"}}>BMI</TableCell>
                <TableCell align="right" sx ={{color:"#78909c"}}>Note</TableCell>
              </TableRow>
            </TableHead>
              <TableBody>
                {infoBody.map((infoBody) => (
                  <TableRow key={infoBody.ID}>
                    <TableCell align="right" >{infoBody.ID}</TableCell>
                    <TableCell align="center">{String(infoBody.Hieght)}</TableCell>
                    <TableCell align="center">{String(infoBody.Weight)}</TableCell>
                    <TableCell align="center">{String(infoBody.Hip)}</TableCell>
                    <TableCell align="center">{String(infoBody.UpperArmLeft)}</TableCell>
                    <TableCell align="center">{String(infoBody.UpperArmLeft)}</TableCell>
                    <TableCell align="center">{String(infoBody.LeftThigh)}</TableCell>
                    <TableCell align="center">{String(infoBody.RightThigh)}</TableCell>
                    <TableCell align="center">{String(infoBody.NarrowWaist)}</TableCell>
                    <TableCell align="center">{String(infoBody.NavelWaist)}</TableCell>
                    <TableCell align="center">{String(infoBody.Bmi)}</TableCell>
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

export default BodyDisplay;