
import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";


import { TrainerInterface } from "../../../interfaces/ITrainer";

import {GetTrainerByID,UpdateTrainer} from "../../../services/HttpClientService"
import Fingerprint from '@mui/icons-material/Fingerprint';
import { AlignVerticalCenterTwoTone, Update } from "@mui/icons-material";
import { display } from "@mui/system";



function EditSettings() {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<String>("");
  const [email, setEmail] = useState<String>("");

  
  const [trainer, setTrainer] = useState<TrainerInterface>({}); 



  const [pass, setPass] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  const [passNew, setPassNew] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  const [passOK, setPassOK] = React.useState<State>({
    password: "",
    showPassword: false,
  });// condition ตอน submit
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setTrainer({ ...trainer, [name]: e.target.value });
};


  const fetchTrainerID = async () => {
    let res = await GetTrainerByID();
    if (res) {
      setTrainer(res);
    }
  };

  useEffect(() => {
    fetchTrainerID()
   
  }, []);

     // ==============================(handle password)=====================================

  interface State {
    password: string;
    showPassword: boolean;
  }
//Newpassword
  const handlePasswordNew =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassNew({ ...passNew, [prop]: event.target.value });
    };

  const handleClickShowPasswordNew = () => {
    setPassNew({
      ...passNew,
      showPassword: !passNew.showPassword,
    });
  };

  const handleMouseDownPasswordNew = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //confirmation
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

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
};

// Equalation password
const passwordchange = () =>{
  if(pass.password == passNew.password){
   return passNew.password
  }}

  //======================< submit >===============

  const submit = async () => {

    let data = {
      ID: convertType(trainer.ID),
      Name: trainer.Name,
      Email: trainer.Email,
      Address: trainer.Address,
      Password: passwordchange(),
    };
    console.log(data);
    console.log(JSON.stringify(data));

    let res = await UpdateTrainer(data);
    if (res) {
        setSuccess(true);
        window.location.reload();
      } else {
        setError(true);
    }

  };


  return (
    <Paper
      elevation={0}
      sx={{
        margin: 0,
        display: "grind",
        justifyContent: "flex-start",
        borderRadius: "0px  0px 25px 25px",
      }}
    >
      <h1 style={{ color: "#6b7176" }}>Edit</h1>
      {/*==============================================(Name)====================================================*/}
      <Grid xs={12} md={9} sx={{ alignItems: "center" }}>
        <p style={{ color: "#ec407a", fontSize: 15 }}>
          <b>
            <b>NAME</b>
          </b>
        </p>
        <TextField
          id="Name"
          name="Name"
          variant="outlined"
          value={trainer.Name}
          fullWidth
          required
          onChange={handleInputChange}
        />
      </Grid>
      {/*==============================================(Email)====================================================*/}
      <Grid xs={6} md={6}>
        <p style={{ color: "#f06292", fontSize: 15 }}>
          <b>EMAIL</b>
        </p>
        <TextField
          id="email"
          name="Email"
          type="email"
          variant="outlined"
          value={trainer.Email}
          fullWidth
          required
          onChange={handleInputChange}
        />
      </Grid>
      {/*==============================================(location)====================================================*/}
      <Grid xs={12} md={9} sx={{ alignItems: "center" }}>
        <p style={{ color: "#ec407a", fontSize: 15 }}>
          <b>
            <b>LOCATION</b>
          </b>
        </p>
        <TextField
          id="Address"
          name="Address"
          variant="outlined"
          fullWidth
          required
          value={trainer.Address}
          onChange={handleInputChange}
        />
      </Grid>
      {/* =================================( New password)=============================================================== */}
      <Grid xs={6} md={5}>
        <p style={{ color: "#ec407a", fontSize: 15 }}>
          <b>
            <b>NEW PASSWORD</b>
          </b>
        </p>
        <OutlinedInput
          id="outlined-adornment-password"
          type={passNew.showPassword ? "text" : "password"}
          value={passNew.password}
          onChange={handlePasswordNew("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPasswordNew}
                onMouseDown={handleMouseDownPasswordNew}
                edge="end"
              >
                {passNew.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          inputProps={{ maxLength: 10 }}
        />
      </Grid>
      {/* ==================================( Confirm password )====================================== */}
      <Grid xs={6} md={5}>
        <p style={{ color: "#ec407a", fontSize: 15 }}>
          <b>
            <b>CONFIRM PASSWORD</b>
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
      {/*==============================================(Button)====================================================*/}
      <Grid sx = {{display:"flex" ,justifyContent:"flex-end"}}>
 
        <Link
          to="/"
          style={{
            color: "#252525",
            textDecoration: "none",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="text" size="large" sx={{ marginRight: 5,marginTop:5 }}>
            back
          </Button>
          <Button
          variant="contained"
          size="large"
          onClick={submit}
          sx={{ marginTop: 5, marginRight: 0 }}
        >
          Update
        </Button>
        </Link>
      </Grid>
    </Paper>
  );
 }

export default EditSettings;
