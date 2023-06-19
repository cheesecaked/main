import React, { useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../Context/Context';
import logoutIcon from "../img/sign-out-icon-17.png"
export default function Header({setHistoryClicked, historyClicked}) {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();



  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    })
    localStorage.removeItem("auth-token");
  };

  useEffect(() => {
    // const data = window.localStorage.getItem('auth-token');
    // if ( data !== null ) setUserData(JSON.parse(data));
    console.log(userData)
  }, []);
  console.log(userData)

  const path = window.location.pathname;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        fontSize: "20px",
        color: "#02B589",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "2%",
          width: "100%",
          paddingTop: "56px",
          paddingRight: "78px",
        }}
      >
        <p
          style={{
            padding: "0",
            margin: "0",
          }}
        >
          ХЭРХЭН АЖИЛЛАДАЖ ВЭ?
        </p>
        {userData.user ? (
          <>
            <p style={{
              margin: 0,
              cursor: "pointer",
            }}
            onClick={() => {
              setHistoryClicked(true)
              console.log(historyClicked)
            }}
            >{userData.user.email}</p><img style={{
              cursor: "pointer"
            }} width={50} height={50} src={logoutIcon} onClick={logout} />
          </>
        ) : (
          <Link
            style={{
              display: path === "/login" || path === "/signup" ? "none" : "block",
            }}
            to={"/login"}
          >
            <button
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                padding: "10px",
                color: "white",
                backgroundColor: "#02B589",
                borderRadius: "100px",
                border: "none",
                paddingLeft: "35px",
                paddingRight: "35px",
              }}
            >
              НЭВТРЭХ
            </button>
          </Link>
        )}

      </div>
    </div>
  );
}
