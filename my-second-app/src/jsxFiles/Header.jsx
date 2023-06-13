import AppBar from "@mui/material/AppBar";
import "../body.css"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import { ColorModeContext } from "./ThemeContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Group 22.png";
export const Header = ({ child }) => {
  const { theme, changeTheme, isDark } = useContext(ColorModeContext);

  return (
    <AppBar
      sx={{
        position: "fixed",
        backgroundColor: theme.backgroundColor,
        boxShadow: 0,
        padding: "10px"
      }}
    >
      <Container maxWidth="xl" sx={{ backgroundColor: theme.backgroundColor }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontStyle: "Mulish",
          }}
        ><Link to={"/"}>
          <Button fontSize={"27px"} sx={{filter: theme.filter}}>
            <img src={Logo} alt=""></img>
          </Button>
          </Link>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
              color: "#6D7D8B",
            }}
          >
            <Switch checked={isDark} onChange={() => changeTheme()} />
            <Typography>
              <u>Products</u>
            </Typography>
            <Typography>
              {" "}
              <u>Services</u>
            </Typography>
            <Typography>
              {" "}
              <u>Contact</u>
            </Typography>
            <Typography>
              {" "}
              <u>Log In</u>
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{padding: 2, border: "2px solid #4DA0FD" }}
            >
              <Typography>Get Access </Typography>
            </Button>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}