import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { ColorMode, ColorModeContextProvider } from "~/contexts/ColorModeContext";
import { getDesignTokens } from "~/providers/CustomThemeProvider/theme";
import GlobalStyles from "./GlobalStyles";

const VLThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>("light");
  const theme = React.useMemo(() => createTheme(getDesignTokens(colorMode)), [colorMode]);
  const toggleColorMode = useCallback(() => {
    setColorMode((s) => (s === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      colorMode,
      toggleColorMode,
    }),
    [colorMode, toggleColorMode],
  );

  return (
    <ColorModeContextProvider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ColorModeContextProvider>
  );
};

export default VLThemeProvider;
