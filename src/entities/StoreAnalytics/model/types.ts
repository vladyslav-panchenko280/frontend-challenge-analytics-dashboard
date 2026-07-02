export type Measure = "downloads" | "revenue"; 

export type DataPoint = [date: string, downloads: number, revenueInCents: number];

export type StoreAnalytics = {
  id: number;
  name: string;
  icon: string;
  data: DataPoint[];
};

export type DateRange = {
  start: string;
  end: string;
};
