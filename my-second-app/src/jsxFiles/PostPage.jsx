import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Home } from "./Home";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cards from "./Card";
import { ColorModeContext } from "./ThemeContext";
import { Card } from "@mui/material";
import { Post } from "./Post";
import { useState } from "react";
export const PostPage = (props) => {

  const [posts, setPost] = React.useState();
  const { id } = useParams()
  const { post } = props
  const { theme, changeTheme, isDark } = React.useContext(ColorModeContext);
  const instance = axios.create({
    baseURL: "https://dummyapi.io/data/v1/post",
    headers: { "app-id": "636e0d6642c1f665f684f489" },
  });
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await instance.get("/");
        setPost(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log(error.message);
      }

    };
    fetchPosts();
  }, []);
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.backgroundColor,
      gap: "100px"
    }}>
      <Header />

      {posts?.map((val, ind) => {
        console.log(val.id);
        if (id === val.id) {
          return (
            <>
              <Post post={val} />
            </>
          );
        }
      })}
      <Footer />
    </div>
  )
};
