import React, { useState } from "react";
import icon from "../assets/icon.png";
import event from "../assets/event 1.png";
import group from "../assets/Group 10.png";
import schedule from "../assets/Group 18.png";
import "../styles/test.css";
export const Outlet = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div className="headerContainer">
        <div className="leftOfHeader">
          <div className="descAndAccess">
            <div className="description">
              <h1>Instant collaborations for remote teams</h1>
              <div className="h3s">
                <h3>All in one for your remote team chats,</h3>
                <h3>collaboration and track projects</h3>
              </div>
            </div>
            <div className="inputAndButton">
              <input
                placeholder="Email"
                className="emailInput"
                type={"text"}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <button
                className="earlyAccessButton"
                onClick={() => {
                  if (inputValue !== "") {
                    console.log(inputValue);
                  }
                }}
              >
                Get early access
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="middle-body">
        <div className="middle-1 middle">
          <div className="right-1 right">
            <p>
              <h1>
                Your Hub For <br /> Teamwork
              </h1>
              <h3>
                Give everyone you work with—inside and outside your <br />{" "}
                company—a more productive way to stay in sync.
                <br /> Respond faster with emoji, keep conversations focused
                <br /> in channels, and simplify all your communication into
                <br /> one place.
              </h3>
            </p>
          </div>
          <div className="left-1 left">
            <div className="event-pic">
              <div className="icon-icon">
                <img className="icon-1" src={icon} alt="" />
              </div>
              <div className="event-icon">
                <img className="event-1" src={event} alt="" />
              </div>
            </div>
            <div className="group-icon">
              <img className="group-1" src={group} alt="" />
            </div>
          </div>
        </div>
        <div className="middle-2 middle">
          <div className="right-2 right">
            <div></div>
            <div></div>
          </div>
          <div className="left-2 left">
            <p>
              <h1>
                Simple task <br /> management
              </h1>
              <h3>
                Give everyone you work with—inside and outside your <br />{" "}
                company—a more productive way to stay in sync.
                <br /> Respond faster with emoji, keep conversations focused
                <br /> in channels, and simplify all your communication into
                <br /> one place.
              </h3>
            </p>
          </div>
        </div>
        <div className="middle-3 middle">
          <div className="right-3 right">
            <p>
              <h1>
                Scheduling that <br /> actually works
              </h1>
              <h3>
                Give everyone you work with—inside and outside your <br />{" "}
                company—a more productive way to stay in sync.
                <br /> Respond faster with emoji, keep conversations focused
                <br /> in channels, and simplify all your communication into
                <br /> one place.
              </h3>
            </p>
          </div>
          <div className="left-3 left">
            <div className="background"></div>
            <img className="schedule" src={schedule} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

//  export const UserCard = ({ userData }) => {
//   return (
//     <div className="card">
//       <div className="User">
//         <p className="Description">
//           <h3>⭐ ⭐ ⭐ ⭐ ⭐ </h3>
//           <h2 className="desc">
//             Give everyone you work with inside and outside your emoji, keep
//             conversations focused in channels, and simplify all your
//             communications in one place
//           </h2>
//           <p>
//             <img src={userData.avatar} alt={""}/>
//             <Link to={userData.first_name}>
//             <h2>{userData.username}</h2>
//             </Link>

//           </p>
//         </p>
//       </div>
//     </div>
//   );
// };
