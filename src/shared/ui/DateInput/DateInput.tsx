import type { InputHTMLAttributes } from "react";
import styles from "./DateInput.module.css";

type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

const DateInput = ({ className, ...rest }: DateInputProps) => {
  return (
    <input
      type="date"
      className={[styles.input, className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
};

export default DateInput;
