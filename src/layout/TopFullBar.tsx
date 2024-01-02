import { ComponentPropsWithoutRef } from "react";
import styles from "./TopFullBar.module.scss";
import cn from "classnames/bind";
import { capitalizeFirst } from "../helpers/stringUtils";
const cx = cn.bind(styles);
interface TopBarProps extends ComponentPropsWithoutRef<"header"> {
  title: string;
}
const TopBar: React.FC<TopBarProps> = ({ title, children }) => {
  const capitalizedTitle = title.split(" ").map(capitalizeFirst).join(" ");
  return (
    <header className={cx("TopFullBar")}>
      {children}
      <div className={cx("title")}>{capitalizedTitle}</div>
    </header>
  );
};

export default TopBar;
