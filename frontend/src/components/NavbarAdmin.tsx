import React, { useState, useEffect, Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AppBar, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import ProfileLogo from "../images/user.png";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import { Avatar } from "@mui/material";

import FoodIcon from "../images/FoodIcon2.png";
import NutIcon from "../images/FoodIcon.png";
import AppLogo from "../images/nutrition.png";
import CourseIcon from "../images/CourseIcon.png";

import "../App.css";
import "../index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Padding } from "@mui/icons-material";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Kanit",
      textTransform: "none",
      fontSize: 18,
    },
  },
});

function NavbarAdmin() {
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const menus = [{
    to: "food-display",
    label: "Food",
    icons: FoodIcon,
  }, {
    to: "course",
    label: "Course",
    icons: CourseIcon,
  }, {
    to: "nutrient-display",
    label: "Nutrient",
    icons: NutIcon,
  }];

  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Box sx={{ marginBottom: "7rem" }}>
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
            <Grid
              container
              spacing={0}
              sx={{
                marginLeft: "2%",
                marginRight: "2%",
                mx: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
            <div style={{ display: "flex", width: "100vw", justifyContent: "space-between"}}>
              <Grid item xs={1.2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    style={{ height: 40, justifyItems: "center" ,paddingLeft: "20px"}}
                    src={AppLogo}
                    alt="logo"
                  />
                  <Link
                    to="/admin"
                    style={{
                      color: "#000",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      component="div"
                      sx={{ flexGrow: 1, fontWeight: "bold", fontSize: 30 }}
                    >
                      Nutrition
                    </Typography>
                  </Link>
                </Box>
              </Grid>

              <Grid item xs={3}></Grid>

              {/* ถ้าจะเพิ่ม menu ก็ลดอัตราส่วนลง เช่น
                จาก
                <Grid item xs={6}></Grid>
                เป็น
                <Grid item xs={5}></Grid>
                <Grid item xs={1}>menu1</Grid> 
                */}
              {/* <Grid item xs={1} sx={{ ml: 4 }}> */}
              <div style={{ marginRight: 10 }}>
                {menus.map((item) => {
                  return (
                    <>
                      <Link
                        to={item.to}
                        style={{
                          color: "#000",
                          textDecoration: "none",
                          textAlign: "center",
                        }}
                      >
                        <Button color="inherit" style={{ fontSize: "1.2rem" }}>
                          {item.label}
                          {item.icons && <Avatar src={item.icons} />}
                        </Button>
                      </Link>
                    </>
                  );
                })}
                <IconButton onClick={Logout} style={{paddingRight: "20px"}}>
                  <LogoutIcon fontSize="large" />
                </IconButton>
              </div>
                {/* </Grid> */}
                {/* <Grid item xs={1}>
                    <Link
                      to="food-display"
                      style={{
                        color: "#000",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                    >
                      <Button color="inherit" style={{ fontSize: "1.2rem" }}>
                        Food
                        <Avatar src={FoodIcon} />
                      </Button>
                    </Link>
                  </Grid>
                <Grid item xs={1}>
                    <Link
                      to="course"
                      style={{
                        color: "#000",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                    >
                      <Button color="inherit" style={{ fontSize: "1.2rem" }}>
                        Course
                      </Button>
                    </Link>
                  </Grid> */}
                {/* =====================================< Body Record >==================================== */}
                {/* <Grid item xs={1}>
                    <Link
                      to="nutrient-display"
                      style={{
                        color: "#000",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                    >
                      <Button color="inherit" style={{ fontSize: "1.2rem" }}>
                        Nutrient
                        <Avatar src={NutIcon} />
                      </Button>
                    </Link>
                  </Grid>
                <Grid item xs={1} sx={{ ml: 4 }}>
                    <IconButton onClick={Logout}>
                      <LogoutIcon fontSize="large" />
                    </IconButton>
                  </Grid> */}
              </div>
            <Outlet />
          </Grid>
        </AppBar>
      </Box>
    </Fragment>
    </ThemeProvider >
  );
}

export default NavbarAdmin;
