import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppDataProvider } from "app/providers";
import MeasureToggle from "./MeasureToggle";

const renderWithProvider = () =>
  render(
    <AppDataProvider>
      <MeasureToggle />
    </AppDataProvider>,
  );

describe("MeasureToggle", () => {
  it("renders Downloads and Revenue buttons", () => {
    renderWithProvider();
    expect(screen.getByRole("button", { name: "Downloads" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Revenue" })).toBeInTheDocument();
  });

  it("Downloads button is selected by default", () => {
    renderWithProvider();
    expect(screen.getByRole("button", { name: "Downloads" }).className).toMatch(/selected/);
    expect(screen.getByRole("button", { name: "Revenue" }).className).not.toMatch(/selected/);
  });

  it("switches selected state when Revenue is clicked", async () => {
    renderWithProvider();
    await userEvent.click(screen.getByRole("button", { name: "Revenue" }));
    expect(screen.getByRole("button", { name: "Revenue" }).className).toMatch(/selected/);
    expect(screen.getByRole("button", { name: "Downloads" }).className).not.toMatch(/selected/);
  });
});
