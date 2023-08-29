import { ComponentPropsWithoutRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import styles from "./TopBar.module.scss";
import cn from "classnames/bind";
import HamburgerButton from "../common/HamburgerButton";
import { capitalizeFirst } from "../../helpers/stringUtils";
import useGlobal from "../../hooks/useGlobal";

const cx = cn.bind(styles);

interface TopBarProps extends ComponentPropsWithoutRef<"header"> {
  active: boolean;
  isTablet: boolean;
  toggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ active, isTablet, toggle }) => {
  const { selectedMenu } = useGlobal();
  return (
    <header className={cx("TopBar", { active })}>
      {isTablet && <HamburgerButton active={active} onClick={toggle} />}
      <span className={cx("title", { active })}>
        {capitalizeFirst(selectedMenu)}
      </span>
      <span className={cx("search")}>
        <MdOutlineSearch className={cx("search--icon")} />
      </span>
    </header>
  );
};

export default TopBar;
