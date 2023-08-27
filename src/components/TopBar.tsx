import { ComponentPropsWithoutRef } from "react";

import styles from "./TopBar.module.scss";
import cn from "classnames/bind";
import HamburgerButton from "./HamburgerButton";

const cx = cn.bind(styles);

interface TopBarProps extends ComponentPropsWithoutRef<"header"> {
  active: boolean;
  isTablet: boolean;
  toggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ active, isTablet, toggle }) => {
  return (
    <header className={cx("TopBar", { active })}>
      {isTablet && <HamburgerButton active={active} onClick={toggle} />}
    </header>
  );
};

export default TopBar;
