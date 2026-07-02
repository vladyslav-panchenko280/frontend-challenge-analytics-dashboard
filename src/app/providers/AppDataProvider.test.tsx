import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppDataProvider } from "./AppDataProvider";
import { useAppData } from "./useAppData";
import { DEFAULT_START_DATE, DEFAULT_END_DATE } from "shared/config/constants";

const Consumer = () => {
  const { measure, dateRange, setMeasure, setDateRange } = useAppData();
  return (
    <div>
      <span data-testid="measure">{measure}</span>
      <span data-testid="start">{dateRange.start}</span>
      <span data-testid="end">{dateRange.end}</span>
      <button onClick={() => setMeasure("revenue")}>set revenue</button>
      <button onClick={() => setDateRange({ start: "2020-01-03", end: "2020-01-05" })}>
        set range
      </button>
    </div>
  );
};

describe("AppDataProvider", () => {
  it("provides default measure and dateRange", () => {
    render(
      <AppDataProvider>
        <Consumer />
      </AppDataProvider>,
    );
    expect(screen.getByTestId("measure")).toHaveTextContent("downloads");
    expect(screen.getByTestId("start")).toHaveTextContent(DEFAULT_START_DATE);
    expect(screen.getByTestId("end")).toHaveTextContent(DEFAULT_END_DATE);
  });

  it("updates measure when setMeasure is called", async () => {
    render(
      <AppDataProvider>
        <Consumer />
      </AppDataProvider>,
    );
    await userEvent.click(screen.getByText("set revenue"));
    expect(screen.getByTestId("measure")).toHaveTextContent("revenue");
  });

  it("updates dateRange when setDateRange is called", async () => {
    render(
      <AppDataProvider>
        <Consumer />
      </AppDataProvider>,
    );
    await userEvent.click(screen.getByText("set range"));
    expect(screen.getByTestId("start")).toHaveTextContent("2020-01-03");
    expect(screen.getByTestId("end")).toHaveTextContent("2020-01-05");
  });
});

describe("useAppData", () => {
  it("throws when used outside AppDataProvider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(
      "useAppData must be used within AppDataProvider",
    );
    consoleError.mockRestore();
  });
});
