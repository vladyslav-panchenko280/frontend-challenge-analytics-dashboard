import { DateRange } from "widgets/DateRange";
import { MeasureToggle } from "widgets/MeasureToggle";
import { GamesChart } from "widgets/GamesChart";
import { GamesTable } from "widgets/GamesTable";
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <DateRange />
      <MeasureToggle />
      <GamesChart />
      <GamesTable />
    </div>
  );
};

export default MainPage;
