import { createTheme, useTheme } from "@mui/material";
import "@testing-library/jest-dom";
import { useLocation } from "react-router-dom";
import { describe, it } from "vitest";
import { ProvidersBuilder, render, screen } from "../testing";

const ComponentRendersThemeMode = () => {
  const theme = useTheme();

  return (
    <div>
      <span>This is component with dependency to MUI theme</span>
      <span>Theme mode: {theme.palette.mode}</span>
    </div>
  );
};

const ComponentRendersLocationPath = () => {
  const location = useLocation();

  return (
    <div>
      <span>This is component with dependency to React Router</span>
      <span data-testid="location-display">{location.pathname}</span>
    </div>
  );
};
describe("ProviderBuilder", () => {
  it("withTheme should provide theme", () => {
    const Providers = new ProvidersBuilder().withTheme({ theme: createTheme({ palette: { mode: "dark" } }) }).build();

    const result = render(<ComponentRendersThemeMode />, {
      wrapper: Providers,
    });

    result.getByText(/dark/);
  });

  it("withRouter should provide router", () => {
    const route = "/test-route";
    const Providers = new ProvidersBuilder().withRouter({ initialEntries: [route] }).build();

    render(<ComponentRendersLocationPath />, {
      wrapper: Providers,
    });

    expect(screen.getByTestId("location-display")).toHaveTextContent(route);
  });
});
