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
  const [theme, setTheme] = useState<Theme>("light");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (savedTheme) setTheme(savedTheme);
    if (savedUser) setCurrentUser(savedUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
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
