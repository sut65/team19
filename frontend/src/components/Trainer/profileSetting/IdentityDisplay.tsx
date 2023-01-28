
import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";

import { TrainerInterface } from "../../../interfaces/ITrainer";
import { StatusInterface } from "../../../interfaces/IStatus";
import { EducationInterface } from "../../../interfaces/IEducation";
import { FormOfWorkInterface } from "../../../interfaces/IFormOfWork";
import { ReligionInterface } from "../../../interfaces/IReligion";

import {GetTrainerByID} from "../../../services/HttpClientService"





function IdentityDisplay() {

  const [trainer, setTrainer] = useState<TrainerInterface>({}); 
  const [status, setStatus] = useState<StatusInterface[]>([]); 
  const [edu, setEdu] = useState<EducationInterface[]>([]); 
  const [religion, setReligion] = useState<ReligionInterface[]>([]); 
  const [form, setForm] = useState<FormOfWorkInterface[]>([]); 


  // const apiUrl = "http://localhost:8080";
  // const requestOptionsGet = {
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" }, //เพื่อบอกว่าเป็นการส่ง ปบบ JASON นะ 
  // };

  const fetchTrainerID = async () => {
    let res = await GetTrainerByID();
    if (res) {
      setTrainer(res);
    }
  };

  useEffect(() => {
    fetchTrainerID()
   
  }, []);



  return (
    <Paper
      elevation={0}
      sx={{
        margin: 0,
        display: "grind",
        justifyContent: "flex-start",
        borderRadius: "0px  0px 25px 25px",
        marginBottom: 5,
      }}
    >
      <h1 style={{ color: "#6b7176" }}>Profile</h1>
      {/*==============================================(Name)====================================================*/}
      <Grid xs={12} md={9} sx={{ alignItems: "center" }}>
        <p style={{ color: "#ec407a", fontSize: 15 }}>
          <b>
            <b>NAME</b>
          </b>
        </p>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          required
          sx={{fontWeight: "bold"}}
          disabled
          value={trainer.Name}
          onChange={(event) => {
            // setAddress(event.target.value);
          }}
        />
      </Grid>
      {/*==============================================(Email)====================================================*/}
      <Grid xs={6} md={6}>
        <p style={{ color: "#ec407a", fontSize: 15 }}>
          <b>EMAIL</b>
        </p>
        <TextField
          id="email"
          type="email"
          variant="outlined"
          fullWidth
          disabled
          value={trainer.Email}
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
          variant="outlined"
          fullWidth
          required
          disabled
          value={trainer.Address}
          onChange={(event) => {
            // setAddress(event.target.value);
          }}
        />
      </Grid>

      {/* ====================( Education )==================== */}
      <Grid xs={12} md={9} sx={{ alignItems: "center" }}>
        <p style={{ color: "#ec407a", fontSize: 15 }}>
          <b>
            <b>EDUCATION</b>
          </b>
        </p>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          required
          disabled
          value={trainer.Education?.EducationLevel}
          onChange={(event) => {
            // setAddress(event.target.value);
          }}
        />
      </Grid>

       {/* ====================( Form of Work )==================== */}
       <Grid xs={12} md={9} sx={{ alignItems: "center" }}>
        <p style={{ color: "#ec407a", fontSize: 15 }}>
          <b>
            <b>FORM OF WORK</b>
          </b>
        </p>
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          value={trainer.FormOfWork?.Name}
          required
          disabled
          onChange={(event) => {
            // setAddress(event.target.value);
          }}
        />
      </Grid>
    </Paper>
  );
}

export default IdentityDisplay;
