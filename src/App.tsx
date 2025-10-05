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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const themeMap: Record<string, object> = {
  default: defaultTheme,
  coffee: coffeeTheme,
  midnight: midnightTheme,
  forest: oliveTheme,
};

function App() {
  const currentTheme = useThemeStore((state) => state.theme);
  const selectedTheme = themeMap[currentTheme] || defaultTheme;

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <Layout  />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
