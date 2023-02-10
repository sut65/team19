import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import Container from "@mui/material/Container";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Avatar,Button,Stack,} from "@mui/material";


import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, Navigate, useLocation } from "react-router-dom";
import EnvironmentIcon from "../../images/environmentIcon.png"
import Body from "../../images/Body.png"
import bg2 from "../../images/trainerBG2.jpg"


import { TrainerInterface } from "../../interfaces/ITrainer";
import { StatusInterface } from "../../interfaces/IStatus";
import { EducationInterface } from "../../interfaces/IEducation";
import { FormOfWorkInterface } from "../../interfaces/IFormOfWork";
import { ReligionInterface } from "../../interfaces/IReligion";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { GetFormOfWork,GetStatus,GetEducation,GetReligion,CreateTrainer } from "../../services/HttpClientService";
import { width } from "@mui/system";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Trainer() {
  // =========================(Use State)==========================

 //Partial -> ทำให้ filed เป็น Optional ได้ คือ สามารถเลือก filed มาบางส่วนได้
 const [trainer, setTrainer] = useState<TrainerInterface>({}); 
 const [status, setStatus] = useState<StatusInterface[]>([]); 
 const [edu, setEdu] = useState<EducationInterface[]>([]); 
 const [religion, setReligion] = useState<ReligionInterface[]>([]); 
 const [form, setForm] = useState<FormOfWorkInterface[]>([]); 
 const [message, setAlertMessage] = React.useState("");


  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [age, setAge] = useState<number>(-1);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [pass, setPass] = React.useState<State>({
    password: "",
    showPassword: false,
  });


  // ==============================(handle password)=====================

  interface State {
    password: string;
    showPassword: boolean;
  }

  const handlePassword =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPass({ ...pass, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setPass({
      ...pass,
      showPassword: !pass.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };


  // =========================(handleClose)=====================

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    success && (window.location.href = "/trainer");
    setSuccess(false);
    setError(false);
  };

  // =========================(HandleChange)======================

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof trainer;  //เรารู้ type แล้วแต่เราต้องการใช้ keyของ trainer
    setTrainer({
      ...trainer,  [name]: event.target.value,     });  //เอาที่มีอยู่เดิมแล้วมาด้วย Spread Operator
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setTrainer({ ...trainer, [name]: e.target.value });
  };

  // =========================(Fetch API)=========================

  const fetchFormOfWork = async () => {
    let res = await GetFormOfWork();
    res && setForm(res);
  };
  const fetchStatus = async () => {
    let res = await GetStatus();
    res && setStatus(res);
  };

  const fetchEducation = async () => {
    let res = await GetEducation();
    res && setEdu(res);
  };

  const fetchReligion = async () => {
    let res = await GetReligion();
    res && setReligion(res);
  };

  useEffect(() => {
    fetchFormOfWork()
    fetchStatus()
    fetchEducation()
    fetchReligion()
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const convertTypeFloat = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseFloat(data) : data;
    return val;
  };

  const submit = async() => {
    let data 
    if (pass.password){
      data = {
        Name: first && last? `${first} ${last}`:"",
        University:(trainer.University),
        Gpax: convertTypeFloat(trainer.Gpax),
        Gender: (trainer.Gender),
        Age: age,
        Address: (trainer.Address),
        Email: (trainer.Email),
        Password: pass.password,
        
        FormOfWorkID: convertType(trainer.FormOfWorkID),
        StatusID: convertType(trainer.StatusID),
        EducationID: convertType(trainer.EducationID),
        ReligionID: convertType(trainer.ReligionID),
      };
    }else{
      setAlertMessage("Password cannot be blank")
      setError(true);
    }
    console.log(data);
    console.log(JSON.stringify(data));

    let res = data && await CreateTrainer(data);
    let msError:string[] =[]; 
    if(res){
      if (res.status) {
        setSuccess(true);
      } else {
        setError(true);
        msError = res.message.split(";");
        setAlertMessage(msError[0]);
      }
    }
    console.log((msError))
      // console.log((msError[0]))
    // console.log(JSON.stringify(res.message))
    
  };

return (
  <div>
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
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${bg2})`,
    }}
  >
    <Container maxWidth="lg" sx={{ marginTop: 6 }}>
      <Paper
        elevation={6}
        sx={{
          marginBottom: 2,
          marginTop: 2,
          padding: 1,
          paddingX: 2,
          display: "flex",
          justifyContent: "flex-start",
          borderRadius:"25px",
        }}
      >
          <Avatar src={Body}  sx={{margin:1,marginRight:5 ,width:70,height:70}}/>
        <h1 style={{ color: "#6b7176" }}>Apply for Trainer </h1>
         <Avatar src={EnvironmentIcon} sx={{marginLeft:1,marginTop:3}}/>
      </Paper>
   
        <Paper
         elevation={8}
          sx={{ paddingX: 6, paddingTop: 1, marginBottom: 2 ,borderRadius:"25px"}}
        >
          <Grid container spacing={2}>
            {/*==================================(First name)=====================*/}
            <Grid xs={6} md={6}>
              <p style={{ color: "grey", fontSize: 15 }}>
                <b>First name</b>
              </p>
              <TextField
                id="Name"
                type="string"
                label="ชื่อ"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  setFirst(event.target.value);
                }}
              />
            </Grid>
            {/*=============================================(Last name)===================*/}
            <Grid xs={6} md={6}>
              <p style={{ color: "grey", fontSize: 15 }}>
                <b>Last name</b>
              </p>
              <TextField
                id="Name"
                type="string"
                label="สกุล"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  setLast(event.target.value);
                }}
              />
            </Grid>
            {/*========================================(Gender)==========================*/}
            <Grid
              xs={6}
              md={6}
              sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
            >
              <FormLabel
                sx={{
                  marginRight: 5,
                  fontSize: 15,
                }}
              >
                <b>Gender:</b>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name ="Gender"
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </Grid>
            {/*===============================================(Age)===================================================*/}
            <Grid
              xs={6}
              md={4}
              sx={{
                display: "flex",
                alignItems: "center",
                paddingRight: 18,
                marginTop: 2,
              }}
            >
              <FormLabel sx={{ marginRight: 2, fontSize: 15 }}>
                <b>Age:</b>
              </FormLabel>
              <TextField
                type="number"
                name="Age"
                fullWidth
                required
                onChange={(event)=>{
                  if (Number(event.target.value) == 0) {
                        setAge(-1);
                      }else{
                        setAge(Number(event.target.value));
                      }
                }}
              />
            </Grid>
          </Grid>
          {/*===========================================(University)=======================================================*/}
          <Grid container spacing={2}>
            <Grid xs={6} md={6} sx={{ alignItems: "center" }}>
              <p style={{ color: "grey", fontSize: 15 }}>
                <b>University</b>
              </p>
              <TextField
                id="outlined-basic"
                label="มหาลัยที่จบการศึกษา"
                variant="outlined"
                fullWidth
                name="University"
                required
                onChange={handleInputChange}
                // inputProps={{ maxLength: 10 }}
              />
            </Grid>
            {/*==============================================(Gpax)====================================================*/}

            <Grid xs={6} md={2} sx={{ alignItems: "center" }}>
              <p style={{ color: "grey", fontSize: 15, marginLeft: 45 }}>
                <b>Gpax</b>
              </p>
              <TextField
                id="outlined-number"
                type="number"
                fullWidth
                name="Gpax"
                required
                sx={{ marginLeft: 6 }}
                // onChange={(event) => {
                //   if (Number(event.target.value) < 0) {
                //     setGpax(0);
                //     return (event.target.value = "0");
                //   } else if (Number(event.target.value) > 4) {
                //     setGpax(4);
                //     return (event.target.value = "4");
                //   } else {
                //     setGpax(+Number(event.target.value).toFixed(4));
                //     return event.target.value;
                //   }
                // }}
                onChange ={handleInputChange}
              />
            </Grid>
            {/*==============================================(Address)====================================================*/}
            <Grid xs={12} md={9} sx={{ alignItems: "center" }}>
              <p style={{ color: "grey", fontSize: 15 }}>
                <b>
                  <b>Address</b>
                </b>
              </p>
              <TextField
                id="outlined-basic"
                label="ที่อยู่"
                variant="outlined"
                fullWidth
                name="Address"
                required
                onChange={handleInputChange}
              />
            </Grid>
            {/*==============================================(Email)====================================================*/}
            <Grid xs={6} md={6}>
              <p style={{ color: "grey", fontSize: 15 }}>
                <b>
                  <b>Email</b>
                </b>
              </p>
              <TextField
                id="email"
                type="email"
                label="้ป้อนอีเมล"
                name="Email"
                variant="outlined"
                fullWidth
                required
                onChange={handleInputChange}
              />
            </Grid>

            {/*=============================================(Password)=====================================================*/}
            <Grid xs={6} md={5}>
              <p style={{ color: "grey", fontSize: 15 }}>
                <b>
                  <b>Password</b>
                </b>
              </p>
              <OutlinedInput
                id="outlined-adornment-password"
                type={pass.showPassword ? "text" : "password"}
                value={pass.password}
                onChange={handlePassword("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {pass.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                inputProps={{minLength:8 }}
              />
            </Grid>
            {/*=======================================(select Form of work)===========================================================*/}
            <Grid xs={6} md={5} sx={{ alignItems: "center", marginLeft: 5 }}>
              <p style={{ color: "grey", fontSize: 15 }}>
                <b>Form of work:</b>
              </p>
              <Select
                required
                id="form"
                value={trainer.FormOfWorkID + ""}
                onChange={handleChange}
                fullWidth
                inputProps={{
                  name: "FormOfWorkID",
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {form.map((item) => (
                  <MenuItem key={item.ID} value={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/*=======================================(select Religion)===========================================================*/}
            <Grid xs={6} md={5} sx={{ alignItems: "center", marginLeft: 12 }}>
              <p style={{ color: "grey", fontSize: 15 }}>
                <b>Religion:</b>
              </p>
              <Select
                // labelId="demo-simple-select-helper-label"
                id="religion"
                value={trainer.ReligionID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ReligionID",
                }}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {religion.map((item) => (
                  <MenuItem key={item.ID} value={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/*=======================================(select Status)===========================================================*/}
            <Grid xs={6} md={5} sx={{ alignItems: "center", marginLeft: 5 }}>
              <p style={{ color: "grey", fontSize: 15 }}>
                <b>Status:</b>
              </p>
              <Select
                required
                id="status"
                value={trainer.StatusID + ""}
                onChange={handleChange}
                fullWidth
                inputProps={{
                  name: "StatusID",
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {status.map((item) => (
                  <MenuItem key={item.ID} value={item.ID}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            {/*=======================================(select Education level)===========================================================*/}
            <Grid xs={6} md={5} sx={{ alignItems: "center", marginLeft: 12 }}>
              <p style={{ color: "grey", fontSize: 15 }}>
                <b>Education level:</b>
              </p>
              <Select
                id="EducationID"
                value={trainer.EducationID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "EducationID",
                }}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {edu.map((item) => (
                  <MenuItem key={item.ID} value={item.ID}>
                    {item.EducationLevel}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid
              container
              xs={12}
              md={12}
              sx={{ margin: 3, marginLeft: 5, justifyContent: "right" }}
            >
              <Link
                to="/"
                style={{
                  color: "#252525",
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button variant="text" size="large" sx={{ marginRight: 5 }}>
                  back
                </Button>
              </Link>
              <Button variant="contained" size="large" onClick={submit}>
                apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
 
    </Container>
    <Snackbar
      open={success}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="success">
        บันทึกข้อมูลสำเร็จ
      </Alert>
    </Snackbar>

    <Snackbar
      open={error}
      autoHideDuration={2000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  </Box>
    
  </div>
);
}

export default Trainer;
