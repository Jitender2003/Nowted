import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Layout } from "./layout/Layout";
import {
  defaultTheme,
  coffeeTheme,
  midnightTheme,
  oliveTheme,
} from "./theme/theme";

import { useThemeStore } from "./stores/themeStore/ThemeStore";

const themeMap: Record<string, object> = {
  default: defaultTheme,
  coffee: coffeeTheme,
  midnight: midnightTheme,
  forest: oliveTheme,
};

function App() {
  const currentTheme = useThemeStore((state) => state.theme);
  const selectedTheme = themeMap[currentTheme] || defaultTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
