import { ComponentPropsWithoutRef } from "react";
import styles from "./TopFullBar.module.scss";
import cn from "classnames/bind";
import { capitalizeFirst } from "../../helpers/stringUtils";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
const cx = cn.bind(styles);
interface TopBarProps extends ComponentPropsWithoutRef<"header"> {
  title: string;
}
const TopBar: React.FC<TopBarProps> = ({ title }) => {
  const capitalizedTitle = title.split(" ").map(capitalizeFirst).join(" ");
  return (
    <header className={cx("TopFullBar")}>
      <Link to="/">
        <AiOutlineHome className={cx("home-icon")} />
      </Link>
      <div className={cx("title")}>{capitalizedTitle}</div>
    </header>
  );
};

export default TopBar;
