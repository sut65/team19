import React, { useState, useEffect, Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AppBar, Grid } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import ProfileLogo from '../images/user.png';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import PaymentRoundedIcon from '@mui/icons-material/PaymentRounded';
import { Avatar } from '@mui/material';

import Healthy from "../images/Health.png"
import AppLogo from "../images/nutrition.png"


import '../App.css';
import '../index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { MemberInterface } from "../interfaces/IMember";

const apiUrl = `http://localhost:8080`;

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Kanit',
      textTransform: 'none',
      fontSize: 18,
    },
  },
});

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const UFirstName = localStorage.getItem("firstname") + ""
  const ULastName = localStorage.getItem("lastname") + ""
  const UserName = UFirstName + " " + ULastName

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Box sx={{marginBottom: ""}}>
          <AppBar
            position="static"
            sx={{
              bgcolor: "#f5f5f5",
              color: "#000000",
              paddingTop: 2,
              paddingBottom: 0.5,
              padding: "0.5rem"
            }}
          >
            <Grid container spacing={0} 
              sx={{
                marginLeft: "2%",
                marginRight: "2%",
                mx: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={1.2}>
                <Link
                  to="/user"
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    textAlign: "center",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-between",
                  }}
                >
                  <img style={{height: 40, justifyItems: 'center' }} src={AppLogo} alt="logo" />
                  <Typography component="div" sx={{ flexGrow: 1 , fontWeight: "bold", fontSize: 30 }}>
                    Nutrition
                  </Typography>
                </Link>
              </Grid>

              <Grid item xs={6}></Grid>

              {/* ถ้าจะเพิ่ม menu ก็ลดอัตราส่วนลง เช่น
              จาก
              <Grid item xs={6}></Grid>
              เป็น
              <Grid item xs={5}></Grid>
              <Grid item xs={1}>menu1</Grid> 
              */}
              <Grid item xs={1}>
                <Link
                  to="articles"
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  <Button color="inherit" style={{ fontSize: "1.2rem" }}>
                    Blog
                  </Button>
                </Link>
              </Grid>
              {/* =====================================< Body >==================================== */}
              <Grid item xs={1}>
                <Link
                  to="body-display"
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  <Button color="inherit" style={{ fontSize: "1.2rem" }}>
                    Body
                    <Avatar src={Healthy} />

                  </Button>
                </Link>
              </Grid>
              {/* ===================================<  >================================ */}
              <Grid item xs={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      <img style={{height: 32, justifyItems: 'center'}} src={ProfileLogo} alt="logo" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem>
                      <img style={{height: 40, justifyItems: 'center', marginLeft: -10, marginRight: 6}} src={ProfileLogo} alt="logo" />
                      {UserName}
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <FastfoodRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      Eating behavior (before training)
                    </MenuItem>
                    <Link
                      to={`payment-history`} // รอแก้เป็นรีวิว
                      style={{
                        textDecoration: "none",
                        color: "black"
                      }}
                    >
                      <MenuItem>
                        <ListItemIcon>
                          <PaymentRoundedIcon fontSize="small" />
                        </ListItemIcon>
                      Payment History
                      </MenuItem>
                    </Link>
                    <MenuItem onClick={signout}>
                      <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                  <Box>{UserName}</Box>
                </Box>
              </Grid>
            </Grid>
          </AppBar>
        </Box>
        <Outlet />
      </Fragment>
    </ThemeProvider>
  );
}

export default Navbar;
