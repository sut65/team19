import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import { Avatar, Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { 
  Link,
  useNavigate,
  } from "react-router-dom";
import Stack from "@mui/material/Stack"

import { BehaviorInterface } from "../../interfaces/IBehavior";

import { GetBehaviorByID } from "../../services/HttpClientService";

import { DeleteBehavior } from "../../services/HttpClientService";


function DisplayBehavior() {

    const [behavior, setbehavior] = useState<BehaviorInterface>({}); 
   
    let navigate = useNavigate();

    
    interface TabPanelProps {
      children?: React.ReactNode;
      index: number;
      value: number;
    }

    const fetchBehaviorID = async () => {
        let res = await GetBehaviorByID();
        if (res) {
          setbehavior(res);
        }
      };
    
      useEffect(() => {
        fetchBehaviorID()
       
      }, [])

    return(
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
            <h1>พฤติกรรมก่อนเข้าเทรน</h1>
          </Paper>
          <form>
            <Paper
              variant="outlined"
              sx={{ padding: 20, paddingTop: 2, marginBottom: 20 }}
            >
              <Grid container spacing={2} sx={{ marginTop: 1}}>
 {/*============================================(Meals)======================================================*/}
                <Grid xs={5} xl = {5} md={5}>
                  <p style={{ fontSize: 17 }}>มื้ออาหารที่คุณกิน :</p>
                <TextField
                  id="outlined-basic"
                  name="Meals"
                  variant="outlined"
                  disabled
                  fullWidth
                  required
                  value={behavior.Meals}
                  onChange={(event) => {
                    // setAddress(event.target.value);
                  }}
                />
               </Grid> 
               <Grid xs={2} md={2}>
               </Grid>
{/*=============================================(taste)=====================================================*/}
                <Grid xs={5} xl = {5} md={5}>
                  <p style={{ fontSize: 17 }}>รสอาหารที่คุณชอบกิน :</p>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      disabled
                      fullWidth
                      required
                      value={behavior.Taste?.Name}
                      onChange={(event) => {
                        // setAddress(event.target.value);
                       }}
                    />
                  </Grid>
                  
{/*==============================================(exercise)====================================================*/}
                <Grid xs={6} xl = {5} md={5}>
                  <p style={{ fontSize: 17 }}>จำนวนครั้งการออกกำลังกาย :</p>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        disabled
                        value={behavior.Exercise?.Name}
                        required
                        onChange={(event) => {
                          // setEmail(event.target.value);
                        }}
                      />
                </Grid>
                <Grid xs={2} md={2}>
                    <h1></h1>
               </Grid>
{/*==============================================(Time)====================================================*/}
                <Grid xs={5} xl = {5} md={5}>
                  <p style={{ fontSize: 17 }}>วันเวลาที่ทำการเพิ่ม :</p>
                <TextField
                  id="outlined-basic"
                  name="Time"
                  variant="outlined"
                  disabled
                  fullWidth
                  required
                  value={behavior.Time}
                  onChange={(event) => {
                    // setAddress(event.target.value);
                  }}
                />
               </Grid> 
            </Grid> 
               <Grid xs={2} md={1} sx={{ marginTop: 6 }}>
                          <Stack direction="row" spacing={5} >
                            {/* ปุ่มเพิ่มข้อมูล */}
                            <Button variant="contained" color="inherit"
                              onClick={() => navigate(`create-behavior/`)}>
                                เพิ่มการสำรวจ
                              </Button>
                            {/* ปุ่มแก้ไขข้อมูล */}
                              <Button variant="contained" color="info"
                              onClick={() => navigate(`update-behavior/${behavior.ID}`)}>
                                แก้ไขข้อมูล
                              </Button>
                          </Stack>
                </Grid>
            </Paper>
        </form>          
    </Container>
    );
}
export default DisplayBehavior;