import { render, screen } from "@testing-library/react";
import { AppDataProvider } from "app/providers";
import MainPage from "./MainPage";

const renderWithProvider = () =>
  render(
    <AppDataProvider>
      <MainPage />
    </AppDataProvider>,
  );

describe("MainPage", () => {
  it("renders date range controls", () => {
    renderWithProvider();
    expect(screen.getByText(/start date/i)).toBeInTheDocument();
    expect(screen.getByText(/end date/i)).toBeInTheDocument();
  });

  it("renders measure toggle buttons", () => {
    renderWithProvider();
    expect(screen.getByRole("button", { name: "Downloads" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Revenue" })).toBeInTheDocument();
  });

  it("renders loading states for chart and table initially", () => {
    renderWithProvider();
    expect(screen.getAllByRole("progressbar")).toHaveLength(2);
  });
});
