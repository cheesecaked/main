import React from "react";

export default function Footer() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p
        style={{
          margin: "0",
        }}
      >
        Made with ♥️ by Nest Academy
      </p>
      <p
        style={{
          opacity: "30%",
        }}
      >
        ©boginoo.io 2020
      </p>
    </div>
  );
}
