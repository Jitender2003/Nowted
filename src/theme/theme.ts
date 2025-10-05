import { alpha, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    customTheme?: string;
  }

  interface PaletteOptions {
    customTheme?: string;
  }
}

const baseTheme = createTheme({
  typography: {
    fontFamily: `"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif`,

    // Note Title
    h1: {
      fontWeight: 600,
      fontSize: "32px",
      letterSpacing: 0,
    },

    // Folder Title
    h2: {
      fontWeight: 600,
      fontSize: "22px",
      letterSpacing: 0,
    },

    // Note Title in Under Folder Section
    h3: {
      fontWeight: 600,
      fontSize: "18px",
      letterSpacing: 0,
    },

    // Note Content
    h4: {
      fontWeight: 400,
      fontSize: "16px",
      letterSpacing: 0,
    },

    // Section titles
    h5: {
      fontWeight: 600,
      fontSize: "14px",
      letterSpacing: 0,
    },

    // Section content
    h6: {
      fontWeight: 600,
      fontSize: "16px",
      letterSpacing: 0,
    },

    // Note Activity Titles
    subtitle1: {
      fontWeight: 600,
      fontSize: "28px",
      letterSpacing: 0,
    },

    body1: {
      fontWeight: 400,
      fontSize: "12px",
      letterSpacing: 0,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
});

export const defaultTheme = createTheme({
  ...baseTheme,
  palette: {
    customTheme: "default",
    primary: {
      light: "#323232",
      main: "#232323",
      dark: "#181818",
    },
    secondary: {
      light: "#1C1C1C",
      main: "#312EB5",
    },
    text: {
      primary: "#FFFFFF",
      secondary: alpha("#FFFFFF", 0.6),
    },
  },
});
export const coffeeTheme = createTheme({
  ...baseTheme,
  palette: {
    customTheme: "coffee",
    primary: {
      light: "#685646",
      main: "#402E1E",
      dark: "#2C1A0A",
    },
    secondary: {
      light: "#2E1C10",
      main: "#312EB5",
    },
    text: {
      primary: "#FFFFFF",
      secondary: alpha("#FFFFFF", 0.6),
    },
  },
});

export const midnightTheme = createTheme({
  ...baseTheme,
  palette: {
    customTheme: "midnight",
    primary: {
      light: "#3C4A6B",
      main: "#1F2A40",
      dark: "#121A2A",
    },
    secondary: {
      light: "#161E2E",
      main: "#4C91C0",
    },
    text: {
      primary: "#ffffff",
      secondary: alpha("#ffffff", 0.65),
    },
  },
});

export const oliveTheme = createTheme({
  ...baseTheme,
  palette: {
    customTheme: "olive",
    primary: {
      light: "#A3B18A",
      main: "#588157",
      dark: "#3A5A40",
    },
    secondary: {
      light: "#2E4432",
      main: "#A8B6A3",
    },
    text: {
      primary: "#ffffff",
      secondary: alpha("#ffffff", 0.6),
    },
  },
});
