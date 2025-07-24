import { createContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface User {
  username: string;
  email: string;
}

interface ThemeUserContextType {
  theme: Theme;
  toggleTheme: () => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

export const ThemeUserContext = createContext<ThemeUserContextType | undefined>(
  undefined
);

export function ThemeUserProvider({ children }: { children: ReactNode }) {
  // Initialize directly from localStorage
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "light";
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  });

  // Sync theme to document and localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeUserContext.Provider
      value={{ theme, toggleTheme, currentUser, setCurrentUser }}
    >
      {children}
    </ThemeUserContext.Provider>
  );
}
