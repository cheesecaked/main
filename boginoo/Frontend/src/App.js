import "./App.css";
import axios from "axios";
import Home from "./components/Home-default";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import UserContext from "./Context/Context";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthContext, AuthProvider } from "./Context/AuthProvider";
function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [historyClicked, setHistoryClicked] = useState(false);
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.get(
        "http://localhost:7070/users/tokenIsValid",
        { headers: { "x-auth-token": token } }
        
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("http://localhost:7070/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkLoggedIn();
    console.log(userData);
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header
            historyClicked={historyClicked}
            setHistoryClicked={setHistoryClicked}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  historyClicked={historyClicked}
                  setHistoryClicked={setHistoryClicked}
                />
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
