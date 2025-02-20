import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const lightTheme = {
  text: "#000000",
  background: "#fbfbfe",
  primary: "#7b19db",
  secondary: "lightgrey",
  accent: "#ee96d4",
};

const darkTheme = {
  text: "#ffffff",
  background: "#010104",
  primary: "#8523e7",
  secondary: "darkgrey",
  accent: "#69114f",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkTheme); // Default to light theme

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === lightTheme ? darkTheme : lightTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
