import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

import styles from "./Layout.module.scss";
import cn from "classnames/bind";
import useDeviceDetect from "../hooks/useDeviceDetect";

const cx = cn.bind(styles);

interface LayoutProps extends ComponentPropsWithoutRef<"div"> {}

const Layout: React.FC<LayoutProps> = ({ children, ...rest }) => {
  const [active, setActive] = useState(true);
  const { isTabletOrMobile: isTablet } = useDeviceDetect();

  const toggle = () => {
    setActive((prev) => !prev);
  };

  useEffect(() => {
    if (isTablet) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [isTablet]);

  return (
    <div {...rest} className={cx("Layout")}>
      <SideBar active={active} isTablet={isTablet}></SideBar>
      <div className={cx("main-wrapper", { active })}>
        <TopBar active={active} isTablet={isTablet} toggle={toggle}></TopBar>
        <main className={cx("main")}>{children}</main>
        <footer></footer>
      </div>
    </div>
  );
};

export default Layout;
