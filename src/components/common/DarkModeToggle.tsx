import React, { useEffect, useState } from "react";
import lightIcon from "../../assets/images/sun.svg";
import darkIcon from "../../assets/images/moon.svg";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode((prev) => !prev)} className="p-2">
      <img src={darkMode ? lightIcon : darkIcon} alt="Theme Toggle" className="h-6 w-6" />
    </button>
  );
};

export default DarkModeToggle;
