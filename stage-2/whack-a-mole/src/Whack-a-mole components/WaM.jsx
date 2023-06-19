import React, { useEffect, useState } from "react";
import upperback from "../Whack-a-mole imgs/UpperBack.png";
import back from "../Whack-a-mole imgs/LowerBack.png";
import hun from "../Whack-a-mole imgs/rat.png";

function WaM({ active }) {
  const [click, setClick] = useState(true);
  const [move, setMove] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const [score, setScore] = useState(0);
  const [min, setMin] = useState(0);
  const [start, setStart] = useState(false);
  const [col, setCol] = useState(new Array(15).fill(false));
  const translation = () => {
    let set = Math.floor(Math.random() * 15);
    col[set] = true;
    console.log(set, col[set]);

    setTimeout(() => {
      col[set] = false;
      console.log(set, col[set]);
    }, 1000);
  };
  useEffect(() => {
    let inter = null;
    inter = setInterval(() => {
      translation();
    }, [2000]);
    return () => clearInterval(inter);
  }, [click]);
  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
      if (seconds <= 0) {
        clearInterval(interval)
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
      }}
    >
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
          <p>time:{seconds}</p>
        </div>
        <div className="">
          <p>Score:{score}</p>
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
              className=""
              style={{
                display: "grid",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={upperback}
                style={{ width: "128px", height: "128px", zIndex: "1" }}
                alt=""
              />
              <img
                src={hun}
                style={{
                  width: "64px",
                  height: "128px",
                  zIndex: "2",
                  marginTop: " -30px ",
                  marginLeft: " 30px",
                  transform: `translateY(${coloo ? "-80px" : "0px"})`,
                  transition: "all 1s",
                }}
                onClick={() => {
                  setScore((e) => e + 1);
                }}
                alt=""
              />
              <img
                src={back}
                style={{
                  width: "128px",
                  height: "124px",
                  zIndex: "3",
                  marginTop: " -115px",
                }}
                alt=""
              />
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          setStart(true);
        }}
      >
        Start
      </button>
    </body>
  );
}
export default WaM;