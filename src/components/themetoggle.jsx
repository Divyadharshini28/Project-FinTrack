import React from "react";
import { useThemeStore } from "../store/themestore";

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-outline-secondary"
      style={{
        borderRadius: "50%",
        width: "42px",
        height: "42px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {theme === "light" ? (
        <i className="bi bi-moon-fill"></i>
      ) : (
        <i className="bi bi-sun-fill"></i>
      )}
    </button>
  );
}

export default ThemeToggle;
