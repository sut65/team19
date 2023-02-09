import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Avatar,Button,Stack,IconButton} from "@mui/material";
import { Link,useParams,useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


import EnvironmentIcon from "../../images/environmentIcon.png"
import Body from "../../images/Body.png"
import exercise from "../../images/exercies.jpg"

//Interface
import { BodyInterface } from '../../interfaces/IBody';
import { DeleteInfoBody, GetInfoBody } from '../../services/HttpClientService';










function BodyDisplay() {
  let navigate = useNavigate();
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
        console.log(res.data)
    });
  };

  const DeleteBody = async (id : string) => {
    let res = await DeleteInfoBody(id);
    if (res) {
      window.location.reload();
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
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${exercise}) `,
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
            to="body-record"
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
        <TableContainer component={Paper} sx ={{width:"100%",marginRight:0,borderRadius:"25px",boxShadow:"5px 5px 5px 5px #363435"}}>
          <Table aria-label="simple table">
            <TableHead >
              <TableRow >
                <TableCell align="right"   sx ={{color:"#ec407a"}}>ไอดี</TableCell>
                <TableCell align="right"  sx ={{color:"#3f51b5"}}>ส่วนสูง</TableCell>
                <TableCell align="right"  sx ={{color:"#3f51b5"}}>น้ำหนัก</TableCell>
                <TableCell align="right"  sx ={{color:"#3f51b5"}}>สะโพก</TableCell>
                <TableCell align="right"  sx ={{color:"#3f51b5"}}>ต้นแขน</TableCell>
                <TableCell align="right"  sx ={{color:"#3f51b5"}}>ต้นขา</TableCell>
                <TableCell align="center" sx ={{color:"#3f51b5"}}>เอวคอด</TableCell>
                <TableCell align="right"  sx ={{color:"#3f51b5"}}>เอวสะดือ</TableCell>
                <TableCell align="center" sx ={{color:"#4db6ac"}}>BMI</TableCell>
                <TableCell align="center" sx ={{color:"#78909c"}}>Date</TableCell>
                <TableCell align="center" sx ={{color:"#78909c"}}>Note</TableCell>
                <TableCell align="center" sx ={{color:"#ff8a65"}}><pre>แก้ไข       ลบ</pre></TableCell>
              </TableRow>
            </TableHead>
              <TableBody >
                {infoBody.map((infoBody) => (
                  <TableRow key={infoBody.ID}>
                    <TableCell align="right" >{infoBody.ID}</TableCell>
                    <TableCell align="center">{String(infoBody.Height)}</TableCell>
                    <TableCell align="center">{String(infoBody.Weight)}</TableCell>
                    <TableCell align="center">{String(infoBody.Hip)}</TableCell>
                    <TableCell align="center">{String(infoBody.UpperArm)}</TableCell>
                    <TableCell align="center">{String(infoBody.Thigh)}</TableCell>
                    <TableCell align="center">{String(infoBody.NarrowWaist)}</TableCell>
                    <TableCell align="center" >{String(infoBody.NavelWaist)}</TableCell>
                    <TableCell align="center">{String(infoBody.Bmi)}</TableCell>
                    <TableCell align="center">{infoBody.CreatedAt?.slice(0,10).replaceAll("-",".")}</TableCell>
                    <TableCell align="center">{infoBody.Note}</TableCell>
                    {/* ปุ่มลบข้อมูล */}
                    <TableCell align="right" sx={{display:"flex"}} >
                      <IconButton aria-label="delete" size="large" onClick={() => DeleteBody(infoBody.ID + "")} color="error">
                        <DeleteForeverIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="delete" size="large" onClick={() => navigate(`body-update/${infoBody.ID}`)} color="info">
                      <EditIcon fontSize="inherit" />
                      </IconButton>
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