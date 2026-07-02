import { formatNumber, formatCurrency } from "./format";

describe("formatNumber", () => {
  it("formats with thousands commas", () => {
    expect(formatNumber(80000)).toBe("80,000");
    expect(formatNumber(512000)).toBe("512,000");
    expect(formatNumber(1000000)).toBe("1,000,000");
  });

  it("formats zero", () => {
    expect(formatNumber(0)).toBe("0");
  });
});

describe("formatCurrency", () => {
  it("formats with dollar sign and commas", () => {
    expect(formatCurrency(377634.42)).toBe("$377,634.42");
    expect(formatCurrency(194038.15)).toBe("$194,038.15");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("formats small values with 2 decimals", () => {
    expect(formatCurrency(0.74)).toBe("$0.74");
  });
});
