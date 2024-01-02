import { ComponentPropsWithoutRef } from "react";

import styles from "./HamburgerButton.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

interface HamburgerButtonProps extends ComponentPropsWithoutRef<"div"> {
  active?: boolean;
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  active = false,
  onClick,
}) => {
  return (
    <div className={cx("HamburgerButton", { active })} onClick={onClick}>
      <div className={cx("line", "line1")}></div>
      <div className={cx("line", "line2")}></div>
      <div className={cx("line", "line3")}></div>
    </div>
  );
};

export default HamburgerButton;
