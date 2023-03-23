import React, { useContext } from "react";

export type ColorMode = "light" | "dark";

/**
 * ColorModeContext
 *
 * Used to switch between light and dark theme
 * Use useColorModeContext for convenience, but make sure to wrap app with ColorModeContextProviders
 */
const ColorModeContext = React.createContext<{
  colorMode: ColorMode;
  toggleColorMode: () => void;
} | null>(null);

const ColorModeContextProvider = ColorModeContext.Provider;

const useColorModeContext = () => {
  const value = useContext(ColorModeContext);

  if (!value) {
    throw Error("useColorModeContext rendered outside ColorModeProvider");
  }

  return value;
};

export { ColorModeContext, useColorModeContext, ColorModeContextProvider };
