import styles from "./Footer.module.scss";
import { ComponentPropsWithoutRef } from "react";

import cn from "classnames/bind";

const cx = cn.bind(styles);

interface FooterProps extends ComponentPropsWithoutRef<"footer"> {}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className={cx("Footer")}>
      <p>{children}</p>
    </footer>
  );
};

export default Footer;
