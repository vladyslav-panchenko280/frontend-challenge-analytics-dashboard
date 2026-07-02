import { useAppData } from "app/providers";
import { DateInput, InputHolder } from "shared/ui";
import styles from "./DateRange.module.css";

const DateRange = () => {
  const { dateRange, setDateRange } = useAppData();

  return (
    <div className={styles.wrapper}>
      <InputHolder label="Start Date" htmlFor="start-date">
        <DateInput
          id="start-date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
        />
      </InputHolder>
      <InputHolder label="End Date" htmlFor="end-date">
        <DateInput
          id="end-date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
      </InputHolder>
    </div>
  );
};

export default DateRange;
