import { ComponentPropsWithoutRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SideBar.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

interface SideBarProps extends ComponentPropsWithoutRef<"aside"> {
  active: boolean;
  isTablet: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ active }) => {
  const profileUrl =
    "https://raw.githubusercontent.com/ksks2211/ksks2211.github.io/main/assets/img/commons/profile.png";
  const profileTitle = "Akatapata";
  const profileSubTitle = "Welcome...";

  const navigate = useNavigate();

  const redirectToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/");
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
      <ul className={cx("items")}></ul>
    </aside>
  );
};

export default SideBar;
