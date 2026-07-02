import { filterByDateRange, computeRpd, toRows, toChartSeries } from "./selectors";
import type { StoreAnalytics } from "./types";

const mockData: StoreAnalytics[] = [
  {
    id: 1,
    name: "App A",
    icon: "https://example.com/a.png",
    data: [
      ["2020-01-01", 100, 10000],
      ["2020-01-02", 200, 20000],
      ["2020-01-03", 300, 30000],
    ],
  },
  {
    id: 2,
    name: "App B",
    icon: "https://example.com/b.png",
    data: [
      ["2020-01-01", 50, 5000],
      ["2020-01-03", 150, 15000],
    ],
  },
];

describe("filterByDateRange", () => {
  it("includes start and end date (inclusive bounds)", () => {
    const result = filterByDateRange(mockData, {
      start: "2020-01-01",
      end: "2020-01-02",
    });
    expect(result[0].data).toHaveLength(2);
    expect(result[0].data[0][0]).toBe("2020-01-01");
    expect(result[0].data[1][0]).toBe("2020-01-02");
  });

  it("excludes data outside the range", () => {
    const result = filterByDateRange(mockData, {
      start: "2020-01-02",
      end: "2020-01-02",
    });
    expect(result[0].data).toHaveLength(1);
    expect(result[1].data).toHaveLength(0);
  });

  it("returns all data when range covers everything", () => {
    const result = filterByDateRange(mockData, {
      start: "2020-01-01",
      end: "2020-01-03",
    });
    expect(result[0].data).toHaveLength(3);
    expect(result[1].data).toHaveLength(2);
  });
});

describe("computeRpd", () => {
  it("returns the ratio when both values are valid", () => {
    expect(computeRpd(100, 200)).toBe(0.5);
  });

  it("returns null when downloads is 0", () => {
    expect(computeRpd(100, 0)).toBeNull();
  });

  it("returns null when both revenue and downloads are 0", () => {
    expect(computeRpd(0, 0)).toBeNull();
  });

  it("returns 0 when revenue is 0 but downloads > 0", () => {
    expect(computeRpd(0, 100)).toBe(0);
  });
});

describe("toRows", () => {
  it("sums downloads and converts revenue from cents to dollars", () => {
    const filtered = filterByDateRange(mockData, {
      start: "2020-01-01",
      end: "2020-01-03",
    });
    const rows = toRows(filtered);
    expect(rows[0].downloads).toBe(600);
    expect(rows[0].revenue).toBe(600);
  });

  it("computes RPD as a number", () => {
    const filtered = filterByDateRange(mockData, {
      start: "2020-01-01",
      end: "2020-01-03",
    });
    const rows = toRows(filtered);
    expect(rows[0].rpd).toBe(1);
  });

  it("returns null for RPD when downloads is 0", () => {
    const zeroDownloads: StoreAnalytics[] = [
      {
        id: 3,
        name: "App C",
        icon: "https://example.com/c.png",
        data: [["2020-01-01", 0, 285000]],
      },
    ];
    const rows = toRows(zeroDownloads);
    expect(rows[0].rpd).toBeNull();
  });
});

describe("toChartSeries", () => {
  it("maps downloads measure correctly", () => {
    const filtered = filterByDateRange(mockData, {
      start: "2020-01-01",
      end: "2020-01-01",
    });
    const series = toChartSeries(filtered, "downloads");
    expect(series[0].data[0].y).toBe(100);
  });

  it("converts revenue from cents to dollars", () => {
    const filtered = filterByDateRange(mockData, {
      start: "2020-01-01",
      end: "2020-01-01",
    });
    const series = toChartSeries(filtered, "revenue");
    expect(series[0].data[0].y).toBe(100);
  });
});
