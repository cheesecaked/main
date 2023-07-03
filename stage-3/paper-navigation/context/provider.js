import React from 'react'
import { createContext } from 'react'
import { useState, useEffect } from 'react';

export const DataContext = createContext();


const DataProvider = (props) => {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        fetch(`https://dev.to/api/articles`)
            .then((res) => res.json())
            .then((data) => setArticles(data));
        console.log(articles)
    }, []);
    return (
        <DataContext.Provider value={{
            articles,
            setArticles
        }}>
            {props.children}    
        </DataContext.Provider>
    )
}

export default DataProvider