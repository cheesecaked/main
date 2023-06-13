import React, { useEffect, useState } from "react";
import upperback from "../Whack-a-mole imgs/UpperBack.png";
import back from "../Whack-a-mole imgs/LowerBack.png";
import hun from "../Whack-a-mole imgs/rat.png";
import Hammer from "../Whack-a-mole imgs/hammer.png";

function Header({ active }) {
  const [click, setClick] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const [score, setScore] = useState(0);
  const [min, setMin] = useState(0);
  const [start, setStart] = useState(false);
  const [col, setCol] = useState(new Array(15).fill(false));
  const [on, setOn] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [valueX, setValueX] = useState();
  const [valueY, setValueY] = useState();
  const [mouseClick, setMouseClick] = useState(false);

  useEffect(() => {
    let inter = null;
    if (start) {
      inter = setInterval(() => {
        const translation = () => {
          let random = Math.floor(Math.random() * 15);
          col[random] = true;
          setTimeout(() => {
            col[random] = false;
          }, 2000);
        };
        if (click) translation();
      }, [200]);
    }
    return () => clearInterval(inter);
  }, [click, col, start]);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
      if (seconds >= 100) {
        setMin(min - 1);
        setSeconds(0);
      }
      if (seconds === 0) {
        setStart(false);
        alert(score + " score");
      }

      return () => clearInterval(interval);
    }
  }, [seconds, start]);

  return (
    <body
      style={{
        width: "100vw",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        color: "white"
      }}
    >
      {" "}
      <div
        className=""
        style={{
          display: "flex",
          gap: "100px",
          width: "100vw",
          justifyContent: "center",
        }}
      >
        <div className="">
          <pre style={{fontFamily: "Arial"}}>Time: {seconds}</pre>
        </div>
        <div className="">
          <pre style={{fontFamily: "Arial"}}>Score: `{score}</pre>
        </div>
      </div>
      <div className=""></div>
      <div
        className=""
        style={{
          display: "grid",
          justifyContent: "center",
          gridTemplateColumns: "Repeat(5,minmax(0 , 1fr))",
          gap: "20px",
        }}
      >
        {col.map((coloo, index) => {
          return (
            <div
              key={index}
              style={{
                display: "grid",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={upperback}
                style={{ width: "128px", height: "110px", zIndex: "1" }}
                alt=""
                draggable="false"
              />
              {start ? (
                <img
                  src={hun}
                  style={{
                    width: "50px",
                    height: "100px",
                    zIndex: "2",
                    marginTop: " -30px ",
                    marginLeft: " 40px",
                    transform: `translateY(${coloo ? "-75px" : "0px"})`,
                    transition: "all 1s",
                    pointerEvents: isDisabled ? "none" : "auto",
                  }}
                  draggable="false"
                  onClick={() => {
                    setScore((e) => e + 1);
                    setIsDisabled(true);
                    setTimeout(() => {
                      setIsDisabled(false);
                    }, 1000);
                  }}
                  alt=""
                />
              ) : (
                <img
                  src={hun}
                  style={{
                    width: "50px",
                    height: "100px",
                    zIndex: "2",
                    marginTop: " -30px ",
                    marginLeft: " 40px",
                    transform: `translateY(${coloo ? "-75px" : "0px"})`,
                    transition: "all 1s",
                  }}
                  alt=""
                  draggable="false"
                />
              )}

              <img
                src={back}
                style={{
                  width: "128px",
                  height: "110px",
                  zIndex: "3",
                  marginTop: " -90px",
                }}
                alt=""
                draggable="false"
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          setStart(true);
          setSeconds(30)
          setScore(0)
        }}
        style={{
          width: "150px",
          height: "50px",
          borderRadius: "50px",
          border: "none",
          color: "white",
          backgroundColor: "#00CEA9",
          fontSize: "20px"
        }}
      >
        START
      </button>
    </body>
  );
}
export default Header;