import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import Logo from "../assets/Group 22.png";
import { Button } from "@mui/material";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { ColorModeContext } from "./ThemeContext";
export const Footer = () => {
  const navigate = useNavigate()
  const { theme } = React.useContext(ColorModeContext);
  return (
    <AppBar
      sx={{
        fontFamily: "sans-serif",
        position: "static",
        boxShadow: "none",
        backgroundColor: theme.backgroundColor2,
        border: "1px solid black",
        p: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "15%",
        }}
      >
        <Box sx={{ mb: "30px", color: theme.color }}>
          <Typography
            sx={{
              height: "100%",
            }}
          >
            <Button onClick={() => {
              navigate(`/`, {});
            }} sx={{ filter: theme.filter }}>
              <img src={Logo} alt=""></img>
            </Button>

            <Typography
              sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
              color="inherit"
              component="div"
            >
              Instagram
            </Typography>
            <Typography
              sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
              color="inherit"
              component="div"
            >
              Facebook
            </Typography>
            <Typography
              sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
              color="inherit"
              component="div"
            >
              Twitter
            </Typography>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "7.5%",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "100",
              gap: "15px",
              color: theme.color,
            }}
            color="inherit"
            component="div"
          >
            <Typography
              sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
              color="inherit"
              component="div"
            >
              Use Cases
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10%",
              }}
            >
              <Typography
                sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
                color="inherit"
                component="div"
              >
                UI Design
              </Typography>
              <Typography
                sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
                color="inherit"
                component="div"
              >
                UX Design
              </Typography>
              <Typography
                sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
                color="inherit"
                component="div"
              >
                Prototyping
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "100",
              gap: "15px",
              color: theme.color,
            }}
            color="inherit"
            component="div"
          >
            <Typography
              sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
              color="inherit"
              component="div"
            >
              Explore
            </Typography>
            <Box>
              <Typography
                sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
                color="inherit"
                component="div"
              >
                Figma
              </Typography>
              <Typography
                sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
                color="inherit"
                component="div"
              >
                Customers
              </Typography>
              <Typography
                sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
                color="inherit"
                component="div"
              >
                Why I Love Figma
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              fontSize: "20px",
              fontWeight: "100",
              gap: "15px",
              color: theme.color,
            }}
            color="inherit"
            component="div"
          >
            <Typography
              sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
              color="inherit"
              component="div"
            >
              Resources
            </Typography>
            <Box>
              <Typography
                sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
                color="inherit"
                component="div"
              >
                Community Resources Hub
              </Typography>
              <Typography
                sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
                color="inherit"
                component="div"
              >
                Support
              </Typography>
              <Typography
                sx={{ cursor: "pointer", fontSize: "20px", fontWeight: "100" }}
                color="inherit"
                component="div"
              >
                Education
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",

              gap: "20px",
              height: "143px",
            }}
          >
            <Typography sx={{ color: theme.color, }} fontSize={"20px"} fontWeight={"400"}>
              Subscribe to our newsletter
            </Typography>
            <Button
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
                color: "#4DA0FD",
                borderRadius: "0px",
                border: "hidden",
                backgroundColor: "white",
                textDecoration: "none",
                p: 2
              }}
              fontFamily="Mulish"
              variant="outlined"

            >
              Email
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
