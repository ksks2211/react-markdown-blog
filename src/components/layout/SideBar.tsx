import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./SideBar.module.scss";
import cn from "classnames/bind";
import { SelectedMenu } from "../../constants";
import useGlobal from "../../hooks/useGlobal";
const cx = cn.bind(styles);

interface SideBarProps extends ComponentPropsWithoutRef<"aside"> {
  active: boolean;
  isTablet: boolean;
  menu: readonly string[];
}

const SideBar: React.FC<SideBarProps> = ({ active, menu }) => {
  const { selectedMenu, changeMenu, logout } = useGlobal();

  const barRef = useRef<HTMLLIElement>(null);

  const profileUrl =
    "https://raw.githubusercontent.com/ksks2211/ksks2211.github.io/main/assets/img/commons/profile.png";
  const profileTitle = "Akatapata";
  const profileSubTitle = "Welcome...";

  const selectedKey = menu.findIndex((m) => m === selectedMenu);

  useEffect(() => {
    const bar = barRef.current;
    const size = (menu.length - selectedKey) * 5;

    if (bar !== null) {
      bar.style.transform = `scale(0.6) translateY(-${size}rem)`;
    }
  }, [menu.length, selectedKey]);

  const onMouseOver = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = e.target as HTMLLIElement;

    const key = parseInt(target.dataset.key as string);

    const size = (menu.length - key) * 5;

    const bar = barRef.current;
    if (bar !== null) {
      bar.style.transform = `scale(0.6) translateY(-${size}rem)`;
    }
  };

  // onMouseLeave : back to original-selected category
  const onMouseLeave = () => {
    const bar = barRef.current;
    const size = (menu.length - selectedKey) * 5;

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

        <div className={cx("profile--title")}>
          <Link className={cx("link")} to="/">
            {profileTitle}
          </Link>
        </div>
        <div className={cx("profile--subtitle")}>{profileSubTitle}</div>
      </div>

      <ul className={cx("items")} onMouseLeave={onMouseLeave}>
        {menu.map((item, key) => {
          const style: React.CSSProperties | undefined =
            item === selectedMenu
              ? { color: "#6189be", backgroundColor: "rgba(0,0,150,.1)" }
              : undefined;
          return (
            <li key={key} className={cx("item")}>
              <Link
                data-key={key}
                onMouseOver={onMouseOver}
                style={style}
                className={cx("item-link")}
                to={`/${item.toLowerCase()}`}
                onClick={() => changeMenu(item as SelectedMenu)}
              >
                {item}
              </Link>
            </li>
          );
        })}
        <li ref={barRef} className={cx("bar")} key={menu.length}></li>
      </ul>

      <button onClick={logout}>Logout</button>
    </aside>
  );
};

export default SideBar;
