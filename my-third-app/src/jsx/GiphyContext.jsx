
import React, { createContext } from "react";
import { useState, useMemo } from "react";

export const ColorModeContext = createContext();
const dark = {
  backgroundColor: "black",
  color: "white",
  filter: "invert(0%)",
  backgroundColor2: "#252B3B"
};
const light = {
  backgroundColor: "white",
  color: "black",
  filter: "invert(100%)",
  backgroundColor2: "lightgrey"
};

function ThemeContext({ children }) {
  const [loading, setLoading] = useState(false)
  const [isDark, setIsDark] = useState(false);
  const theme = useMemo(() => {
    if (isDark) {
      return dark;
    }
    return light;
  }, [isDark]);
  const changeTheme = () => {
    setIsDark(!isDark);
  };
  const Loading = () => {
    setLoading(true)
  }
  setLoading(false)
  return (
    <ColorModeContext.Provider
      value={{
        theme,
        changeTheme,
        isDark,
        Loading
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
}

export default ThemeContext;