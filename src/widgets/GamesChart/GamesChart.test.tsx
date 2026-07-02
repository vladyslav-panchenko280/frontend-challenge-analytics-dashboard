import { render, screen } from "@testing-library/react";
import { AppDataProvider } from "app/providers";
import GamesChart from "./GamesChart";

const renderWithProvider = () =>
  render(
    <AppDataProvider>
      <GamesChart />
    </AppDataProvider>,
  );

describe("GamesChart", () => {
  it("renders loading state initially", () => {
    renderWithProvider();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
