import { useEffect, useState } from "react";
import useInterval from "use-interval";
import DropDown from "./component/dropdown";
const zoom = 20;
const areaWidth = 40;
const areaHeight = 40;
const Home = () => {
  const [body, setBody] = useState([
    { down: 3, right: 5 },
    { down: 3, right: 4 },
    { down: 3, right: 3 },
  ]);
  const [apple, setApple] = useState({
    left: 5,
    top: 5,
  });
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectCity, setSelectCity] = useState("");

  const cities = () => {
    return ["Hard", "Medium", "Easy"];
  };
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };
  const citySelection = (city: string): void => {
    setSelectCity(city);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log(window.innerWidth);
    }

    window.addEventListener("keydown", (e) => {
      setDirection((prevDirection) => {
        switch (e.code) {
          case "ArrowRight":
            if (prevDirection !== "left") {
              return "right";
            }
            break;
          case "ArrowLeft":
            if (prevDirection !== "right") {
              return "left";
            }
            break;
          case "ArrowUp":
            if (prevDirection !== "down") {
              return "up";
            }
            break;
          case "ArrowDown":
            if (prevDirection !== "up") {
              return "down";
            }
            break;
        }
        return prevDirection;
      });
    });
  }, []);
  function generateApple() {
    const top = Math.floor(Math.random() * areaHeight);
    const left = Math.floor(Math.random() * areaHeight);
    setApple({ top, left });
  }
  function goRight() {
    const newBody = [...body];
    newBody.pop();

    let newRight = newBody[0].right + 1;
    if (newRight > areaWidth - 1) {
      newRight = 0;
    }

    newBody.unshift({ ...newBody[0], right: newRight });

    setBody(newBody);
  }
  function goLeft() {
    const newBody = [...body];
    newBody.pop();

    let newleft = newBody[0].right - 1;
    if (newleft < areaWidth - areaWidth) {
      newleft = areaWidth - 1;
    }

    newBody.unshift({ ...newBody[0], right: newleft });

    setBody(newBody);
  }

  function goDown() {
    const newBody = [...body];
    newBody.pop();
    let newDown = newBody[0].down + 1;
    if (newDown > areaHeight - 1) {
      newDown = 0;
    }

    newBody.unshift({ ...newBody[0], down: newDown });

    setBody(newBody);
  }
  function goUp() {
    const newBody = [...body];
    newBody.pop();
    let newUp = newBody[0].down - 1;
    if (newUp < areaHeight - areaHeight) {
      newUp = areaHeight - 1;
    }

    newBody.unshift({ ...newBody[0], down: newUp });
    setBody(newBody);
  }
  useInterval(
    () => {
      switch (direction) {
        case "right":
          goRight();
          break;
        case "down":
          goDown();
          break;
        case "up":
          goUp();
          break;
        case "left":
          goLeft();
          break;
      }

      if (body[0].down === apple.top && body[0].right === apple.left) {
        generateApple();
        setScore(score + 1);

        setBody([...body, { down: body[1].down, right: body[1].right }]);
      }
      for (let index = 1; index < body.length; index++) {
        if (
          body[0].down === body[index].down &&
          body[0].right === body[index].right
        ) {
          setDirection("");
          setGameOver(true);
        }
      }
    },
    selectCity === "Hard"
      ? 50
      : selectCity === "Medium"
      ? 150
      : selectCity === "Easy"
      ? 250
      : gameOver
      ? 1000000
      : 250
  );
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        fontFamily: "sans-serif",
        width: "100%"
      }}
    >
      <div style={{
        display: gameOver ? "flex" : "none",
        backgroundColor: "black",
        position: "absolute",
        opacity: gameOver ? "50%" : "0%",
        width: "100%",
        height: "100%",
        zIndex: 4,
        transitionDuration: "0.75s"
      }}></div>
      <div
        style={{
          position: "relative",
          backgroundColor: "smokescreen",
          boxShadow: "0px 0px 1000px -100px",
          width: areaWidth * zoom,
          height: areaHeight * zoom,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            top: apple.top * zoom,
            left: apple.left * zoom,
            backgroundColor: "red",
            position: "absolute",
            height: zoom,
            width: zoom,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: gameOver ? "50%" : "10%",
            opacity: gameOver ? "100%" : "0%",
            transition: "0.75s",
            flexDirection: "column",
            backgroundColor: "white",
            padding: 15,
            gap: 5,
            zIndex: 5,
            borderRadius: "10px",
          }}
        >
          <h3 style={{
            fontFamily: "sans-serif"
          }}>Game Over!</h3>
          <button onClick={() => window.location.reload()}>restart?</button>
        </div>
        {body.map((segment, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              backgroundColor: "slategray",
              top: segment.down * zoom,
              left: segment.right * zoom,
              width: zoom,
              height: zoom,
            }}
          ></div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>score: {score}</p>
        <p>highscore: {}</p>
      </div>
      <div className="announcement">
        <div>
          {selectCity ? `You selected ${selectCity}` : "Select your Difficulty"}
        </div>
      </div>
      <button
      style={{

      }}
        className={showDropDown ? "active" : undefined}
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div>{selectCity ? "Select: " + selectCity : "Select ..."} </div>
        {showDropDown && (
          <DropDown
            cities={cities()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            citySelection={citySelection}
          />
        )}
      </button>
    </main>
  );
};

export default Home;
