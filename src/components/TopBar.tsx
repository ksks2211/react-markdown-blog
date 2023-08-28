import { ComponentPropsWithoutRef } from "react";
import { MdOutlineSearch } from "react-icons/md";
import styles from "./TopBar.module.scss";
import cn from "classnames/bind";
import HamburgerButton from "./HamburgerButton";
import { SelectedMenu } from "../constants";
import { capitalizeFirst } from "../utils/StringUtils";

const cx = cn.bind(styles);

interface TopBarProps extends ComponentPropsWithoutRef<"header"> {
  active: boolean;
  isTablet: boolean;
  toggle: () => void;
  selectedMenu: SelectedMenu;
}

const TopBar: React.FC<TopBarProps> = ({
  active,
  isTablet,
  toggle,
  selectedMenu,
}) => {
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
