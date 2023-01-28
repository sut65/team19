
import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";



function EditSettings() {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
          id="outlined-basic"
          label="ที่อยู่"
          variant="outlined"
          fullWidth
          required
          onChange={(event) => {
            // setAddress(event.target.value);
          }}
        />
      </Grid>
      {/*==============================================(Email)====================================================*/}
      <Grid xs={6} md={6}>
        <p style={{ color: "#f06292", fontSize: 15 }}>
          <b>EMAIL</b>
        </p>
        <TextField
          id="email"
          type="email"
          label="้ป้อนอีเมล"
          variant="outlined"
          fullWidth
          required
          onChange={(event) => {
            // setEmail(event.target.value);
          }}
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
          id="outlined-basic"
          label="ที่อยู่"
          variant="outlined"
          fullWidth
          required
          onChange={(event) => {
            // setAddress(event.target.value);
          }}
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


    </Paper>
  );
}

export default EditSettings;
