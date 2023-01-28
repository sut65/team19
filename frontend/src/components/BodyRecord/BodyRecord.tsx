import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";
import {Avatar} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Box} from "@mui/material";


import {GetTrainer} from "../../services/HttpClientService"
import {GetCourseDetail} from "../../services/HttpClientService"
import {GetMemberByID} from "../../services/HttpClientService"
import {CreateBody} from "../../services/HttpClientService"
import EnvironmentIcon from "../../images/environmentIcon.png"
import toneLight from "../../images/toneLight.jpg"


import { BodyInterface } from "../../interfaces/IBody";
import { TrainerInterface } from "../../interfaces/ITrainer";
import { CourseDetailInterface } from "../../interfaces/ICourseDetail";
import { MemberInterface } from "../../interfaces/IMember";

// import { GetAdminByID } from "../services/HttpClientService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Grain } from "@mui/icons-material";




const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Trainer() {
  // =========================(Use State)====================================================


  const [body, setBody] = useState<BodyInterface>({}); 
  const [trainer, setTrainer] = useState<TrainerInterface[]>([]); 
  const [member, setMember] = useState<MemberInterface[]>([]); 
  const [courseD, setCourseDetail] = useState<CourseDetailInterface[]>([]); 

  const [hight, setHight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [hip, setHip] = useState<number>(0);
  const [armLeft, setarmL] = useState<number>(0);
  const [armRight, setarmR] = useState<number>(0);
  const [leftThigh, setLthigh] = useState<number>(0);
  const [rightThigh, setRthigh] = useState<number>(0);
  const [narrowWaist, setnarrow] = useState<number>(0);
  const [navelWaist, setnavel] = useState<number>(0);
  const [note, setnote] = useState<string>("");


  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  // =========================(handleClose)====================================================

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  // =========================(HandleChange)====================================================

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof body;  //เรารู้ type แล้วแต่เราต้องการใช้ keyของ trainer
    // console.log(event.target.name);
    // console.log(event.target.value);
    setBody({
      ...body,                                             //เอาที่มีอยู่เดิมแล้วมาด้วย Spread Operator
      [name]: event.target.value,
    });
  };

  // =========================(Fetch API)====================================================

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" }, //เพื่อบอกว่าเป็นการส่ง ปบบ JASON นะ 
  };

 //FetchAPI
 const fetchTrainer = async () => {
    let res = await GetTrainer();
    res && setTrainer(res);
};

const fetchCourseDetail = async () => {
    let res = await GetCourseDetail();
    res && setCourseDetail(res);
};


const fetchMemberByID = async () => {
    let res = await GetMemberByID();
    body.MemberID = res.ID;
    if (res) {
      setMember(res);
    }
  };


  useEffect(() => {
    fetchTrainer()
    fetchCourseDetail()
    fetchMemberByID()
 
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const submit = async () => {
    let data = {
        Hieght:        hight,
        Weight:        weight,
        Hip:           hip,
        UpperArmLeft:  armLeft,
        UpperArmRight: armRight,
        LeftThigh :    leftThigh,
        RightThigh:   rightThigh,
        NarrowWaist:  narrowWaist,
        NavelWaist:   navelWaist,
        Bmi:          ((hight/100)**2)/weight,
        Note :         note,
      
        TrainerID: convertType(body.TrainerID),
        MemberID: convertType(body.MemberID),
        CourseDetailID: convertType(body.CourseDetailID),
    };
    console.log(data);
    console.log(JSON.stringify(data));
    
    let res = await CreateBody(data);
    if (res) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setSuccess(true);
      window.location.href = "/user/body-display";
    } else {
      setError(true);
    }
    console.log(JSON.stringify(data))

  };

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
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${ toneLight })`,
    }}
  >
    <Container maxWidth="md" sx={{ marginTop: 6 }}>
      <Paper
        elevation={4}
        sx={{
          marginBottom: 2,
          marginTop: 2,
          padding: 1,
          paddingX: 2,
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <h3 style={{ color: "#6b7176", fontSize: 20 }}>
          บันทึกการเปลี่ยนแปลงร่างกาย
        </h3>
        <Avatar src={EnvironmentIcon} sx={{ marginTop: 1, marginLeft: 1 }} />
      </Paper>
      <form>
        <Paper
          variant="outlined"
          sx={{display: "flex",justifyContent: "center",flexDirection: "column",alignItems: "center", borderRadius: "25px",}}
        >
          <FormLabel sx={{ marginRight: 0, fontSize: 17 }}>
            <b>บันทึกการเปลี่ยนแปลงร่างกาย หน่วยเป็น cm</b>
          </FormLabel>
          <Grid container spacing={2} sx={{ display:"flex",justifyContent:"center" }}>
            {/*===============================================(Height)===================================================*/}
            <Grid
              xs={5}
              md={5}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 18,
                marginTop: 2,
                justifyContent: "center"
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                <b>Height</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    return (event.target.value = "0");
                  } else {
                    setHight(Number(event.target.value));
                    return event.target.value;
                  }
                }}
              />
            </Grid>
            {/*===============================================(Weight)===================================================*/}
            <Grid
              xs={5}
              md={5}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 18,
                marginTop: 2,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                <b>Weight:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    return (event.target.value = "0");
                  } else {
                    setWeight(Number(event.target.value));
                    return event.target.value;
                  }
                }}
              />
            </Grid>
            {/*===============================================(HIP)===================================================*/}
            <Grid
              xs={5}
              md={5}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 18,
                marginTop: 2,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                <b>HIP:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    return (event.target.value = "0");
                  } else {
                    setHip(Number(event.target.value));
                    return event.target.value;
                  }
                }}
              />
            </Grid>
            {/*===============================================(Uper arm left)===================================================*/}
            <Grid
              xs={5}
              md={5}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 18,
                marginTop: 2,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                <b>Upper arm left:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    return (event.target.value = "0");
                  } else {
                    setarmL(Number(event.target.value));
                    return event.target.value;
                  }
                }}
              />
            </Grid>
            {/*===============================================(Upper arm right)===================================================*/}
            <Grid
              xs={5}
              md={5}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 18,
                marginTop: 2,
              }}
            >
              <FormLabel
                sx={{ marginRight: 2, fontSize: 15, tex: "flex-start" }}
              >
                <b>Upper arm right:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    return (event.target.value = "0");
                  } else {
                    setarmR(Number(event.target.value));
                    return event.target.value;
                  }
                }}
              />
            </Grid>
            {/*===============================================(Left thigh)===================================================*/}
            <Grid
              xs={5}
              md={5}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 18,
                marginTop: 2,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                <b>Left thigh:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    return (event.target.value = "0");
                  } else {
                    setLthigh(Number(event.target.value));
                    return event.target.value;
                  }
                }}
              />
            </Grid>
            {/*===============================================(Right thigh)===================================================*/}
            <Grid
              xs={6}
              md={5}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 18,
                marginTop: 2,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                <b>Right thigh:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    return (event.target.value = "0");
                  } else {
                    setRthigh(Number(event.target.value));
                    return event.target.value;
                  }
                }}
              />
            </Grid>
            {/*===============================================(Narrow waist)===================================================*/}
            <Grid
              xs={6}
              md={5}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 18,
                marginTop: 2,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                <b>Narrow waist:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    return (event.target.value = "0");
                  } else {
                    setnarrow(Number(event.target.value));
                    return event.target.value;
                  }
                }}
              />
            </Grid>
            {/*===============================================(Navel waist)===================================================*/}
            <Grid
              xs={6}
              md={5}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 18,
                marginTop: 2,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                <b>Navel waist:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    return (event.target.value = "0");
                  } else {
                    setnavel(Number(event.target.value));
                    return event.target.value;
                  }
                }}
              />
            </Grid>

            {/*============================================( Note )======================================================*/}
            <Grid xs={6} md={6} sx={{ display: "flex", alignItems: "center" }}>
              <FormLabel
                sx={{ textAlign: "center", marginRight: 2, fontSize: 15 }}
              >
                <b>Note:</b>
              </FormLabel>

              <TextField
                id="Name"
                type="string"
                variant="outlined"
                sx={{ marginTop: 2 }}
                required
                onChange={(event) => {
                  setnote(event.target.value);
                }}
              />
            </Grid>

            <Grid
              container
              xs={12}
              md={12}
              spacing={2}
              sx={{ display: "flex" }}
            >
              {/*=======================================(select Course)===========================================================*/}
              <Grid xs={6} md={4} sx={{ margin: 3 }}>
                <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                  <b>Course Details:</b>
                </FormLabel>
                <Select
                  required
                  id="courseDetails"
                  value={body.CourseDetailID + ""}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{
                    name: "CourseDetailID",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {courseD.map((item) => (
                    <MenuItem key={item.ID} value={item.ID}>
                      {item.CourseName}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              {/*=======================================(Select Trainer)===========================================================*/}
              <Grid xs={6} md={4} sx={{ margin: 3 }}>
                <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                  <b>Trainer:</b>
                </FormLabel>
                <Select
                  id="EducationID"
                  value={body.TrainerID + ""}
                  onChange={handleChange}
                  inputProps={{
                    name: "TrainerID",
                  }}
                  fullWidth
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {trainer.map((item) => (
                    <MenuItem key={item.ID} value={item.ID}>
                      {item.Name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>

            {/* ================================<back and apply>==================================== */}
            <Grid
              container
              xs={12}
              md={12}
              sx={{ margin: 1, marginLeft: 5, justifyContent: "right" }}
            >
              <Link
                to="/user/body-display"
                style={{
                  color: "#252525",
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button variant="text" size="large" sx={{ marginRight: 5 ,marginBottom:2 }}>
                  back
                </Button>
              </Link>
              <Button variant="contained" size="large" onClick={submit} sx= {{marginBottom:2}}>
                บันทึกข้อมูลร่างกาย
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Container>
    <Snackbar
      open={success}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="success">
        บันทึกข้อมูลสำเร็จ
      </Alert>
    </Snackbar>

    <Snackbar
      open={error}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error">
        บันทึกข้อมูลไม่สำเร็จ
      </Alert>
    </Snackbar>
  </Box>
);
}

export default Trainer;
