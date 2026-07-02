import CircularProgress from "@mui/material/CircularProgress";
import styles from "./Loader.module.css";

type LoaderProps = {
  height?: number;
};

const Loader = ({ height = 400 }: LoaderProps) => {
  return (
    <div className={styles.loader} style={{ height }}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
