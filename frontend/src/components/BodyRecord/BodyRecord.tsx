import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import FormLabel from "@mui/material/FormLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Link, useLocation ,useParams} from "react-router-dom";
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
import { Grain, Height, WidthFull } from "@mui/icons-material";
import { width } from "@mui/system";
import bodyBG2 from "../../images/bodyBG2.jpg"
import { length } from "localforage";




const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function BodyRecord() {
  // =========================(Use State)====================================================

  const [body, setBody] = useState<BodyInterface>({}); 
  const [trainer, setTrainer] = useState<TrainerInterface[]>([]); 
  const [courseD, setCourseDetail] = useState<CourseDetailInterface[]>([]); 
  const [message, setAlertMessage] = React.useState("");



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
    success &&( window.location.href = "/user/body-display");
    setSuccess(false);
    setError(false);
  };

  // =========================(HandleChange)====================================================

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof body;  //เรารู้ type แล้วแต่เราต้องการใช้ keyของ trainer
    setBody({
      ...body,[name]: event.target.value });                             //เอาที่มีอยู่เดิมแล้วมาด้วย Spread Operator
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setBody({ ...body, [name]: e.target.value });
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
    let bm = ((Number(body.Weight))/(Number(body.Height)/100)**2)
    let data = {
        Height:      convertType(body.Height),
        Weight:        convertType(body.Weight),
        Hip:           convertType(body.Hip),
        UpperArm:      convertType(body.UpperArm),
        Thigh :        convertType(body.Thigh),
        NarrowWaist:  convertType(body.NarrowWaist),
        NavelWaist:   convertType(body.NavelWaist),
        Bmi:        Number(bm.toFixed(2)),
        Note :        body.Note,
      
        TrainerID: convertType(body.TrainerID),
        MemberID: convertType(body.MemberID),
        CourseDetailID: convertType(body.CourseDetailID),
    };
    console.log(data);
    console.log(JSON.stringify(data));
    
    let res = await CreateBody(data);
    let msError:string[] =[]; 
    if (res.status) {
      setSuccess(true);
    } else {
      setError(true);
      msError=((res.message).split(";"));
      setAlertMessage(msError[0]);
    }
    console.log((msError))
    // console.log((msError[0]))
    // console.log(JSON.stringify(res.message))

  };

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
      // color: "#f5f5f5",
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)), url(${bodyBG2})`,
    }}
  >
    <Container maxWidth="lg" sx={{ marginTop: 6 }}>
      <Paper
        elevation={8}
        sx={{
          marginBottom: 2,
          marginTop: 2,
          padding: 1,
          paddingX: 4,
          display: "flex",
          justifyContent: "flex-start",
          borderRadius: "40px",
          bgcolor: "#fafffa",
        }}
      >
        <h2 style={{ color: "#3f6656" }}>บันทึกการเปลี่ยนแปลงร่างกาย</h2>
        <Avatar src={EnvironmentIcon} sx={{ marginTop: 1, marginLeft: 1 }} />
      </Paper>
      <form>
        <Paper
          elevation={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "stretch",
            flexDirection: "column",
            alignItems: "satrt",
            borderRadius: "40px",
            bgcolor: "#fafffa",
            paddingLeft:10,
          }}
        >
          <FormLabel sx={{ marginY: 2, fontSize: 17, color: "#3f6656" }}>
            <h3>บันทึกการเปลี่ยนแปลงร่างกาย หน่วยเป็น (cm)</h3>
          </FormLabel>
          <Grid
            container
            spacing={1}
            sx={{ display: "flex",justifyItems:"stretch" }}
          >
            {/*===============================================(Height)===================================================*/}
            <Grid
              xs={2}
              md={2}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 0,
                marginRight:3,
                justifyContent: "center",
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 18, color: "#3f6656" }}>
                <b>Height:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                name="Height"
                fullWidth
                required
                onChange={handleInputChange}
              />
            </Grid>
            {/*===============================================(Weight)===================================================*/}
            <Grid
              xs={2}
              md={2}
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight:3,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 18 , color: "#3f6656"}}>
                <b>Weight:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                name="Weight"
                // onChange={(event) => {
                //   if (Number(event.target.value) < 0) {
                //     return (event.target.value = "0");
                //   } else {
                //     setWeight(Number(event.target.value));
                //     return event.target.value;
                //   }
                // }}
                onChange={handleInputChange}
              />
            </Grid>
            {/*===============================================(HIP)===================================================*/}
            <Grid
              xs={2}
              md={2}
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: 2,
              }}
            >
              <FormLabel sx={{ fontSize: 18 , color: "#3f6656"}}>
                <b>HIP:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                name="Hip"
                fullWidth
                required
                sx ={{padding:2}}
                onChange={handleInputChange}
              />
            </Grid>
            {/*===============================================(Upper Arm)===================================================*/}
            <Grid
              xs={2}
              md={3}
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight:4,
                paddingRight:5 ,
              }}
            >
              <FormLabel sx={{ marginRight: 3, fontSize: 18 , color: "#3f6656"}}>
                <pre><b>Upper Arm :</b></pre>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                required
                name="UpperArm"
                onChange={handleInputChange}
              />
            </Grid>
            {/*===============================================(Thigh)===================================================*/}
            <Grid
              xs={2}
              md={2}
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 2,
                marginRight: 3,
              }}
            >
              <FormLabel sx={{ marginRight: 3, fontSize: 18 , color: "#3f6656"}}>
                <b>Thigh:</b>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                name="Thigh"
                fullWidth
                required
                onChange={handleInputChange}
              />
            </Grid>
            {/*===============================================(NarrowWaist)===================================================*/}
            <Grid
              xs={2}
              md={3}
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 2,
                marginRight: 5,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 18 , color: "#3f6656"}}>
                <pre><b>Narrow waist:</b></pre>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                name="NarrowWaist"
                required
                onChange={handleInputChange}
              />
            </Grid>
            {/*===============================================(NavelWaist)===================================================*/}
            <Grid
              xs={2}
              md={3}
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 18 , color: "#3f6656"}}>
                <pre><b>Navel waist:</b></pre>
              </FormLabel>
              <TextField
                id="outlined-number"
                type="number"
                name="NavelWaist"
                fullWidth
                required
                onChange={handleInputChange}
              />
            </Grid>

            {/*============================================( Note )======================================================*/}
            <Grid xs={6} md={6} sx={{ display: "flex", alignItems: "center" }}>
              <FormLabel
                sx={{ textAlign: "center", marginRight: 2, fontSize: 18 , color: "#3f6656"}}
              >
                <b>Note:</b>
              </FormLabel>

              <TextField
                id="Name"
                type="string"
                variant="outlined"
                name="Note"
                fullWidth
                sx={{ marginTop: 2 }}
                required
                onChange={handleInputChange}
              />
            </Grid>

            <Grid
              container
              xs={12}
              md={12}
              spacing={0}
              sx={{ display: "flex", justifyContent: "stretch" }}
            >
              {/*=======================================(select Course)===========================================================*/}
              <Grid xs={6} md={4} sx={{ margin: 3 }}>
                <FormLabel sx={{ marginRight: 2, fontSize: 18 , color: "#3f6656"}}>
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
                <FormLabel sx={{ marginRight: 2, fontSize: 18 , color: "#3f6656"}}>
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
                <Button
                  variant="text"
                  size="large"
                  sx={{ marginRight: 5, marginBottom: 2 }}
                >
                  back
                </Button>
              </Link>
              <Button
                variant="contained"
                size="large"
                onClick={submit}
                sx={{ marginBottom: 2, marginRight: 5 }}
              >
                บันทึกข้อมูลร่างกาย
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </Container>
    <Snackbar
      open={success}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="success">
        บันทึกข้อมูลสำเร็จ
      </Alert>
    </Snackbar>

    <Snackbar
      open={error}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  </Box>
);
}

export default BodyRecord;
