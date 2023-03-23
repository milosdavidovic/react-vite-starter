import { PaletteMode, ThemeOptions } from "@mui/material";
import KarlaFont from "../../assets/fonts/Karla-VariableFont_wght.ttf";

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#142D55",
          },
          secondary: {
            main: "#ED970C",
          },

          background: {
            default: "#fff",
            paper: "#fff",
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: "#4384BF",
            light: "#266798",
            dark: "#12183E",
            contrastText: "#fff",
          },
          secondary: {
            main: "#e57373",
            light: "#ffa4a2",
            dark: "#af4448",
            contrastText: "rgba(0, 0, 0, 0.87)",
          },
          background: {
            default: "#052B4E",
            paper: "#021F3D",
          },
          text: {
            primary: "#fff",
            secondary: "#98ccfb",
          },
        }),
  },

  typography: {
    fontFamily: ["Karla", "sans-serif"].join(","),
    h6: {
      fontWeight: "bold",
    },
    h5: {
      fontWeight: "bold",
    },
    h4: {
      fontWeight: "bold",
    },
    h3: {
      fontWeight: "bold",
    },
    h2: {
      fontWeight: "bold",
    },
    h1: {
      fontWeight: "bold",
    },
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `@font-face {
        font-family: 'Karla';
        font-display: swap;
        src: url(${KarlaFont});
        font-weight: 400;
        font-style: normal;
        font-display: fallback;
      }`,
    },
  },
});
