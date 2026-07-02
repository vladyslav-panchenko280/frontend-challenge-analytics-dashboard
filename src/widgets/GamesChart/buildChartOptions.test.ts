import { buildChartOptions } from "./buildChartOptions";

const series = [
  { name: "App A", type: "line" as const, data: [{ x: 1577836800000, y: 100 }] },
];

describe("buildChartOptions", () => {
  it("sets title to 'Downloads by App' for downloads measure", () => {
    const opts = buildChartOptions(series, "downloads", {
      start: "2020-01-01",
      end: "2020-01-07",
    });
    expect(opts.title?.text).toBe("Downloads by App");
  });

  it("sets title to 'Revenue by App' for revenue measure", () => {
    const opts = buildChartOptions(series, "revenue", {
      start: "2020-01-01",
      end: "2020-01-07",
    });
    expect(opts.title?.text).toBe("Revenue by App");
  });

  it("sets yAxis title to 'Downloads' for downloads measure", () => {
    const opts = buildChartOptions(series, "downloads", {
      start: "2020-01-01",
      end: "2020-01-07",
    });
    const yAxis = Array.isArray(opts.yAxis) ? opts.yAxis[0] : opts.yAxis;
    expect((yAxis as Highcharts.YAxisOptions)?.title?.text).toBe("Downloads");
  });

  it("sets yAxis title to 'Revenue ($)' for revenue measure", () => {
    const opts = buildChartOptions(series, "revenue", {
      start: "2020-01-01",
      end: "2020-01-07",
    });
    const yAxis = Array.isArray(opts.yAxis) ? opts.yAxis[0] : opts.yAxis;
    expect((yAxis as Highcharts.YAxisOptions)?.title?.text).toBe("Revenue ($)");
  });

  it("sets subtitle with formatted date range", () => {
    const opts = buildChartOptions(series, "downloads", {
      start: "2020-01-01",
      end: "2020-01-07",
    });
    expect(opts.subtitle?.text).toBe("Jan 01, 2020 - Jan 07, 2020");
  });

  it("passes series data through", () => {
    const opts = buildChartOptions(series, "downloads", {
      start: "2020-01-01",
      end: "2020-01-07",
    });
    expect(opts.series).toBe(series);
  });
});
