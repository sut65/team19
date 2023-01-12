import React, { useState, useEffect, Fragment } from "react";
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#f5f5f5",
          color: "#000000",
        }}
      >
        <Toolbar sx={{ margin: "0 8rem" }}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Nutrition
          </Typography>
          <Button color="inherit" style={{ fontSize: "1.2rem" }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
