import { useEffect, useState } from "react";
import useInterval from "use-interval";

const zoom = 10;
const areaWidth = 30;
const areaHeight = 30;

export default function Home() {
  const [body, setBody] = useState([
    { down: 3, right: 5 },
    { down: 3, right: 4 },
    { down: 3, right: 3 },
    { down: 3, right: 2 },
    { down: 3, right: 1 },
  ]);
  const [direction, setDirection] = useState("down");

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (direction !== "up" && e.code === "ArrowDown") {
        setDirection("down")
      } else if (direction !== "down" && e.code === "ArrowUp") {
        setDirection("up")
      } else if (direction !== "right" && e.code === "ArrowLeft") {
        setDirection("left")
      } else if (direction !== "left" && e.code === "ArrowRight") {
        setDirection("right")
      }
      // switch (e.code) {
      //   case "ArrowDown":
      //     setDirection("down");
      //     break;
      //   case "ArrowRight":
      //     setDirection("right");
      //     break;
      //   case "ArrowUp":
      //     setDirection("up");
      //     break;
      //   case "ArrowLeft":
      //     setDirection("left");
      //     break;
      // }
    });
  });

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
  useInterval(() => {
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
        goLeft()
        break;
    }
  }, 250);
  return (
    <main
      style={{
        display: "flex",
        minHeight: "screen",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 24,
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "slateblue",
          width: areaWidth * zoom,
          height: areaHeight * zoom,
        }}
      >
        {body.map((segment) => (
          <div
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
    </main>
  );
}
