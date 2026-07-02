import { render, screen } from "@testing-library/react";
import { AppDataProvider } from "app/providers";
import GamesTable from "./GamesTable";

const renderWithProvider = () =>
  render(
    <AppDataProvider>
      <GamesTable />
    </AppDataProvider>,
  );

describe("GamesTable", () => {
  it("renders loading state initially", () => {
    renderWithProvider();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
