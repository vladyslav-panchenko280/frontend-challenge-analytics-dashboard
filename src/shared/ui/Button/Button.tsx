import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

const Button = ({ selected, className, ...rest }: ButtonProps) => {
  const cls = [styles.button, selected ? styles.selected : "", className]
    .filter(Boolean)
    .join(" ");

  return <button className={cls} {...rest} />;
};

export default Button;
