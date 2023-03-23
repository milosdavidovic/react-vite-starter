import React, { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "@mui/system";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import { getDesignTokens } from "../providers/CustomThemeProvider/theme";
import { createTheme } from "@mui/material";
import { MemoryRouter, MemoryRouterProps } from "react-router-dom";

/**
 * ProvidersBuilder
 *
 * This is helper class to solve boilerpate code problem when providing wrappers (providers)
 * to React Testing Library render function.
 * Example of usage without this builder:
 *
 * const AllTheProviders = ({children}) => {
 *   return (
 *     <ThemeProvider theme="light">
 *       <TranslationProvider messages={defaultStrings}>
 *         {children}
 *       </TranslationProvider>
 *     </ThemeProvider>
 *   )
 * }
 *
 * ...then we can render like:
 * render(<ComponentUnderTest />, {wrapper: AllProviders, ...options});
 *
 * With use of builder we would get a bit cleaner api:
 *
 * const Providers = new ProvidersBuilder().withTheme().build();
 *
 * render(<ComponentUnderTest />, {
 *   wrapper: Providers,
 * });
 *
 * ... and if we want to provide some params to the provider we can do so like:
 *
 * const Providers = new ProvidersBuilder().withTheme({ theme: createTheme({ palette: { mode: "dark" } }) }).build();
 *
 * render(<ComponentUnderTest />, {
 *   wrapper: Providers,
 * });
 *
 * See test file for more examples.
 *
 */
export class ProvidersBuilder {
  protected readonly _providers: Array<FC<PropsWithChildren>> = [];

  public withTheme(args?: ThemeProviderProps) {
    const theme = createTheme(getDesignTokens("dark"));
    const defaultArgs: ThemeProviderProps = { theme };
    const providerArgs: ThemeProviderProps = { ...defaultArgs, ...args };
    this._providers.push(({ children }) => <ThemeProvider {...providerArgs}>{children}</ThemeProvider>);
    return this;
  }

  public withRouter(args?: MemoryRouterProps) {
    this._providers.push(({ children }) => <MemoryRouter {...args}>{children}</MemoryRouter>);
    return this;
  }

  private composeProviders = (providers: Array<FC<PropsWithChildren>>, children?: React.ReactNode): JSX.Element => {
    const Provider = providers.pop();

    if (!Provider) {
      return <>{children}</>;
    }

    return <Provider>{this.composeProviders(providers, children)}</Provider>;
  };

  public build(): FC<PropsWithChildren> {
    return ({ children }) => this.composeProviders(this._providers, children);
  }
}

// re-export everything
export * from "@testing-library/react";
