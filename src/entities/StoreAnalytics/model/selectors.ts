import { dayjsUtc } from "shared/lib/dayjs";
import type { StoreAnalytics, DataPoint, DateRange, Measure } from "./types";
import { MEASURES } from "./measures";

export const filterByDateRange = (data: StoreAnalytics[], range: DateRange): StoreAnalytics[] => {
  const start = dayjsUtc(range.start);
  const end = dayjsUtc(range.end);

  return data.map((app) => ({
    ...app,
    data: app.data.filter(([date]) => {
      const d = dayjsUtc(date);
      return !d.isBefore(start) && !d.isAfter(end);
    }),
  }));
};

export const toChartSeries = (filtered: StoreAnalytics[], measure: Measure) => {
  const { getValue } = MEASURES[measure];

  return filtered.map((app) => ({
    name: app.name,
    type: "line" as const,
    data: app.data.map((point) => ({
      x: dayjsUtc(point[0]).valueOf(),
      y: getValue(point),
    })),
  }));
};

export type TableRow = {
  id: number;
  name: string;
  icon: string;
  downloads: number;
  revenue: number;
  rpd: number | null;
};

export const computeRpd = (revenueDollars: number, downloads: number): number | null => {
  if (!downloads || !isFinite(revenueDollars / downloads)) return null;
  return revenueDollars / downloads;
};

const sumField = (data: DataPoint[], getter: (p: DataPoint) => number): number =>
  data.reduce((acc, p) => acc + getter(p), 0);

export const toRows = (filtered: StoreAnalytics[]): TableRow[] => {
  return filtered.map((app) => {
    const downloads = sumField(app.data, ([, d]) => d);
    const revenueInCents = sumField(app.data, ([, , r]) => r);
    const revenue = revenueInCents / 100;

    return {
      id: app.id,
      name: app.name,
      icon: app.icon,
      downloads,
      revenue,
      rpd: computeRpd(revenue, downloads),
    };
  });
};
