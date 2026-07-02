import { useState, useMemo, ReactNode } from "react";
import { useStoreAnalytics } from "entities/StoreAnalytics";
import { DEFAULT_START_DATE, DEFAULT_END_DATE } from "shared/config/constants";
import type { Measure, DateRange } from "entities/StoreAnalytics";
import { AppDataContext, type AppDataContextType } from "./AppDataContext";

type AppDataProviderProps = {
  children: ReactNode;
};

export const AppDataProvider = ({ children }: AppDataProviderProps) => {
  const { data, loading, error } = useStoreAnalytics();
  const [measure, setMeasure] = useState<Measure>("downloads");
  const [dateRange, setDateRange] = useState<DateRange>({
    start: DEFAULT_START_DATE,
    end: DEFAULT_END_DATE,
  });

  const value: AppDataContextType = useMemo(
    () => ({
      data,
      loading,
      error,
      measure,
      dateRange,
      setMeasure,
      setDateRange,
    }),
    [data, loading, error, measure, dateRange],
  );

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
};
