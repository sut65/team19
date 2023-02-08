import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import Container from "@mui/material/Container";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, Navigate, useLocation } from "react-router-dom";


import { TrainerInterface } from "../../interfaces/ITrainer";
import { StatusInterface } from "../../interfaces/IStatus";
import { EducationInterface } from "../../interfaces/IEducation";
import { FormOfWorkInterface } from "../../interfaces/IFormOfWork";
import { ReligionInterface } from "../../interfaces/IReligion";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Trainer() {
  // =========================(Use State)====================================================

 //Partial -> ทำให้ filed เป็น Optional ได้ คือ สามารถเลือก filed มาบางส่วนได้
 const [trainer, setTrainer] = useState<TrainerInterface>({}); 
 const [status, setStatus] = useState<StatusInterface[]>([]); 
 const [edu, setEdu] = useState<EducationInterface[]>([]); 
 const [religion, setReligion] = useState<ReligionInterface[]>([]); 
 const [form, setForm] = useState<FormOfWorkInterface[]>([]); 


  const [first, setFirst] = useState<String>("");
  const [last, setLast] = useState<String>("");
  const [university, setUniversity] = useState<String>("");
  const [gpax, setGpax] = useState<number>(0.0);
  const [gender, setGender] = useState<String>("");
  const [age, setAge] = useState<number>(0);
  const [address, setAddress] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [pass, setPass] = React.useState<State>({
    password: "",
    showPassword: false,
  });


  // ==============================(handle password)=====================================

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


  // =========================(handleClose)====================================================

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

  // =========================(HandleChange)====================================================

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof trainer;  //เรารู้ type แล้วแต่เราต้องการใช้ keyของ trainer
    // console.log(event.target.name);
    // console.log(event.target.value);
    setTrainer({
      ...trainer,                                             //เอาที่มีอยู่เดิมแล้วมาด้วย Spread Operator
      [name]: event.target.value,
    });
  };

  // =========================(Fetch API)====================================================

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" }, //เพื่อบอกว่าเป็นการส่ง ปบบ JASON นะ 
  };

  const fetchFormOfWork = async () => {
    fetch(`${apiUrl}/forms`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setForm(result.data);
      });
  };
  const fetchStatus = async () => {
    fetch(`${apiUrl}/statuses`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setStatus(result.data);
      });
  };

  const fetchEducation = async () => {
    fetch(`${apiUrl}/educations`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setEdu(result.data);
      });
  };

  const fetchReligion = async () => {
    fetch(`${apiUrl}/religions`, requestOptionsGet)
     .then((response) => response.json())
     .then((result) => {
        setReligion(result.data);
      });
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

  const submit = () => {
    let data = {
      Name: `${first} ${last}`,
      University:university,
      Gpax: gpax,
      Gender: gender,
      Age: age,
      Address: address,
      Email: email,
      Password: pass.password,
      
      FormOfWorkID: convertType(trainer.FormOfWorkID),
      StatusID: convertType(trainer.StatusID),
      EducationID: convertType(trainer.EducationID),
      ReligionID: convertType(trainer.ReligionID),
    };
    console.log(data);
    console.log(JSON.stringify(data));
    

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // แปลงเป็น JSON -> String แบบ Json
    };

    fetch(`${apiUrl}/trainer`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
        if (res.data) {
          setTimeout(() => {
           window.location.href = "/trainer";
          }, 10000);
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  };

return (
  <div>
    <Container maxWidth="lg" sx={{ marginTop: 6 }}>
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
        <h3 style={{ color: "#6b7176" }}>Apply for work</h3>
      </Paper>
      <form>
        <Paper
          variant="outlined"
          sx={{ padding: 2, paddingTop: 1, marginBottom: 2 }}
        >
          <Grid container spacing={2}>
            {/*============================================(First name)======================================================*/}
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
            {/*=============================================(Last name)=====================================================*/}
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
            {/*========================================(Gender)=========================================================*/}
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
                name="row-radio-buttons-group"
                onChange={(event) => {
                  setGender(event.target.value);
                }}
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
                id="outlined-number"
                type="number"
                fullWidth
                required
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    return (event.target.value = "0");
                  } else {
                    setAge(Number(event.target.value));
                    return event.target.value;
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
                required
                onChange={(event) => {
                  setUniversity(event.target.value);
                }}
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
                required
                sx={{ marginLeft: 6 }}
                onChange={(event) => {
                  if (Number(event.target.value) < 0) {
                    setGpax(0);
                    return (event.target.value = "0");
                  } else if (Number(event.target.value) > 4) {
                    setGpax(4);
                    return (event.target.value = "4");
                  } else {
                    setGpax(+Number(event.target.value).toFixed(4));
                    return event.target.value;
                  }
                }}
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
                required
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
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
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
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
                inputProps={{ maxLength: 10 }}
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
  </div>
);
}

export default Trainer;
