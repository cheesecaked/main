import React from 'react'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import Logo from "../assets/Group 22.png";
import { Button} from '@mui/material';
import { AppBar } from '@mui/material'
import {Toolbar} from '@mui/material'
export const Footer =() => {
  return (
    <AppBar
    sx={{
      
        color: "white",
      fontFamily: "sans-serif",
      position: "static",
      boxShadow: "none",
      backgroundColor: "#252B3B",
      p: 1
    }}
  >
    <Toolbar
      sx={{
        ml: "20%",
        display: "flex",
        justifyContent: "flex-start",
        gap: "15%"
      }}
    >
      <Box>
        <Typography
          sx={{
            height: "100%",
          }}
        >
          <img src={Logo} alt=""></img>
          <Typography
          variant="h6"
          sx={{ textDecorationLine: "underline", cursor: "pointer" }}
          color="inherit"
          component="div"
        >
          Photos
        </Typography>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10%",
          width: "100%"
        }}
      >
        
        <Typography
          variant="h6"
          sx={{ textDecorationLine: "underline", cursor: "pointer" }}
          color="inherit"
          component="div"
        >
          Photos
        </Typography>
        <Typography
          variant="h6"
          sx={{ textDecorationLine: "underline", cursor: "pointer" }}
          color="inherit"
          component="div"
        >
          Photos
        </Typography>
        <Typography
          variant="h6"
          sx={{ textDecorationLine: "underline", cursor: "pointer" }}
          color="inherit"
          component="div"
        >
          Photos
        </Typography>
        <Button
          sx={{
            p: 2,
            textDecoration: "none",
          }}
          variant="contained"
        >
          Get Access
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
  )
}
