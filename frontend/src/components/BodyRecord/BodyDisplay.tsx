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
  IconButton,
} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import EnvironmentIcon from "../../images/environmentIcon.png";
import bmi_chart from "../../images/bmi_chart.jpg";
import bmi_table2 from "../../images/bmi_table2.png";
import bmi_body1 from "../../images/bmi_body1.png";
import bmi_table3 from "../../images/bmi_table3.png";
import bmi_icon1 from "../../images/bmi_icon1.png";
import bmi_icon2 from "../../images/bmi_icon2.png";
import Body from "../../images/Body.png";
import exercise from "../../images/exercies.jpg";

//Interface
import { BodyInterface } from "../../interfaces/IBody";
import { DeleteInfoBody, GetBodyByMemberID } from "../../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BodyDisplay() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [infoBody, setInfoBody] = useState<BodyInterface[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    success && window.location.reload();
    setSuccess(false);
    setError(false);
  };

  // const fetchInfoBody = async () => {
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   fetch(`http://localhost:8080/bodies`, requestOptions)
  //     .then((response) => response.json())
  //     .then((res) => {
  //       console.log("Api", res.data);
  //       res.data && setInfoBody(res.data);
  //       console.log(res.data);
  //     });
  // };
 
  const GetBodyIDMember = async() => {
      let res = await GetBodyByMemberID();
      console.log(res);
      res && setInfoBody(res);
      console.log(res);
  };

  

  const DeleteBody = async (id: string) => {
    let res = await DeleteInfoBody(id);
    if (res) {
      setSuccess(true);
    }else {
      setError(true);
    }
  };

  useEffect(() => {
    // fetchInfoBody();
    GetBodyIDMember()
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
          <Link to="body-record" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="info">
              บันทึกข้อมูลร่างกาย
              <Avatar src={Body} />
            </Button>
          </Link>
        </Stack>

        <h1> </h1>

        {/* ตาราง */}
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            marginRight: 0,
            borderRadius: "25px",
            boxShadow: "5px 5px 5px 5px #363435",
            marginBottom: "20px",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right" sx={{ color: "#ec407a" }}>
                  ไอดี
                </TableCell>
                <TableCell align="right" sx={{ color: "#3f51b5" }}>
                  ส่วนสูง
                </TableCell>
                <TableCell align="right" sx={{ color: "#3f51b5" }}>
                  น้ำหนัก
                </TableCell>
                <TableCell align="right" sx={{ color: "#3f51b5" }}>
                  สะโพก
                </TableCell>
                <TableCell align="right" sx={{ color: "#3f51b5" }}>
                  ต้นแขน
                </TableCell>
                <TableCell align="right" sx={{ color: "#3f51b5" }}>
                  ต้นขา
                </TableCell>
                <TableCell align="center" sx={{ color: "#3f51b5" }}>
                  เอวคอด
                </TableCell>
                <TableCell align="right" sx={{ color: "#3f51b5" }}>
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
                <TableCell align="center" sx={{ color: "#ff8a65" }}>
                  <pre>แก้ไข ลบ</pre>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {infoBody.map((infoBody) => (
                <TableRow key={infoBody.ID}>
                  <TableCell align="right">{infoBody.ID}</TableCell>
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
                  {/* ปุ่มลบข้อมูล */}
                  <TableCell align="right" sx={{ display: "flex" }}>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => DeleteBody(infoBody.ID + "")}
                      color="error"
                    >
                      <DeleteForeverIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      aria-label="update"
                      size="large"
                      onClick={() => navigate(`body-update/${infoBody.ID}`)}
                      color="info"
                    >
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* ============================================<<Accordion>>========================================================================== */}

        <Accordion sx={{ borderRadius: "25px", marginBottom: "20px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              {" "}
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Avatar src={bmi_icon2} sx={{ width: 50, height: 50 }} />
                <h4>BMI CHART</h4>
              </Stack>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography>
                BMI is a measurement that takes into account your height, and
                weight to produce a calculation. This calculation is a
                measurement of your body size and can be used to determine how
                your body weight is related to your height. It is a method of
                determining whether you may be underweight, average weight,
                overweight, or obese, but it has flaws.
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 5,
                    alignItems: "center",
                    overflow: "auto",
                    gap: 6,
                    height: "80vh",
                    width: "inherit",
                    backgroundSize: "contain", // set backgroundSize to cover
                    backgroundPosition: "center",
                    color: "#f5f5f5",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${bmi_table2})`,
                    backgroundRepeat: "no-repeat",
                  }}
                ></Box>
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ borderRadius: "25px", marginBottom: "10px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              {" "}
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Avatar src={bmi_icon1} sx={{ width: 50, height: 50 }} />
                <h4>WHAT'S YOUR BMI ?</h4>
              </Stack>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Box>
              <Typography>
              Body Mass Index indicates the amount of fat you have roughly by using your height and weight. By this you can understand which weight category you fall into.
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 5,
                    alignItems: "center",
                    overflow: "auto",
                    gap: 6,
                    height: "80vh",
                    width: "inherit",
                    backgroundSize: "contain", // set backgroundSize to cover
                    backgroundPosition: "center",
                    color: "#f5f5f5",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${bmi_body1})`,
                    backgroundRepeat: "no-repeat",
                  }}
                ></Box>
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
       <Box></Box>

        {/* ====================================================================================================================== */}

        <Snackbar
          open={success}
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            ลบข้อมูลสำเร็จ
          </Alert>
        </Snackbar>

        <Snackbar
          open={error}
          autoHideDuration={1000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            ลบข้อมูลไม่สำเร็จ!!!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default BodyDisplay;
