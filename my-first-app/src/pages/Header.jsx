import React from "react";
import Logo from "../assets/Group 22.png";
import { Link } from "react-router-dom";
import "../styles/test.css";

const headerTitles = [
  {
    title: "Products",
    link: "/products",
  },
  {
    title: "Contact",
    link: "/Contact",
  },
  {
    title: "Services",
    link: "/Services",
  },
  {
    title: "Log in",
    link: "/Log_In",
  },
];
export const Header = (props) => {
  const { offset } = props;
  return (
    <>
      <div className="top-of-header">
        <div className="iconLogo">
          <Link to="/">
            <img
              style={{
                filter: offset === 0 ? "invert(0%)" : "invert(100%)",
              }}
              src={Logo}
              alt=""
            />
          </Link>
        </div>
        <div className="servicesAndContacts">
          {headerTitles.map((item, index) => {
            return (
              <Link
                key={index}
                style={{ color: offset === 0 ? "white" : "black" }}
                to={item.link}
              >
                <h3>{item.title}</h3>
              </Link>
            );
          })}
          <button className="getAccess">Get Access</button>
        </div>
      </div>
    </>
  );
};
