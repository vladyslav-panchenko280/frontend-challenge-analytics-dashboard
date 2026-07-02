import { useMemo, useRef } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Loader } from "shared/ui";
import { useAppData } from "app/providers";
import { filterByDateRange, toChartSeries } from "entities/StoreAnalytics";
import { buildChartOptions } from "./buildChartOptions";

const GamesChart = () => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const { data, loading, measure, dateRange } = useAppData();

  const options = useMemo(() => {
    const filtered = filterByDateRange(data, dateRange);
    const series = toChartSeries(filtered, measure);
    return buildChartOptions(series, measure, dateRange);
  }, [data, measure, dateRange]);

  if (loading) {
    return <Loader />;
  }

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartRef}
    />
  );
};

export default GamesChart;
