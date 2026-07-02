import { Measure } from "./types";

type MeasureConfig = {
  label: string;
  chartTitle: string;
  yAxisTitle: string;
  getValue: (point: [string, number, number]) => number;
};

export const MEASURES: Record<Measure, MeasureConfig> = {
  downloads: {
    label: "Downloads",
    chartTitle: "Downloads by App",
    yAxisTitle: "Downloads",
    getValue: ([, downloads]) => downloads,
  },
  revenue: {
    label: "Revenue",
    chartTitle: "Revenue by App",
    yAxisTitle: "Revenue ($)",
    getValue: ([, , revenueInCents]) => revenueInCents / 100,
  },
};
