import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import Header from "./Whack-a-mole components/Mole";
import Hammer from "./Whack-a-mole imgs/hammer (1).png";

function App() {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [style, setStyle] = useState(false);
  useEffect(() => {
    document.addEventListener("mousemove", onMouseUpdate);
    document.addEventListener("click", (event) => {
      setStyle(true);
      setTimeout(() => {
        setStyle(false);
      }, 75);
    });
    function onMouseUpdate(e) {
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });
    }
    return () => {
      document.removeEventListener("mousemove", onMouseUpdate);
    };
  }, [mousePosition]);

  return (
    <div
      onClick={() => {
        setStyle(true);
        console.log(style);
      }}
    >
      <img
        src={Hammer}
        style={{
          position: "absolute",
          width: "150px",
          height: "150px",
          marginTop: "-150px",
          marginRight: "-120px",
          zIndex: "4",
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          pointerEvents: "none",
          transform: `${style === true ? " rotate(-100deg)" : "rotate(0deg)"}`,
          transformOrigin: "bottom center",
          transition: "0.075s",
        }}
        alt=""
      />
      <Header />
    </div>
  );
}

export default App;