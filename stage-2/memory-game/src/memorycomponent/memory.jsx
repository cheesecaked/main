import React, { Component, useEffect, useState } from "react";
import { data } from "./data";

const GameOver = ({ totalPoint, totalMin }) => {
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div
      style={{
        position: "absolute",
        zIndex: "9",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "300px",
          backgroundColor: "blue",
          justifyContent: "center",
          alignContent: "center",
          display: `(${totalMin == 0 ? "flex" : "none"})`,
        }}
      >
        <div
          className=""
          style={{
            height: "100% ",
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "20px" }}>Good❤️😊</p>
          <p style={{ fontSize: "20px" }}>your score:{totalPoint}</p>
          <b>daraagin udaa ilu xicegerei amjilt ~_~</b>
          <button
            style={{ height: "50px", fontSize: "20px" }}
            onClick={refreshPage}
          >
            play again
          </button>
        </div>
      </div>
    </div>
  );
};

const Card = ({ dataa, min, check, flipCard }) => {
  if (dataa == null) {
    return (
      <div
        style={{
          width: "200px",
          height: "200px",
        }}
      />
    );
  }

  return (
    <div
      onClick={() => {
        flipCard();
      }}
      style={{
        width: "200px",
        height: "200px",
        position: "relative",
        display: `${min == 0 ? "none" : "flex"}`,
        transform: `rotateY(${dataa.pick ? "180deg" : "0deg"})`,
        transformStyle: "preserve-3d",
        transition: "transform 0.6s",
      }}
    >
      <div
        style={{
          position: "absolute",
          background: "transparent",
          border: "3px solid orange",
          borderRadius: "3%",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          pointerEvents: `${!check ? "none " : "auto"}`,
        }}
      ></div>
      <img
        src={dataa.image}
        style={{
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          pointerEvents: `${!check ? "none " : "auto"}`,
        }}
      />
      <p>{dataa.id}</p>
    </div>
  );
};

function Game() {
  const [seconds, setSeconds] = useState(0);
  const [min, setMin] = useState(20);
  const [ID, setID] = useState(null);
  const [count, setCount] = useState(0);
  const [images, setImages] = useState([]);
  const [touch, setTouch] = useState(false);
  const [click, setClick] = useState(false);
  const [score, setScore] = useState(0);
  const [check, setCheck] = useState(false);
  const generate = () => {
    setImages(
      data.sort(function () {
        return Math.random() - 0.5;
      })
    );
  };
  const flip = (index) => {
    setImages(
      images.map((image, i) =>
        i == index ? { ...image, pick: !image.pick } : image
      )
    );
  };
  const checkId = (index) => {
    flip(index);
    if (ID == null) {
      console.log("first");
      setID(index);
      return;
    }
    console.log("second");

    if (index !== ID && images[index].id === images[ID].id) {
      setTimeout(() => {
        setImages(
          images.map((image, ind) =>
            image
              ? ind == index || ind === ID
                ? null
                : { ...image, pick: false }
              : null
          )
        );
        setID(null);
        // flipBack();
      }, 1000);
      setScore((e) => e + 1);
    } else {
      setTimeout(() => {
        flipBack();
      }, 400);
      setID(null);
    }
  };

  const flipBack = () => {
    setImages(
      images.map((el) => {
        if (el) {
          el.pick = false;
          return el;
        } else {
          return null;
        }
      })
    );
  };

  useEffect(() => {
    generate();
  }, []);
  useEffect(() => {
    if (click) {
      const interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 10);
      if (seconds >= 100) {
        setMin(min - 1);
        setSeconds(0);
      }
      if (min == 0) {
        setMin(0);
      }

      return () => clearInterval(interval);
    }
  }, [seconds, click]);
  return (
    <body
      style={{
        width: "100vw",
        height: "100vh",
        padding: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "30px",
        backgroundImage: `url("https://wallpaper.dog/large/10720023.jpg")`,
      }}
    >
      {(min === 0 || score == 6) && (
        <GameOver totalPoint={score} totalMin={min} />
      )}
      <div
        style={{
          display: `${min === 0 ? "none" : "flex"}`,

          flexDirection: "column",
          gap: "50px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: `${min === 0 || score == 6 ? "none" : "flex"}`,
            justifyContent: "center",
            gap: "150px",
            position: "absolute",
            zIndex: "1",
            marginTop: "-130px",
          }}
        >
          <p
            style={{
              fontSize: "35px",
              fontStyle: "italic",
              color: "orange",
            }}
          >
            Time:{min}
          </p>
          <p
            style={{
              fontSize: "35px",
              fontStyle: "italic",
              color: "orange",
            }}
          >
            Score:{score}
          </p>
        </div>
        <div
          className=""
          style={{
            display: "grid",
            justifyContent: "center",
            gridTemplateColumns: "Repeat(4 ,minmax(0 , 1fr))",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          {images?.map((dataa, index) => {
            return (
              <Card
                key={index}
                dataa={dataa}
                min={min}
                check={check}
                flipCard={() => {
                  checkId(index);
                }}
              />
            );
          })}
        </div>
      </div>
      <button
        sx={{
          display: `${min === 0 || score == 6 ? "none" : "flex"}`,
          backgroundColor: "warning ",
          border: "1px solid gray",
          width: "120px",
        }}
        onClick={() => {
          setClick(true);
          setCheck(true);
          console.log(check);
        }}
      >
        Start
      </button>
    </body>
  );
}
export default Game;
