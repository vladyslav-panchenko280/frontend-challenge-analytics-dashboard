import type { ReactNode } from "react";
import styles from "./InputHolder.module.css";

type InputHolderProps = {
  label?: string;
  htmlFor?: string;
  children: ReactNode;
};

const InputHolder = ({ label, htmlFor, children }: InputHolderProps) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}:
        </label>
      )}
      {children}
    </div>
  );
};

export default InputHolder;
