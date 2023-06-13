import React, { useState, useContext } from "react";
import Logo from "../img/logo-default.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import UserContext from "../Context/Context"
import { AuthContext } from "../Context/AuthProvider";
export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData, userData } = useContext(UserContext);
  const {setToken} = useContext(AuthContext)
  const navigate = useNavigate()
  const Login = async () => {
    try {
      const loginUser = { email, password };
      const loginResponse = await axios.post("http://localhost:7070/users/login", loginUser)
        const getHistory = await axios.get(`http://localhost:7070/users/${loginResponse.data.user.id}`)
      setUserData(
        {
          token: loginResponse.data.token,
          user: loginResponse.data.user
        }
      )
      localStorage.setItem("auth-token", loginResponse.data.token);
      console.log(loginResponse)
      navigate("/");
    } catch (error) {
      toast("invalid information")
      error.response.data.msg && setError(error.response.data.msg)
    }

  }
  return (
    <>
      <ToastContainer />
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "10%",
          }}
        >
          <div
            style={{
              witdh: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <img width={181} height={118} src={Logo} alt="" />
            <p
              style={{
                fontSize: "32px",
                color: "#02B589",
                fontWeight: "bold",
              }}
            >
              Нэвтрэх
            </p>
          </div>
          <div>
            <p
              style={{
                marginLeft: "15px",
              }}
            >
              Цахим хаяг
            </p>
            <input
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              style={{
                height: "44px",
                width: "351px",
                borderRadius: "100px",
                paddingLeft: "30px",
                fontSize: "20px",
                border: "none",
                outline: "none",
                boxShadow: "0px 0px 15px -10px",
              }}
              placeholder="name@mail.domain"
              type="text"
            />
          </div>
          <div>
            <p
              style={{
                marginLeft: "15px",
              }}
            >
              Нууц үг
            </p>
            <input
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              style={{
                height: "44px",
                width: "351px",
                borderRadius: "100px",
                paddingLeft: "30px",
                fontSize: "20px",
                border: "none",
                outline: "none",
                boxShadow: "0px 0px 15px -10px",
              }}
              placeholder="••••••••••"
              type="text"
            />
          </div>
          <div
            style={{
              width: "100%",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#02B589",
              }}
            >
              <input
                label="Намайг сана"
                className="checkbox"
                style={{
                  height: "20px",
                  width: "20px",
                }}
                type="checkbox"
              />
              <p>Намайг сана</p>
            </div>
            <a
              style={{
                color: "black",
              }}
              href="none"
            >
              Нууц үгээ мартсан
            </a>
          </div>
          <button
            style={{
              height: "44px",
              fontWeight: "bold",
              fontSize: "20px",
              padding: "10px",
              color: "white",
              backgroundColor: "#02B589",
              borderRadius: "100px",
              border: "none",
              paddingLeft: "145px",
              paddingRight: "145px",
            }}
            onClick={() => {
              Login();
              console.log(Login())
            }}
          >
            НЭВТРЭХ
          </button>
          <a
            style={{
              color: "#02B589",
              padding: "15px",
              fontSize: "16px",
            }}
            href="signup"
          >
            Шинэ хэрэглэгч бол энд дарна уу?
          </a>
        </div>
      </div>
    </>
  );
}