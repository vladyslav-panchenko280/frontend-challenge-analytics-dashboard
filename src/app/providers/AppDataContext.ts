import { createContext } from "react";
import type { Measure, DateRange, StoreAnalytics } from "entities/StoreAnalytics";

export type AppDataContextType = {
  data: StoreAnalytics[];
  loading: boolean;
  error: string | null;
  measure: Measure;
  dateRange: DateRange;
  setMeasure: (measure: Measure) => void;
  setDateRange: (dateRange: DateRange) => void;
};

export const AppDataContext = createContext<AppDataContextType | undefined>(
  undefined,
);
