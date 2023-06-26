import React from 'react'
import { createContext } from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';

export const DataContext=createContext();

export const DataProvider = (props) => {
    const [posts,setPosts]=useState([]);
    const [deleteId, setDeleteId] = useState()
    useEffect(() => {
        axios
          .get("http://localhost:3001/posts")
          .then(async (res) => {
            // setTaskItems(res.data);
            setPosts(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    return (
        <DataContext.Provider value={{
           posts,
           setPosts,
           deleteId,
           setDeleteId
        }}>
            {props.children}
        </DataContext.Provider>
    )
}