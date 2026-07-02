import { MEASURES } from "entities/StoreAnalytics";
import { Button } from "shared/ui";
import { useAppData } from "app/providers";
import styles from "./MeasureToggle.module.css";
import { typedEntries } from "shared/lib/utils";

const MeasureToggle = () => {
  const { measure, setMeasure } = useAppData();

  return (
    <div className={styles.group}>
      {typedEntries(MEASURES).map(([key, config]) => (
        <Button
          key={key}
          selected={measure === key}
          onClick={() => setMeasure(key)}
        >
          {config.label}
        </Button>
      ))}
    </div>
  );
};

export default MeasureToggle;
