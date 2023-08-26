import { ComponentPropsWithoutRef } from "react";

import styles from "./SideBar.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

interface SideBarProps extends ComponentPropsWithoutRef<"aside"> {
  active: boolean;
  isTablet: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ active }) => {
  return <aside className={cx("SideBar", { active })}>SideBar</aside>;
};

export default SideBar;
