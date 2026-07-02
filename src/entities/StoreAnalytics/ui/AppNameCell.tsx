import styles from "./AppNameCell.module.css";

type AppNameCellProps = {
  name: string;
  icon: string;
};

const AppNameCell = ({ name, icon }: AppNameCellProps) => {
  return (
    <div className={styles.cell}>
      <img
        src={icon}
        alt={name}
        className={styles.icon}
        loading="lazy"
        width={24}
        height={24}
      />
      <span>{name}</span>
    </div>
  );
};

export default AppNameCell;
