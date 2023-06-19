import React, { useState, useEffect } from "react";
import { Outlet } from "./Outlet";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const LayOut = ({ children }) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "10vh",
          // color: offset !== 0 ? "#000" : "#FFF",
          backgroundColor: offset !== 0 ? "white" : "transparent",
          transitionDuration: "200ms",
          zIndex: 999,
        }}
      >
        <Header offset={offset} />
      </div>
      {children}
      <Outlet />
      <Footer/>
    </>
  );
};
