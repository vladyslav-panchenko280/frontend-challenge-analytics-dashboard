import * as Highcharts from "highcharts";
import { dayjsUtc } from "shared/lib/dayjs";
import { DATE_FORMAT_DISPLAY, DATE_FORMAT_AXIS } from "shared/config/constants";
import { MEASURES } from "entities/StoreAnalytics";
import type { Measure, DateRange } from "entities/StoreAnalytics";

type SeriesData = { name: string; type: "line"; data: { x: number; y: number }[] };

export const buildChartOptions = (
  series: SeriesData[],
  measure: Measure,
  dateRange: DateRange,
): Highcharts.Options => {
  const { chartTitle, yAxisTitle } = MEASURES[measure];
  const subtitle = `${dayjsUtc(dateRange.start).format(DATE_FORMAT_DISPLAY)} - ${dayjsUtc(dateRange.end).format(DATE_FORMAT_DISPLAY)}`;

  return {
    title: { text: chartTitle },
    subtitle: { text: subtitle },
    yAxis: { title: { text: yAxisTitle } },
    xAxis: {
      type: "datetime",
      labels: {
        formatter() {
          return dayjsUtc(this.value).format(DATE_FORMAT_AXIS);
        },
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },
    plotOptions: {
      series: {
        marker: {
          enabled: false,
          states: { hover: { enabled: false } },
        },
      },
    },
    series,
  };
};
