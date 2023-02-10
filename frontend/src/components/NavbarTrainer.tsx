import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';

import {GetTrainerByID} from "../services/HttpClientService"
import { TrainerInterface } from "../interfaces/ITrainer";

import trainerBG1 from "../images/trainerBG1.png";
import user from "../images/user.png";

//const pages = ['Advice'];
const settings = ['Profile', 'Logout'];

function NavTrainer() {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [trainer, setTrainer] = useState<TrainerInterface>({}); 

  const fetchTrainerID = async () => {
    let res = await GetTrainerByID();
    if (res) {
      setTrainer(res);
      console.log(res.data)
    }
  };

  useEffect(() => {
    fetchTrainerID()
   
  }, []); 


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (keyHandle:string) => {
    setAnchorElUser(null);
    console.log(keyHandle);
    if (keyHandle == "Profile"){
      window.location.href="trainer/profile";
    }else if (keyHandle == "Logout"){
      localStorage.clear();
      window.location.href = "/";
    }
  };

  

  return (
    <AppBar position="static" sx={{ bgcolor: "#B9BFFF", color: "#000000" }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          <Avatar alt="Remy Sharp" src={trainerBG1} sx={{ width: 50 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Kanit",
              fontWeight: 1000,
              fontSize: 25,
              letterSpacing: ".1rem",
              color: "#616161",
              textDecoration: "none",
            }}
          >
            TRAINER
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#616161",
              textDecoration: "none",
            }}
          >
            TRAINER
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          
              <Button
                // </Box>key={page}
                //onClick={handleCloseNavMenu}
                component={
                  RouterLink
                }
                to={"/trainer/advice-display"}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                ADVICE
              </Button>
            
          </Box>

          <Box sx={{ flexGrow: 0 ,display:"flex"}}>
          <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "Kanit",
                    fontWeight: 500,
                    fontSize: 20,
                    letterSpacing: ".1rem",
                    color: "#616161",
                    textDecoration: "none",
                  }}
                >
                {trainer.Name}
                </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               
                <Avatar alt="Remy Sharp" src={user} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu("")}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavTrainer;