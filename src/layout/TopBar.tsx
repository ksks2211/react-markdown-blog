import { ComponentPropsWithoutRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import styles from "./TopBar.module.scss";
import cn from "classnames/bind";
import HamburgerButton from "../components/HamburgerButton";
import { capitalizeFirst } from "../helpers/stringUtils";

const cx = cn.bind(styles);

interface TopBarProps extends ComponentPropsWithoutRef<"header"> {
  active: boolean;
  isTablet: boolean;
  toggle: () => void;
  title: string;
}

const TopBar: React.FC<TopBarProps> = ({ active, isTablet, toggle, title }) => {
  return (
    <header className={cx("TopBar", { active })}>
      {isTablet && <HamburgerButton active={active} onClick={toggle} />}
      <span className={cx("title", { active })}>{capitalizeFirst(title)}</span>
      <span className={cx("search")}>
        <MdOutlineSearch className={cx("search--icon")} />
      </span>
    </header>
  );
};

export default TopBar;
