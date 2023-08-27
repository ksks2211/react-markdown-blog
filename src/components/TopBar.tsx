import { ComponentPropsWithoutRef } from "react";

import styles from "./TopBar.module.scss";
import cn from "classnames/bind";
import HamburgerButton from "./HamburgerButton";
import { SelectedMenu } from "../constants";

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
      <span>{selectedMenu}</span>
    </header>
  );
};

export default TopBar;
