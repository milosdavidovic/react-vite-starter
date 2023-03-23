import "@testing-library/jest-dom";
import { describe, it } from "vitest";
import App from "~/App";
import { render } from "~/utils/testing";

describe("App", () => {
  it("should render without braking", () => {
    render(<App />);
  });
});
