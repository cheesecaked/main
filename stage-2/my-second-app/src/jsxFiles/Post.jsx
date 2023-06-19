import React, { useContext, useState } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { ColorModeContext } from "./ThemeContext";
import { Button } from '@mui/material';
import { Input } from '@mui/material'
import {TextField} from '@mui/material'
export const Post = (props) => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { theme } = useContext(ColorModeContext)
  const { post } = props
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", backgroundColor: theme.backgroundColor, color: theme.color, gap: "30px" }}>
      <Box sx={{marginTop: "60px"}}/>
      <Typography component={"div"} sx={{ display: "flex", flexDirection: "column", margin: "0" }} variant='h3'>
        {post.text}
      </Typography>
      <Box sx={{ display: "flex", width: "100%", gap: "20px" }}>
        <Button
          sx={{
            color: theme.color,
            backgroundColor: theme.backgroundColor,
          }}
          variant="outlined"
        >
          {post?.tags[1]}
        </Button>
        <Button
          sx={{
            color: theme.color,
            backgroundColor: theme.backgroundColor,
          }}
          variant="outlined"
        >
          {post?.tags[2]}{" "}
        </Button>
      </Box>
      <Box>
        <img src={post.image} alt="" />
      </Box>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%"
      }}>
        
        {list.map((toDo, index) => {
          return (
            <div className="box" key={index}>

              <p className="h">{toDo}</p>
              
            </div>
          );
        })}
      </div>
      <div className="bruh2" style={{
        width: "100%", display: "flex", flexDirection: "column", gap: "10px"
      }}><input sx={{
        
        width: "100%",
        border: "none"
      }}
      className="taskInput"
        type={"text"}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      <Button variant='outlined'
        sx={{width:"100%", color: theme.color}}
        onClick={() => {
          if (inputValue === "") {
            alert("input is gay");
          } else { 
            setList([...list, inputValue])
            
          };
        }}
      >
        Comment
      </Button></div>
    </Box>
  )
}
