
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

import {GetTrainerByID,UpdateTrainer, UpdateTrainerNoPass} from "../../../services/HttpClientService"


import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Password } from "@mui/icons-material";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




function EditSettings() {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [trainer, setTrainer] = useState<TrainerInterface>({}); 
  const [msErroe, setmsError] = useState<string>(); 


// =========================(handleClose)====================================================

const handleClose = (
  event?: React.SyntheticEvent | Event,
  reason?: string
) => {
  if (reason === "clickaway") {
    return;
  }
  success && (window.location.reload());
  setSuccess(false);
  setError(false);
};


  const [pass, setPass] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  const [passNew, setPassNew] = React.useState<State>({
    password: "",
    showPassword: false,
  });


  
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

  //======================< submit >===============

  const submit = async () => {
    let con_pass = false;
    let con_nopass = false;
    const passwordchange = () =>{
      if(pass.password && passNew.password ){
        // console.log("มีการกรอก passworsd")
        if (pass.password == passNew.password) {
          con_pass =true;
          return passNew.password;
        } else {
          // setError(true);
          con_pass=false;
          setmsError("Password does not match")
          setError(true)
        }
      }else if(pass.password || passNew.password){
        con_pass=false;
        setmsError("Please enter your password in both fields.")
        setError(true)
      }
      
      else{
        con_pass =false;
        con_nopass =true;
        // return"123456789" // จะกลับมาแก้ปัญหาในภายหลัง
      }
    }

    let data = {
      ID: convertType(trainer.ID),
      Name: trainer.Name,
      University: trainer.University,
      Gpax: trainer.Gpax,
      Gender: trainer.Gender,
      Age: trainer.Age,
      Address: trainer.Address,
      Email: trainer.Email,
      Password: passwordchange(),

      FormOfWorkID: convertType(trainer.FormOfWorkID),
      StatusID: convertType(trainer.StatusID),
      EducationID: convertType(trainer.EducationID),
      ReligionID: convertType(trainer.ReligionID),

    };
    // console.log(data.Password);
    // console.log(JSON.stringify(data));

    let dataNopass = {
      ID: convertType(trainer.ID),
      Name: trainer.Name,
      University: trainer.University,
      Gpax: trainer.Gpax,
      Gender: trainer.Gender,
      Age: trainer.Age,
      Address: trainer.Address,
      Email: trainer.Email,

      FormOfWorkID: convertType(trainer.FormOfWorkID),
      StatusID: convertType(trainer.StatusID),
      EducationID: convertType(trainer.EducationID),
      ReligionID: convertType(trainer.ReligionID),

    };

    let msError:string[] =[]; 
    let res = con_pass ? await UpdateTrainer(data) : con_nopass ? await UpdateTrainerNoPass(data) : setError(true);
    if (res) {
      if (res.status) {
          setSuccess(true);
      } else {
        setError(true);
        msError=((res.message).split(";"));
        setmsError(msError[0]);
      }
    }
  };

  return (
   <div>
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
        <p style={{ color: "#8A94FF", fontSize: 15 }}>
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
        <p style={{ color: "#8A94FF", fontSize: 15 }}>
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
        <p style={{ color: "#8A94FF", fontSize: 15 }}>
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
        <p style={{ color: "#8A94FF", fontSize: 15 }}>
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
          inputProps={{minLength:8}}
        />
      </Grid>
      {/* ==================================( Confirm password )====================================== */}
      <Grid xs={6} md={5}>
        <p style={{ color: "#8A94FF", fontSize: 15 }}>
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
          inputProps={{ minLength:8}}
        />
      </Grid>
      {/*==============================================(Button)====================================================*/}
      <Grid sx = {{display:"flex" ,justifyContent:"flex-end"}}>
          <Link
                to="/trainer"
                style={{
                  color: "#252525",
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button variant="text" size="large" sx={{ marginRight: 5,marginTop: 1 }}>
                  back
                </Button>
              </Link>
          <Button
          variant="contained"
          size="large"
          onClick={submit}
          sx={{ marginTop: 1 }}
        >
          Update
        </Button>
      </Grid>
    </Paper>
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
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error">
        {msErroe}
      </Alert>
    </Snackbar>
   </div>

    
  );
 }

export default EditSettings;
