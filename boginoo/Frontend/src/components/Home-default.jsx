import React, { useEffect } from "react";
import Logo from "../img/logo-default.png";
import axios from "axios"
import { useState } from "react";
import { useContext } from "react";
import UserContext from "../Context/Context"
import { AuthContext } from "../Context/AuthProvider";
export default function Home({ setHistoryClicked, historyClicked }) {
  const [clicked, setClicked] = useState(false);
  const [history, setHistory] = useState([])
  const { setUserData, userData } = useContext(UserContext);
  const [inputValue, setInputValue] = useState("")
  const [dataa, setDataa] = useState([])
  const [value, setValue] = useState("")
  const [shortLink, setShortLink] = useState("");
  const { token } = useContext(AuthContext)



  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:7070/links");
      setDataa(data);
    } catch (error) {
      console.log(error);
    }
  };
  const populate = async () => {
    const historyData =  await axios.get(`http://localhost:7070/users/${userData.user.id}`)
    console.log(historyData)
    setHistory(historyData.data.history)
  }
  useEffect(() => {
    fetchData();
    populate();
    console.log(token)
    console.log(userData)
    console.log(history)
  }, []);

  const createPost = async () => {
    const result = await axios
      .post("http://localhost:7070/links", {
        orignalLink: inputValue,
      }).then((res) => {
        console.log(res.data)
        setShortLink(res.data.shortLink)
        axios.put(`http://localhost:7070/users/${userData.user.id}`, { id: res.data._id }).then((res) => {
          console.log(res)
          axios.get(`http://localhost:7070/users/${res.data._id}`).then((res) => {
            console.log(res.data)
          }).catch((error) => {
            console.log(error)
          })
        }).catch((err) => {
          console.log(err)
        });
      })
    console.log(userData)

  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10%",
          marginBottom: "5%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img width={181} height={118} src={Logo} alt="" />
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "1%",
          }}
        >
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            style={{
              height: "44px",
              width: "531px",
              borderRadius: "100px",
              paddingLeft: "50px",
              fontSize: "20px",
              border: "none",
              outline: "none",
              boxShadow: "0px 0px 15px -10px",
            }}
            placeholder="https://www.web-huudas.mn"
            type="text"
          />
          <button
            onClick={() => {
              createPost();
              setClicked(true)
              setHistoryClicked(false)
              console.log(historyClicked)
              console.log(history)
              setValue(inputValue)
            }}
            style={{
              height: "100%",
              borderRadius: "100px",
              paddingRight: "35px",
              paddingLeft: "35px",
              color: "white",
              backgroundColor: "#02B589",
              fontSize: "20px",
              border: "none",
            }}
          >
            БОГИНОСГОХ
          </button>
        </div>
        <div
          style={{
            display: clicked && !historyClicked ? "flex" : "none",
            flexDirection: "column",
            marginLeft: "32%",
          }}
        >

          <div>
            <p
              style={{
                opacity: "30%",
              }}
            >
              Өгөгдсөн холбоос:
            </p>
            <p>{value}</p>
          </div>
          <div>
            <p
              style={{
                opacity: "30%",
              }}
            >
              Богино холбоос:
            </p>
            <a href={value}>
              short.ly/{shortLink}
            </a>
          </div>
        </div>
        <div style={{
          display: historyClicked ? "flex" : "none",
          border: "1px solid",
          flexDirection: "column",
          overflow: "scroll",
          width: "40%",
          fontSize: "20px"

        }}>
          <h2 style={{
            color: "#02B589"
          }}>Түүх</h2>
          
          {history && history.map((el, index) => {
            return (<>
              <div key={index} style={{
                display: "flex",
                justifyContent: "space-between"
              }}>
                <div>
                  <p>Өгөгдсөн холбоос:</p>
                  
                  {el.orignalLink}
                </div>
                <div>
                  <p>Богино холбоос:</p>
                  <a href={el.orignalLink}>
                  {el.shortLink} 
                  </a>
                </div>
              </div>

            </>)
          })}
        </div>
      </div>
    </div>
  );
}
