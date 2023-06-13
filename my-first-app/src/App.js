import React from "react";
import { LayOut } from "./pages/Layout";
import { Header } from "./pages/Header"
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<LayOut />} />
        <Route path="/Products" element={""}/>
        <Route path="/Services"/>
        <Route path="/Contact"/>
        <Route path="/Log_In"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
