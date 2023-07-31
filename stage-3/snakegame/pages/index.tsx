import { useEffect, useState } from "react";
import useInterval from "use-interval";
import DropDown from "./component/dropdown";
import LevelDropDown from "./component/levelDropdown";
const zoom = 20;
const areaWidth = 40;
const areaHeight = 40;
const Home = () => {
  const [body, setBody] = useState([
    { down: 3, right: 5 },
    { down: 3, right: 4 },
    { down: 3, right: 3 },
  ]);
  const [level1, setLevel1] = useState([
    { down: 19, right: 19 },
    { down: 18, right: 19 },
    { down: 17, right: 19 },
    { down: 16, right: 19 },
    { down: 20, right: 19 },
    { down: 21, right: 19 },
    { down: 22, right: 19 },
    { down: 23, right: 19 },
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
  const [showLevel, setShowLevel] = useState(false);
  const [selectCity, setSelectCity] = useState("");
  const [selectLevel, setSelectLevel] = useState("");
  const cities = () => {
    return ["Hard", "Medium", "Easy"];
  };
  const levels = () => {
    return ["level 1", "level 2"];
  };
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const toggleLevel = () => {
    setShowLevel(!showLevel);
  };
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };
  const citySelection = (city: string): void => {
    setSelectCity(city);
  };
  const levelSelection = (levels: string): void => {
    setSelectLevel(levels);
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
    let newLeft = body[0].right + 1;
    if (newLeft > areaWidth - 1) {
      newLeft = 0;
    }

    return { ...body[0], right: newLeft };
  }
  function goLeft() {
    let newLeft = body[0].right - 1;
    if (newLeft < 0) {
      newLeft = areaWidth - 1;
    }

    return { ...body[0], right: newLeft };
  }

  function goDown() {
    let newTop = body[0].down + 1;
    if (newTop > areaHeight - 1) {
      newTop = 0;
    }
    return { ...body[0], down: newTop };
  }
  function goUp() {
    let newTop = body[0].down - 1;
    if (newTop < 0) {
      newTop = areaHeight - 1;
    }
    return { ...body[0], down: newTop };
  }
  useInterval(
    () => {
      const newBody = [...body];
      newBody.pop();

      let newHead = null;
      switch (direction) {
        case "right":
          newHead = goRight();
          break;
        case "down":
          newHead = goDown();
          break;
        case "up":
          newHead = goUp();
          break;
        case "left":
          newHead = goLeft();
          break;
        default:
          newHead = goRight();
      }
      newBody.unshift(newHead);
      // if (body[0].down === apple.top && body[0].right === apple.left) {
      //   generateApple();
      //   setScore(score + 1);

      //   setBody([...body, { down: body[1].down, right: body[1].right }]);
      // }
      if (newBody[0].down === apple.top && newBody[0].right === apple.left) {
        generateApple();
        const newBodyPartAfterFood = {
          down: newBody[1].down,
          right: newBody[1].right,
        };
        setBody([...newBody, newBodyPartAfterFood]);
        setScore(score + 1)
      } else {
        setBody(newBody);
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
      if (selectLevel === "level 1") {
        for (let index = 0; index < level1.length; index++) {
          if (
            body[0].down === level1[index].down &&
            body[0].right === level1[index].right
          ) {
            setGameOver(true);
          }
        }
      }
    },
    selectCity === "Hard"
      ? 50
      : selectCity === "Medium"
      ? 150
      : selectCity === "Easy"
      ? 250
      : 150
  );
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        fontFamily: "sans-serif",
        width: "100%",
      }}
    >
      <div
        style={{
          display: gameOver ? "flex" : "none",
          backgroundColor: "black",
          position: "absolute",
          opacity: gameOver ? "50%" : "0%",
          width: "100%",
          height: "100%",
          zIndex: 4,
          transitionDuration: "0.75s",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          top: gameOver ? "40%" : "10%",
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
        <h3
          style={{
            fontFamily: "sans-serif",
          }}
        >
          Game Over!
        </h3>
        <button onClick={() => window.location.reload()}>restart?</button>
      </div>
      <div
        style={{
          position: "relative",
          backgroundColor: "smokescreen",
          boxShadow: "0px 0px 1000px -100px",
          width: areaWidth * zoom,
          height: areaHeight * zoom,
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

        {body.map((segment, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              backgroundColor: "green",
              top: segment.down * zoom,
              left: segment.right * zoom,
              width: zoom,
              height: zoom,
            }}
          ></div>
        ))}
        {level1.map((segment, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              display: selectLevel === "level 1" ? "flex" : "none",
              backgroundColor: "black",
              top: segment.down * zoom,
              left: segment.right * zoom,
              width: zoom,
              height: zoom,
            }}
          ></div>
        ))}
      </div>
      <div></div>
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <p>score: {score}</p>
        <p>highscore: {}</p>
      </div>
      <div
        style={{
          display: "flex",
          gap: 20,
        }}
      >
        <div className="announcement">
          <div>
            {selectCity
              ? `You selected ${selectCity}`
              : "Select your Difficulty"}
          </div>
          <button
            style={{}}
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
        </div>
        <div className="announcement">
          <div>
            {selectCity ? `You selected ${selectCity}` : "Select a level"}
          </div>
          <button
            style={{}}
            className={showDropDown ? "active" : undefined}
            onClick={toggleLevel}
            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
              dismissHandler(e)
            }
          >
            <div>{selectLevel ? "Select: " + selectLevel : "Select ..."} </div>
            {showLevel && (
              <LevelDropDown
                levels={levels()}
                showLevel={false}
                toggleLevel={(): void => toggleLevel()}
                levelSelection={levelSelection}
              />
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
