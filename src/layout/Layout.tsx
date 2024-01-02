import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

import styles from "./Layout.module.scss";
import cn from "classnames/bind";
import useDeviceDetect from "../hooks/useDeviceDetect";
import useGlobal from "../hooks/useGlobal";

// import { MENU } from "../../constants";
import Menu from "../contexts/Menu";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

const cx = cn.bind(styles);

interface LayoutProps extends ComponentPropsWithoutRef<"div"> {}

const Layout: React.FC<LayoutProps> = ({ children, ...rest }) => {
  const { isTabletOrMobile } = useDeviceDetect();

  const [active, setActive] = useState(isTabletOrMobile ? false : true);
  const { selectedMenu } = useGlobal();

  const toggle = () => {
    setActive((prev) => !prev);
  };

  const closeToggle = () => {
    if (isTabletOrMobile && active) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (isTabletOrMobile) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [isTabletOrMobile]);

  return (
    <div {...rest} className={cx("Layout")}>
      <SideBar
        active={active}
        isTablet={isTabletOrMobile}
        menu={Object.values(Menu)}
      ></SideBar>
      <div className={cx("main-wrapper", { active })} onClick={closeToggle}>
        <TopBar
          active={active}
          isTablet={isTabletOrMobile}
          toggle={toggle}
          title={selectedMenu}
        ></TopBar>
        <main className={cx("main")}>
          <div className={cx("content")}>{children}</div>

          <div className={cx("footer-wrapper")}>
            <Footer>© 2023 MyBlog. All rights reserved.</Footer>
          </div>

          <ScrollToTop />
        </main>
      </div>
    </div>
  );
};

export default Layout;
