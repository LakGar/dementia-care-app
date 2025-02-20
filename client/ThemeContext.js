import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const lightTheme = {
  text: "#000000",
  background: "#fbfbfe",
  primary: "#7b19db",
  secondary: "#e6e6e6",
  accent: "#ee96d4",
  subText: "#282727",
  card: "#eeeeee",
};

const darkTheme = {
  text: "#ffffff",
  background: "#010104",
  primary: "#8523e7",
  secondary: "#282727",
  accent: "#69114f",
  subText: "#d9d8d8",
  card: "#121212",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme); // Default to light theme

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
