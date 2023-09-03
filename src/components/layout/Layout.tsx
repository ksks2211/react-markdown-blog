import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

import styles from "./Layout.module.scss";
import cn from "classnames/bind";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import useGlobal from "../../hooks/useGlobal";

import { MENU } from "../../constants";
import ScrollToTop from "./../common/ScrollToTop";

const cx = cn.bind(styles);

interface LayoutProps extends ComponentPropsWithoutRef<"div"> {}

const Layout: React.FC<LayoutProps> = ({ children, ...rest }) => {
  const [active, setActive] = useState(true);
  const { isTabletOrMobile: isTablet } = useDeviceDetect();
  const { selectedMenu } = useGlobal();

  const toggle = () => {
    setActive((prev) => !prev);
  };

  const closeToggle = () => {
    if (isTablet && active) {
      setActive(false);
    }
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
      <SideBar active={active} isTablet={isTablet} menu={MENU}></SideBar>
      <div className={cx("main-wrapper", { active })} onClick={closeToggle}>
        <TopBar
          active={active}
          isTablet={isTablet}
          toggle={toggle}
          title={selectedMenu}
        ></TopBar>
        <main className={cx("main")}>
          <div className={cx("content")}>{children}</div>
          <ScrollToTop />
          <footer>Footer</footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;
