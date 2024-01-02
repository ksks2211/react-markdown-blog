import { Link } from "react-router-dom";
import styles from "./Paginator.module.scss";
import cn from "classnames/bind";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

const cx = cn.bind(styles);

interface PaginatorProps {
  currentPage: number;
  lastPage: number;
}

const Paginator: React.FC<PaginatorProps> = ({ currentPage, lastPage }) => {
  const hasOlder = currentPage < lastPage;
  const hasNewer = currentPage > 1;
  const nextPage = hasOlder ? currentPage + 1 : null;
  const prevPage = hasNewer ? currentPage - 1 : null;

  return (
    <div className={cx("Paginator")}>
      <Link
        className={cx("page-btn", "newer-page-btn", { disabled: !hasNewer })}
        to={`/posts?page=${prevPage}`}
      >
        <MdNavigateBefore className={cx("icon")} />
      </Link>
      <Link
        className={cx("page-btn", "older-page-btn", { disabled: !hasOlder })}
        to={`/posts?page=${nextPage}`}
      >
        <MdNavigateNext className={cx("icon")} />
      </Link>
    </div>
  );
};

export default Paginator;
