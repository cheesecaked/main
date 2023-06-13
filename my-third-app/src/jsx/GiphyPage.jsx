import React, { useState, useEffect   } from "react";
import "../App.css";
import axios from "axios";

export const GiphyPage = () => {
  const [gif, setGif] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const getData = () => {
    const fetchPosts = async () => {
      
      try {
        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=Z61pVXpe1BC0qUhWS4vhRlwqsCRRpbfX&q=${inputValue}&limit=25&offset=0&rating=g&lang=en`);
        setGif(res);
        console.log(res);
        setLoading(true)
        setErrorMessage("")
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
    };
    fetchPosts();
  }

  //   if (gif !== 0) {
  //     gif.map((item) => console.log(item.images.fixed_height.url));
  //   }
  useEffect(() => {
    const resInterceptor = (response) => {
      // console.log("giphy")
      // setErrorMessage("not working")
      setLoading(false);
      console.log(response, 'ress');
      return response.data.data
    }
    const interceptor = axios.interceptors.response.use(resInterceptor, () => {})
    return () => axios.interceptors.response.eject(interceptor)
  }, [])
  
  return (
    <div className="GiphyContainer">
      <input
        className="taskInput"
        type={"text"}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={(e) => {
          e.key === "Enter" && getData();
        }}
      />
      <button className="submitButton" onClick={getData}>
        submit
      </button>
      
      <div className="GiphyItems">

        {gif !== 0 &&
          gif.map((item, index) => {
            return (
              <div className="GiphyItems1">
                <img
                  className="GiphyItems2"
                  key={index}
                  src={item.images.fixed_height.url}
                  alt="giphy"
                />{" "}
                <hr />
              </div>
            );
          })}
      </div>
    </div>
  );
};
