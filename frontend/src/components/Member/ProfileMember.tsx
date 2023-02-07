import React, { useState, useEffect } from "react";
import { Container } from "@mui/system";
import { Avatar, Grid } from "@mui/material";
import Typography from "@mui/material";
import Box from '@mui/material/Box';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { 
  Link,
  useNavigate,
  } from "react-router-dom";
import Stack from "@mui/material/Stack"

import { MemberInterface } from "../../interfaces/IMember";

import { GetMemberByID } from "../../services/HttpClientService";

function ProfileMember() {

    const [member, setMember] = useState<MemberInterface>({}); 

    const fetchMemberID = async () => {
        let res = await GetMemberByID();
        if (res) {
          setMember(res);
        }
      };
    
      useEffect(() => {
        fetchMemberID()
       
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
            <h4 style={{ color: "#6b7176" }}>Profile Member</h4>
          </Paper>
          <form>
            <Paper
              variant="outlined"
              sx={{ padding: 20, paddingTop: 1, marginBottom: 20 }}
            >
            
              <Grid container spacing={2} sx={{ marginBottom: 1}}>
 {/*============================================(First name)======================================================*/}
                <Grid xs={5} xl = {5} md={5}>
                  <p style={{ color: "grey", fontSize: 17 }}>Firstname</p>
                <TextField
                  id="outlined-basic"
                  name="Firstname"
                  variant="outlined"
                  disabled
                  fullWidth
                  required
                  value={member.Firstname}
                  onChange={(event) => {
                    // setAddress(event.target.value);
                  }}
                />
               </Grid> 
               <Grid xs={1} md={1}>
               </Grid>
{/*=============================================(Last name)=====================================================*/}
                <Grid xs={5} xl = {5} md={5}>
                  <p style={{ color: "grey", fontSize: 17 }}>Lastname</p>
                    <TextField
                      id="outlined-basic"
                      name="Firstname"
                      variant="outlined"
                      disabled
                      fullWidth
                      required
                      value={member.Lastname}
                      onChange={(event) => {
                        // setAddress(event.target.value);
                       }}
                    />
                  </Grid>
{/*==============================================(Email)====================================================*/}
                <Grid xs={6} xl = {5} md={11}>
                  <p style={{ color: "grey", fontSize: 17 }}>EMAIL</p>
                    <TextField
                        id="email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        disabled
                        value={member.Email}
                        required
                        onChange={(event) => {
                          // setEmail(event.target.value);
                        }}
                      />
                </Grid>
{/*==============================================(Gender)====================================================*/}
                <Grid xs={5} xl = {5} md={5}>
                  <p style={{ color: "grey", fontSize: 17 }}>Gender</p>
                <TextField
                  id="outlined-basic"
                  name="Gender"
                  variant="outlined"
                  disabled
                  fullWidth
                  required
                  value={member.Gender}
                  onChange={(event) => {
                    // setAddress(event.target.value);
                  }}
                />
               </Grid> 
               <Grid xs={1} md={1}>
               </Grid>
{/*=============================================(Status)=====================================================*/}
                <Grid xs={5} xl = {5} md={5}>
                  <p style={{ color: "grey", fontSize: 17 }}>Status</p>
                    <TextField
                      id="outlined-basic"
                      name="Status"
                      variant="outlined"
                      disabled
                      fullWidth
                      required
                      value={member.Status}
                      onChange={(event) => {
                        // setAddress(event.target.value);
                       }}
                    />
                  </Grid> 

{/*=============================================(Religion)=====================================================*/}
                <Grid xs={5} xl = {5} md={6}>
                  <p style={{ color: "grey", fontSize: 17 }}>Religion</p>
                    <TextField
                      id="outlined-basic"
                      name="Religion"
                      variant="outlined"
                      disabled
                      fullWidth
                      required
                      value={member.Religion}
                      onChange={(event) => {
                        // setAddress(event.target.value);
                       }}
                    />
                  </Grid>
                

                  </Grid>
                          <h1> </h1>   
                          <Stack direction="row" spacing={2}>
                            {/* ปุ่มเพิ่มข้อมูล */}
                            <Link
                              to="update-member"
                              style={{textDecoration: "none",}}
                              >
                              <Button variant="contained" color="info">
                                แก้ไขข้อมูล
                              </Button>
                            </Link>
                          
                  </Stack>
        
                          <h1> </h1>            
               
              
            
                </Paper>
          
                </form>
            
            </Container>
        
    );
}

export default ProfileMember;