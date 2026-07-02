import { render, screen } from "@testing-library/react";
import AppNameCell from "./AppNameCell";

describe("AppNameCell", () => {
  it("renders the app name", () => {
    render(<AppNameCell name="Clash of Clans" icon="https://example.com/icon.png" />);
    expect(screen.getByText("Clash of Clans")).toBeInTheDocument();
  });

  it("renders the icon with correct alt and src", () => {
    render(<AppNameCell name="Clash of Clans" icon="https://example.com/icon.png" />);
    const img = screen.getByRole("img", { name: "Clash of Clans" });
    expect(img).toHaveAttribute("src", "https://example.com/icon.png");
    expect(img).toHaveAttribute("loading", "lazy");
  });
});
