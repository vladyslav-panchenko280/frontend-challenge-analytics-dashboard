import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Downloads</Button>);
    expect(screen.getByRole("button", { name: "Downloads" })).toBeInTheDocument();
  });

  it("applies selected style when selected=true", () => {
    render(<Button selected>Downloads</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toMatch(/selected/);
  });

  it("does not apply selected style when selected=false", () => {
    render(<Button selected={false}>Downloads</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).not.toMatch(/selected/);
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
