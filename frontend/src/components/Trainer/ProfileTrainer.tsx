import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";

import { Box } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { deepOrange, deepPurple } from "@mui/material/colors";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import environmentIcon from "../../images/environmentIcon.png"
import profile2 from "../../images/profile2.jpg"
import NutBG from "../../images/NutBG.jpg"

import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';


import {GetTrainerByID} from "../../services/HttpClientService"
import { TrainerInterface } from "../../interfaces/ITrainer";
import IdentityDisplay from "./profileSetting/IdentityDisplay";
import  EditSettings  from "./profileSetting/EditSetting";
import { colors } from "@mui/joy";

import {DeleteTrainer} from "../../services/HttpClientService"
import { Console } from "console";


const handleClickDelete = async (id : string) => {
  let res = await DeleteTrainer(id);
  if (res) {
    window.location.reload();
    localStorage.clear();
    window.location.href = "/trainer";
  }
}


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function ProfileTrainer() {

  
  const [tab, setTab] = React.useState("profile");
  const [value, setValue] = React.useState(0);
  const [trainer, setTrainer] = useState<TrainerInterface>({}); 
  const [date_in, setDateIn] = useState<string>(""); 

  // For Alert confirmation Delete Account

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

// ----------------
  
  
  const fetchTrainerID = async () => {
    let res = await GetTrainerByID();
    if (res) {
      setTrainer(res);
      setDateIn(res.CreatedAt.slice(0,19));
      console.log(res.data)
    }
  };


  useEffect(() => {
    fetchTrainerID()
   
  }, []);


  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // console.log(display);

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
        color: "#f5f5f5",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url(${NutBG})`,
      }}
    >
      <Container maxWidth="lg" sx={{ marginBottom: 12 }}>
        <Paper
          elevation={4}
          sx={{
            marginBottom: 2,
            marginTop: 10,
            display: "block",
            justifyContent: "center",
            alignContent: "end",
            borderRadius: "25px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#B9BFFF",
              marginBottom: 0,
              display: "block",
              width: "100%",
              height: 50,
              borderRadius: "25px  25px 0px 0px",
              // textAlign:"center",
              paddingTop: 2,
            }}
          >
            {/* <Avatar src={environmentIcon} /> */}
            <b style={{ color: "white", marginLeft: 20, fontSize: 20 }}>
              Trainer
            </b>
          </Box>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            spacing={0}
            alignItems="stretch"
          >
            <Grid xs={6} md={5}>
              <Paper
                elevation={6}
                sx={{
                  display: "inline grid",
                  padding: 3,
                  margin: 0,
                  justifyContent: "flex-start",
                  borderRadius: "0px  0px 0px 25px",
                  // boxShadow:"box-shadow: 5px 7px 3px 7px;"
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#f48fb1",
                    width: 200,
                    height: 200,
                    marginLeft: 14,
                    fontSize: 40,
                  }}
                >
                  TN
                  <Avatar src={environmentIcon} sx={{ width: 50, hight: 50 }} />
                  {/* <Avatar src={Body} sx ={{width:100,hight:10}}/> */}
                </Avatar>

                <h2
                  style={{
                    color: "#6b7176",
                    marginBottom: 40,
                    textAlign: "center",
                  }}
                >
                  {trainer?.Name}
                </h2>

                {/*==============================================(Primary)====================================================*/}
                <Paper elevation={0} sx={{ padding: 0 }}>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemText
                        primary="Date of Attnedance"
                        secondary={date_in}
                      />
                    </ListItem>
                    <Divider component="li" />

                    <ListItem>
                      <ListItemText primary="Sport" secondary={"เกรดเฉลี่ยสะสม "+trainer.Gpax} />
                    </ListItem>
                    <Divider component="li" variant="inset" />
                  </List>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <WorkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Work" secondary="Jan 7, 2014" />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Vacation"
                        secondary="July 20, 2014"
                      />
                    </ListItem>
                  </List>
                </Paper>
                {/* ================================================( delete )============================================================= */}
                {/* <Chip
                  label="DELETE ACCOUNT"
                  size="medium"
                  onClick={() => handleClickDelete(trainer.ID + "")}
                  deleteIcon={<DeleteIcon />}
                  variant="outlined"
                  sx={{ marginTop: 2, marginLeft: 35 }}
                /> */}

                {/* ================================================<< Alert confirmation delete >>=============================== */}
                <div  style = {{marginTop: 3, display:"flex",justifyContent:"end"}}> 
                  <Button variant="outlined"  onClick={handleClickOpen} sx ={{display:"flex",justifyContent:"space-between"}}>
                    Delete Account 
                    {<DeleteIcon />}
                  </Button>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Are you sure?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                      If you delete the account, the data cannot be restored and the account will be permanently deleted.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={() => handleClickDelete(trainer.ID + "")}>
                        accept
                      </Button>
                      <Button onClick={handleClose} autoFocus>
                        cancle
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Paper>
            </Grid>
            {/* ====================================( page2 )=========================== */}
            <Grid xs={6} md={7} sx={{ paddingLeft: 4 }}>
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={tab}
                  onChange={handleChangeTab}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="basic tabs example"
                >
                  <Tab label="Profile" {...a11yProps(0)} />
                  <Tab label="Edit" {...a11yProps(1)} />
                  {/* <Tab  label="" {...a11yProps(2)}/> */}
                  <Button sx={{ position: "absolute", marginLeft: 73 }}>
                    <ArrowBackIcon
                      onClick={() => {
                        window.location.href = "/trainer";
                      }}
                      fontSize="large"
                    ></ArrowBackIcon>
                  </Button>
                </Tabs>

                <TabPanel value={value} index={0}>
                  <IdentityDisplay />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <EditSettings />
                </TabPanel>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default ProfileTrainer;
