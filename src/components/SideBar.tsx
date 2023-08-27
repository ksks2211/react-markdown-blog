import { ComponentPropsWithoutRef, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.scss";
import cn from "classnames/bind";
import { MENU } from "../constants";
const cx = cn.bind(styles);

interface SideBarProps extends ComponentPropsWithoutRef<"aside"> {
  active: boolean;
  isTablet: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ active }) => {
  const barRef = useRef<HTMLLIElement>(null);

  const profileUrl =
    "https://raw.githubusercontent.com/ksks2211/ksks2211.github.io/main/assets/img/commons/profile.png";
  const profileTitle = "Akatapata";
  const profileSubTitle = "Welcome...";

  const navigate = useNavigate();

  const redirectToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
  };

  const onMouseOver = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement;

    const key = parseInt(target.dataset.key as string);

    const size = (MENU.length - key) * 5;

    const bar = barRef.current;
    if (bar !== null) {
      bar.style.transform = `scale(0.6) translateY(-${size}rem)`;
    }
  };

  return (
    <aside className={cx("SideBar", { active })}>
      <div className={cx("profile")}>
        <div className={cx("avatar")}>
          <Link className={cx("link")} to="/">
            <img src={profileUrl} alt="profile" />
          </Link>
        </div>

        <div className={cx("profile--title")} onClick={redirectToHome}>
          {profileTitle}
        </div>
        <div className={cx("profile--subtitle")}>{profileSubTitle}</div>
      </div>
      <ul className={cx("items")}>
        {MENU.map((item, key) => (
          <li
            key={key}
            data-key={key}
            className={cx("item")}
            onMouseOver={onMouseOver}
          >
            {item}
          </li>
        ))}
        <li ref={barRef} className={cx("bar")} key={MENU.length}></li>
      </ul>
    </aside>
  );
};

export default SideBar;
