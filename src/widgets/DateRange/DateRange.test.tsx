import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppDataProvider } from "app/providers";
import { DEFAULT_START_DATE, DEFAULT_END_DATE } from "shared/config/constants";
import DateRange from "./DateRange";

const renderWithProvider = () =>
  render(
    <AppDataProvider>
      <DateRange />
    </AppDataProvider>,
  );

describe("DateRange", () => {
  it("renders Start Date and End Date labels", () => {
    renderWithProvider();
    expect(screen.getByText(/start date/i)).toBeInTheDocument();
    expect(screen.getByText(/end date/i)).toBeInTheDocument();
  });

  it("shows default date values", () => {
    renderWithProvider();
    expect(screen.getByDisplayValue(DEFAULT_START_DATE)).toBeInTheDocument();
    expect(screen.getByDisplayValue(DEFAULT_END_DATE)).toBeInTheDocument();
  });

  it("updates start date on change", async () => {
    renderWithProvider();
    const startInput = screen.getByDisplayValue(DEFAULT_START_DATE);
    await userEvent.clear(startInput);
    await userEvent.type(startInput, "2020-01-03");
    expect(startInput).toHaveValue("2020-01-03");
  });
});
