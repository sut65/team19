import React, { useState, useEffect, Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { AppBar, Toolbar } from "@mui/material";

function Navbar() {
  return (
    <Fragment>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#f5f5f5",
          color: "#000000",
          mb: "2zrem"
        }}
      >
        <Toolbar
          sx={{
            margin: "0 8rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#000",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Nutrition
            </Typography>
          </Link>
          <Link
            to="article"
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
        </Toolbar>
      </AppBar>
      <Outlet />
    </Fragment>
  );
}

export default Navbar;
