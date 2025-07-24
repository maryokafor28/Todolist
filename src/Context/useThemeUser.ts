import { useContext } from "react";
import { ThemeUserContext } from "./ThemeUserContext";

export const useThemeUser = () => {
  const context = useContext(ThemeUserContext);
  if (!context) {
    throw new Error("useThemeUser must be used within ThemeUserProvider");
  }
  return context;
};
