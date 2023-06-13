import * as React from "react";
import {Header} from "./Header";
import Cards from "./Card";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { ColorModeContext } from "./ThemeContext";
import { Footer } from "./Footer";
import { Button } from "@mui/material";
export const Home = () => {
  const [posts, setPost] = React.useState();
  const instance = axios.create({
    baseURL: "https://dummyapi.io/data/v1/post",
    headers: { "app-id": "636e0d6642c1f665f684f489" },
  });
  const giphy = axios.create({
    baseURL:"https://api.giphy.com/v1/gifs/search?api_key=Z61pVXpe1BC0qUhWS4vhRlwqsCRRpbfX&q=spiderman&limit=25&offset=0&rating=g&lang=en"
  })
  const { theme, changeTheme, isDark } = React.useContext(ColorModeContext);
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await giphy.get("/");
        setPost(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error.message);
      }

    };
    fetchPosts();
  }, []);

  return (
    <div style={{ backgroundColor: theme.backgroundColor, padding: 0, display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Header/>
      <Box sx={{ marginBottom: "60px" }}></Box>
      
      <Container sx={{display: "flex", flexDirection: "column", alignItems: "center"}} maxWidth="xl">
        <Grid container display={"flex"} flexDirection={"column"} spacing={3}>
          <Grid item xs={12} md={6} lg={3} color={theme.color}>
            <h1>Blog posts</h1>
          </Grid>
          <Grid item xs={1} md={6} lg={3} color={theme.color}>
          <p> Our latest updates and blogs about managing your team </p>
        </Grid>
        </Grid>
       
        <Grid container spacing={4}>
          {posts?.map((data, ind) => {
            return (
              <Grid item xs={12} md={6} lg={3}>
                <Cards num={ind} post={data} />
              </Grid>
            );
          })}
        </Grid>
        <Button sx={{marginTop: "50px", width: "120px"}} variant="contained">Next</Button>
      </Container>
      <Box sx={{ marginBottom: "120px" }}></Box>
      <Footer/>
    </div>
  );
}
