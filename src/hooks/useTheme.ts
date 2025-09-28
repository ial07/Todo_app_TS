import { useContext,createContext } from "react";

interface ThemeContextType  {
  darkMode: boolean;
  toggleDarkMode: (mode: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
